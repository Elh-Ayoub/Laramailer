<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
// use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        return User::all();
    }

    public function show($id){
        $user = User::find($id);
        return ($user) ? ($user) : (response(['status' => "fail", "message" => "User not found!"], 404));
    }

    public function update(Request $request, $id)
    {
        if(($id != Auth::id()) && !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        $validator = Validator::make($request->all(), [
            'username' => 'string|unique:users,username,' .$id . '|between:5,20',
            'full_name' => 'string|between:5,30',
        ]);

        $user = User::find($id);
        if(!$user) return response(['status' => 'fail', 'message' => 'User not found!'], 404);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        $user->update([
            'username' => ($request->username) ? ($request->username) : ($user->username),
            'profile_picture' => ($request->file('profile_picture')) ? ($this->uploadImage($request, $user)) : ($user->profile_picture),
            'full_name' => ($request->full_name) ? ($request->full_name) : ($user->full_name),
            'role_id' => ($request->role_id) ? ($request->role_id) : ($user->role_id),
        ]);
        return response(['status' => 'success', 'message' => 'User updated!']);
    }

    public function setAvatar(Request $request, $id){
        $user = User::find($id);
        if(!$user) return response(['status' => 'fail', 'message' => 'User not found!'], 404);

        if($request->file('profile_picture')){
            $user->update([
                'profile_picture' => $this->uploadImage($request, $user),
            ]);
            return response(['status' => 'success', 'message' => 'Profile picture updated!']);
        }else{
            return response(['status' => 'fail', 'message' => 'An image file is required!'], 400);
        }
    }

    function uploadImage($request, $user = null){
        $image = $request->file('profile_picture');
        if($image){
            $username = ($request->username) ? ($request->username) : ($user->username);
            $filename = str_replace(' ', '-', $username). '.png';
            $image = $request->file('profile_picture')->store('public');
            $request->file('profile_picture')->move(public_path('storage/profile-pictures'), $filename);
            return asset('storage/profile-pictures/'.$filename);
        }
        return null;
    }

    public function updatePassword(Request $request, $id){
        if(($id != Auth::id()) && !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|min:8',
            'password' => 'required|string|confirmed|min:8',
        ]);
        $user = User::find($id);
        if(!$user) return response(['status' => 'fail', 'message' => 'User not found!'], 400);

        if($validator->fails()){
            return response(['status' => 'fail-arr', 'message' => $validator->errors()->toArray()], 400);
        }
        if(Hash::check($request->current_password, $user->password)){
            $user->update(['password' => bcrypt($request->password)]);
            return response(['status' => 'success', 'message' => 'Password updated!']);
        }else{
            return response(['status' => 'fail', 'message' => "Password inccorect!"], 400);
        }
    }

    public function setDefaultAvatar($id){
        $user = User::find($id);
        if(!$user) return response(['status' => 'fail', 'message' => 'User not found!'], 400);
        $name = substr($user->username, 0, 2);
        File::delete(public_path(parse_url($user->profile_picture, PHP_URL_PATH)));
        $profile_picture = 'https://ui-avatars.com//api//?name='.$name.'&color=7F9CF5&background=EBF4FF';
        $user->update(['profile_picture' => $profile_picture]);
        return response(['status' => 'success','message'=> 'Profile picture deleted!']);
    }

    // public function isAdmin($user = null){
    //     if(!$user){
    //         $user = Auth::user();
    //     }
    //     return $user->role_id == Role::where('title', 'Admin')->first()->id;
    // }

    public function destroy($id)
    {
        $user = User::find($id);
        if(($id != Auth::id()) && !$this->isAdmin()){
            return response(['status' => 'fail', 'message' => 'This operation is forbidden.'], Response::HTTP_FORBIDDEN);
        }
        $user->delete();
        return response(['status' => 'success', 'message' => 'User deleted successfully!']);
    }
}
