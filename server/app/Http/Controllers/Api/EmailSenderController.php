<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailList;
use App\Models\EmailSender;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EmailSenderController extends Controller
{
    public function index(){
        //auth user's email senders
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        return response(['status' => 'success', 'message' => EmailSender::where('author_id', Auth::id())->get()]);
    }

    public function show($id){
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $sender = EmailSender::find($id);
        if(!$sender){
            return response(['status' => 'fail', 'message' => 'Email sender not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($sender)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        return response(['status' => 'success', 'message' => $sender]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'view' => 'required',
            'reply_email' => 'required|email',
            'subject' => 'required|string',
            'frequency' => 'required|string',
            'list_id' => 'required|integer'
        ]);

        if($validator->failed()){
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
        //create template file
        $view = $this->storeTemplate($request->name, $request->view);
        
        if(!$view){
            return response(['status' => 'fail', 'message' => 'Something went wrong! Please try again.']);
        }
        $view = str_replace(".blade.php", "", $view);
        $path_parts = pathinfo($view);

        $sender = EmailSender::create([
            'name' => $path_parts['filename'],
            'view' => $view,
            'reply_email' => $request->reply_email,
            'subject' => $request->subject,
            'frequency' => $request->frequency,
            'list_id' => $list->id,
            'author_id' => Auth::id(),
            'send_at' => $request->send_at,
            'status' => ($request->status) ? ($request->status) : ("running")
        ]);
        if($sender){
            return response(['status' => 'success', 'message' => 'Email sender has been created successfully!']);
        }
        return response(['status' => 'fail', 'message' => 'Something went wrong! Please try again.']);
    }

    public function storeTemplate($name, $view){
        $path = 'templates/' . Auth::id() . "/" . $name . ".blade.php";
        $i = 1;
        while(Storage::disk('public')->exists($path)) {
            $path = 'templates/' . Auth::id() . "/" . $name . "(" . $i . ")" . ".blade.php";
            $i++;
        }
        $storage = Storage::disk('public')->put($path, $view);
        if($storage) return $path;
        return false;
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'reply_email' => 'email',
            'subject' => 'string',
            'frequency' => 'string',
            'list_id' => 'integer',
            'status' => 'string'
        ]);

        if($validator->failed()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        if(!Auth::user()){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $sender = EmailSender::find($id);
        if(!$sender){
            return response(['status' => 'fail', 'message' => 'Email sender not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($sender)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }

        $list = EmailList::find(($request->list_id) ? ($request->list_id) : ($sender->list_id));
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        //edit template content if view in request not null
        if($request->view){
            Storage::disk('public')->put($sender->view . '.blade.php', $request->view);
        }
        $sender->update([
            'name' => ($request->name) ? ($request->name) : ($sender->name),
            'reply_email' => ($request->reply_email) ? ($request->reply_email) : ($sender->reply_email),
            'subject' => ($request->subject) ? ($request->subject) : ($sender->subject),
            'frequency' => ($request->frequency) ? ($request->frequency) : ($sender->frequency),
            'list_id' => ($request->list_id) ? ($list->id) : ($sender->list_id),
            'send_at' => ($request->send_at) ? ($request->send_at) : ($sender->send_at),
            'status' => ($request->status) ? ($request->status) : ($sender->status)
        ]);
        return response(['status' => 'success', 'message' => 'Email sender updated successfully!']);
    }

    public function destroy($id){
        if(!Auth::user()){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $sender = EmailSender::find($id);
        if(!$sender){
            return response(['status' => 'fail', 'message' => 'Email sender not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($sender)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        //delete sender template
        Storage::disk('public')->delete($sender->view . '.blade.php');
        $sender->delete();
        return response(['status' => 'success', 'message' => 'Email sender deleted successfully!']);
    }

    public function is_author($model){
        if($model->author_id != Auth::id()){
            return false;
        }
        return true;
    }
}
