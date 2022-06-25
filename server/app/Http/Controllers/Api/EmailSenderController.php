<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailList;
use App\Models\EmailSender;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
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
        
        $sender = EmailSender::create([
            'view' => $request->view,
            'reply_email' => $request->reply_email,
            'subject' => $request->subject,
            'frequency' => $request->frequency,
            'list_id' => $list->id,
            'author_id' => Auth::id(),
            'send_at' => $request->send_at
        ]);
        if($sender){
            return response(['status' => 'success', 'message' => 'Email sender has been created successfully!']);
        }
        return response(['status' => 'fail', 'message' => 'Something went wrong! Please try again.']);
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'reply_email' => 'email',
            'subject' => 'string',
            'frequency' => 'string',
            'list_id' => 'required|integer'
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

        $list = EmailList::find($request->list_id);
        if(!$list){
            return response(['status' => 'fail', 'message' => 'List not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($list)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $sender->update([
            'view' => $request->view,
            'reply_email' => $request->reply_email,
            'subject' => $request->subject,
            'frequency' => $request->frequency,
            'list_id' => $list->id,
            'author_id' => Auth::id(),
            'send_at' => $request->send_at
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
