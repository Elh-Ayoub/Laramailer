<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminRoleController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Api\VerifyEmailController;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return view('welcome');
});

/////////////////////// ----Authentication module---- ///////////////////////
//Admin panel auth
Route::middleware('auth.check')->group(function(){
    Route::get("admin/auth/login", function(){return view('Auth.login');})->name('login.view');
    Route::post("admin/auth/login", [AdminAuthController::class, 'login'])->name('login');
    Route::get("admin/auth/logout", [AdminAuthController::class, 'logout'])->name('logout.admin');
    Route::get("admin/auth/forgot-password", function(){return view('Auth.forget_password');})->name('forget_password.view');
    Route::post("admin/auth/forgot-password", [AdminAuthController::class, "sendResetLink"])->name('forget_password.send');
});
//reset password form
Route::get('/reset-password/{token}', function (Request $request, $token) {
    return view('Auth.reset-password', ['token' => $token, 'email' => $request->email]);
})->middleware('guest')->name('password.reset');

//Email verification
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::group([ 'middleware' => 'auth:sanctum','prefix' => 'admin',], function () {
    //dashboard
    Route::get("dashboard", function(){
        $admin_id = Role::where('title', 'ADMIN')->first()->id;
        $user_id = Role::where('title', 'USER')->first()->id;
        $admins = User::where('role_id', $admin_id)->get();
        $users = User::where('role_id', $user_id)->get();
        return view('dashboard', ['admins' => count($admins), 'users' => count($users)]);
    })->name('dashboard');
    /////////////////////// ----User module---- ///////////////////////
    Route::get('users', [AdminUserController::class, 'index'])->name('users.admin');
    Route::post('users', [AdminUserController::class, 'store'])->name('users.admin.store');
    Route::get('users/{id}',[AdminUserController::class, 'show'])->name("users.show");
    Route::patch('users/{id}/password', [AdminUserController::class, 'updatePassword'])->name('users.password.update');
    Route::patch('users/{id}/avatar', [AdminUserController::class, 'UpdateAvatar'])->name('users.update.avatar');
    Route::delete('users/{id}/avatar', [AdminUserController::class, 'setDefaultAvatar'])->name('users.delete.avatar');
    Route::patch('users/{id}',[AdminUserController::class, 'update'])->name('users.update');
    Route::delete('users/{id}',[AdminUserController::class, 'destroy'])->name('users.delete');

    /////////////////////// ----Role module---- ///////////////////////
    Route::get('roles', [AdminRoleController::class, 'index'])->name('roles.admin');
    Route::post('roles', [AdminRoleController::class, 'store'])->name('roles.admin.create');
    Route::patch('roles/{id}', [AdminRoleController::class, 'update'])->name('roles.admin.update');
    Route::delete('roles/{id}', [AdminRoleController::class, 'destroy'])->name('roles.admin.delete');
});
