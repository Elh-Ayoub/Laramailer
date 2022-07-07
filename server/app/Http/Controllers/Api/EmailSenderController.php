<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailList;
use App\Models\EmailSender;
use App\Models\Template;
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
        $sender->list_name = EmailList::find($sender->list_id)->name;
        $sender->template_name = Template::find($sender->template_id)->name;
        return response(['status' => 'success', 'message' => $sender]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'template_id' => 'required|integer',
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
        $template = Template::find($request->template_id);
        if(!$template){
            return response(['status' => 'fail', 'message' => 'Email template not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($template)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        $sender = EmailSender::create([
            'name' => $request->name,
            'template_id' => $template->id,
            'reply_email' => $request->reply_email,
            'subject' => $request->subject,
            'frequency' => $request->frequency,
            'list_id' => $list->id,
            'author_id' => Auth::id(),
            'send_at' => $request->send_at,
            'status' => ($request->status) ? ($request->status) : ("running")
        ]);
        if($sender){
            return response(['status' => 'success', 'message' => 'Email sender (' . $sender->name . ') has been created successfully!']);
        }
        return response(['status' => 'fail', 'message' => 'Something went wrong! Please try again.']);
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'reply_email' => 'email',
            'subject' => 'string',
            'frequency' => 'string',
            'list_id' => 'integer',
            'template_id' => 'integer',
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
        
        $sender->update([
            'name' => ($request->name) ? ($request->name) : ($sender->name),
            'reply_email' => ($request->reply_email) ? ($request->reply_email) : ($sender->reply_email),
            'subject' => ($request->subject) ? ($request->subject) : ($sender->subject),
            'frequency' => ($request->frequency) ? ($request->frequency) : ($sender->frequency),
            'list_id' => ($request->list_id) ? ($list->id) : ($sender->list_id),
            'template_id' => ($request->template_id) ? ($request->template_id) : ($sender->template_id),
            'send_at' => ($request->send_at) ? ($request->send_at) : ($sender->send_at),
            'status' => ($request->status) ? ($request->status) : ($sender->status)
        ]);
        return response(['status' => 'success', 'message' => 'Email sender updated successfully!']);
    }

    public function getInfo(){
        $template = Template::where('author_id', Auth::id())->get(['id', 'name']);
        $list = EmailList::where('author_id', Auth::id())->get(['id', 'name']);
        return response(['status' => 'success', 'message' => ['templates' => $template, 'lists' => $list]]);
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

    private function is_author($model){
        if($model->author_id != Auth::id()){
            return false;
        }
        return true;
    }
}
