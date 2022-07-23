<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailList;
use App\Models\Freebie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FreebieController extends Controller
{
    public function index(){
        //auth user's freebies
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $freebies = Freebie::where('author_id', Auth::id())->get();
        foreach($freebies as $freebie){
            $list = EmailList::find($freebie->list_id);
            $freebie->list_name = ($list) ? ($list->name) : ("List not found");
        }
        return response(['status' => 'success', 'message' => $freebies]);
    }

    public function show($id){
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $freebie = Freebie::find($id);
        if(!$freebie){
            return response(['status' => 'fail', 'message' => 'Freebie not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($freebie)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $list = EmailList::find($freebie->list_id);
        $freebie->list_name = ($list) ? ($list->name) : ("List not found");
        return response(['status' => 'success', 'message' => $freebie]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'file' => 'required|mimes:zip,rar',
            'list_id' => 'required|integer'
        ]);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        if(!Auth::user()){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $list = EmailList::find($request->list_id);
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }

        $freebie = Freebie::create([
            'name' => $request->name,
            'list_id' => $list->id,
            'file' => $this->uploadFile($request->file('file'), $request->name),
            'author_id' => Auth::id(),
            'tag' => $request->tag,
            'description' => $request->description,
        ]);
        
        if($freebie){
            return response(['status' => 'success', 'message' => 'Freebie created successfully!']);
        }
        return response(['status' => 'fail', 'message' => 'Something went wrong! Try again please.'], 400);
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'file' => 'mimes:zip,rar',
            'list_id' => 'integer',
        ]);
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $freebie = Freebie::find($id);
        if(!$freebie){
            return response(['status' => 'fail', 'message' => 'Freebie not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($freebie)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $list = EmailList::find($request->list_id);
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        
        if($request->file('file')){
            $path = pathinfo($freebie->file, PATHINFO_DIRNAME);
            File::deleteDirectory("storage/" . $path);
        }

        $freebie->update([
            'name' => $request->name,
            'list_id' => $list->id,
            'file' => ($request->file) ? ($this->uploadFile($request->file('file'), $request->name)) : ($freebie->file),
            'tag' => $request->tag,
            'description' => $request->description,
        ]);
        return response(['status' => 'success', 'message' => 'Freebie updated successfully!']);
    }

    public function destroy(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
        ]);
        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $freebie = Freebie::find($id);
        if(!$freebie){
            return response(['status' => 'fail', 'message' => 'Freebie not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($freebie)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        if(Hash::check($request->password, Auth::user()->password)){
            //delete file
            $path = pathinfo($freebie->file, PATHINFO_DIRNAME);
            File::deleteDirectory("storage/" . $path);
            //delete freebie
            $freebie->delete();
            return response(['status' => 'success', 'message' => 'Freebie deleted successfully!']); 
        }
        return response(['status' => 'fail', 'message' => 'Password incorrect!'], Response::HTTP_FORBIDDEN);
    }

    private function uploadFile($file, $name){
        $path = 'freebies_files/' . Auth::id() . "/" . $name . "/";
        $i = 1;
        while(Storage::disk('public')->exists($path)) {
            $path = 'freebies_files/' . Auth::id() . "/" . $name . "(" . $i . ")/";
            $i++;
        }
        $filename = $file->getClientOriginalName();
        $file->store('public');
        $file->move(public_path('storage/' . $path), $filename);
        return ($path . $filename);
    }

    private function is_author($model){
        if($model->author_id != Auth::id()){
            return false;
        }
        return true;
    }
}
