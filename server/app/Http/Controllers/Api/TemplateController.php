<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TemplateController extends Controller
{

    public function index(){
        return response(['status' => 'success', 'message' => Template::where('type', 'default')->get()]);
    }

    public function userTemplates(){
        //auth user templates
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        return response(['status' => 'success', 'message' => Template::where('author_id', Auth::id())->get()]);
    }

    public function show($id){
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $template = Template::find($id);
        if(!$template){
            return response(['status' => 'fail', 'message' => 'Email template not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($template)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }
        return response(['status' => 'success', 'message' => $template]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'default_id' => "required|integer",
        ]);
        if($validator->failed()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }

        $default = Template::find($request->default_id);
        if(!$default){
            return response(['status' => 'fail', 'message' => 'Default template not found!'], Response::HTTP_NOT_FOUND);
        }

        $name = ($request->name) ? ($request->name) : ($default->name);
        $path = 'templates/' . Auth::id() . "/" . $name. "/";
        $i = 1;
        while(Storage::disk('public')->exists($path)) {
            $path = 'templates/' . Auth::id() . "/" . $name . "(" . $i . ")/";
            $i++;
        }

        //copy default dir content to $path
        $default_files = Storage::disk('public')->allFiles($default->path);
        foreach($default_files as $file){
            $filename = pathinfo($file)['basename'];
            Storage::disk('public')->copy($file, $path . $filename);
        }
        //change assets links
        $view = file_get_contents(public_path('storage/' . $default->path . $default->html));
        preg_match_all('/src="([^"]+)"/', $view, $matches);
        $i = 1;
        $blade = $view;
        $html = $view;
        foreach($matches[1] as $match){
            $html = str_replace($match, asset('storage/' . $path . $i . '.png'), $html);
            $blade = str_replace($match, "{{\$message->embed(public_path(\"storage/{$path}{$i}.png\"))}}", $blade);
            $i++;
        }
        $html_storage = Storage::disk('public')->put($path . $default->html, $html);
        $blade_storage = Storage::disk('public')->put($path . $default->blade, $blade);

        $template = Template::create([
            'name' => $name,
            'path'=> $path,
            'html' => $default->html,
            'blade' => $default->blade,
            'author_id' => Auth::id(),
            'thumbnail' => $default->thumbnail,
        ]);
        if($template){
            return response(['status' => 'success', 'message' => 'Template created successfully!']);
        }
    }

    public function update(Request $request, $id){
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $template = Template::find($id);
        if(!$template){
            return response(['status' => 'fail', 'message' => 'Email template not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($template)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }

        if($request->file('assets')){
            $this->uploadAssets($request->file('assets'), $template->path);
        }
        //html, blade
        if($request->view){
            preg_match_all('/src="([^"]+)"/', $request->view, $matches);
            $i = 1;
            $blade = $request->view;
            $html = $request->view;
            foreach($matches[1] as $match){
                $html = str_replace($match, asset('storage/' . $template->path . $i . '.png'), $html);
                $blade = str_replace($match, "{{\$message->embed(public_path(\"storage/{$template->path}{$i}.png\"))}}", $blade);
                $i++;
            }
            $html_storage = Storage::disk('public')->put($template->path . $template->html, $html);
            $blade_storage = Storage::disk('public')->put($template->path . $template->blade, $blade); 
        }
        $template->update([
            'name' => ($request->name) ? ($request->name) : ($template->name),
        ]);
        return response(['status' => 'success', 'message' => 'Template updated successfully!']);
    }

    public function destroy($id){
        $user = Auth::user();
        if(!$user){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_UNAUTHORIZED);
        }
        $template = Template::find($id);
        if(!$template){
            return response(['status' => 'fail', 'message' => 'Email template not found!'], Response::HTTP_NOT_FOUND);
        }
        if(!$this->is_author($template)){
            return response(['status' => 'fail', 'message' => 'Operation forbidden'], Response::HTTP_FORBIDDEN);
        }

        Storage::disk('public')->deleteDirectory($template->path);
        $template->delete();
        return response(['status' => 'success', 'message' => 'Template deleted successfully!']);
    }

    private function uploadAssets($assets, $path){
        $dir = public_path('storage/' . $path);
        if($assets){
            $i = 1;
            foreach($assets as $item){
                $item2 = $item->store('public');
                $item->move($dir, $i . '.png');
                $i++;
            }
        }
    }

    private function is_author($model){
        if($model->author_id != Auth::id()){
            return false;
        }
        return true;
    }
}
