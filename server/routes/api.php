<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmailController;
use App\Http\Controllers\Api\EmailListController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/////////////////////// ----Authentication module---- ///////////////////////
Route::post("/auth/register", [AuthController::class, 'register']);
Route::post("/auth/login", [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function(){
    Route::get("/auth/user", [AuthController::class, 'user']);
    Route::post("/auth/logout", [AuthController::class, 'logout']);
});
//Send reset password link
Route::post('auth/forgot-password',[AuthController::class, 'sendResetLink']);
//Reset password
Route::patch('auth/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');
//Email verification
Route::post('email/resend-verification', [VerifyEmailController::class, 'resendVerification'])->name('verification.resend');

Route::middleware('auth:sanctum')->group(function(){
    /////////////////////// ----User module---- ///////////////////////
    Route::get("/users", [UserController::class, 'index']);
    Route::get("/users/{id}", [UserController::class, 'show']);
    Route::patch("/users/{id}", [UserController::class, 'update']);
    Route::patch("/users/{id}/password", [UserController::class, 'updatePassword']);
    Route::post("/users/{id}/avatar", [UserController::class, 'setAvatar']);
    Route::delete("/users/{id}/avatar", [UserController::class, 'setDefaultAvatar']);
    Route::delete("/users/{id}", [UserController::class, 'destroy']);

    /////////////////////// ----Role module---- ///////////////////////
    Route::get("/roles", [RoleController::class, 'index']);
    Route::get("/roles/{id}", [RoleController::class, 'show']);
    Route::get("/roles/{id}/users", [RoleController::class, 'getUsersByRoleId']);

    /////////////////////// ----Email list module---- ///////////////////////
    Route::get("/email-lists", [EmailListController::class, 'index']);
    Route::get("/email-lists/{id}", [EmailListController::class, 'show']);
    Route::post("/email-lists", [EmailListController::class, 'store']);
    Route::patch("/email-lists/{id}", [EmailListController::class, 'update']);
    Route::delete("/email-lists/{id}", [EmailListController::class, 'destroy']);

    /////////////////////// ----Emails module---- ///////////////////////
    Route::get("/email-lists/{id}/emails", [EmailController::class, 'index']);
    Route::post("/email-lists/{id}/emails", [EmailController::class, 'store']);
    Route::patch("/emails/{id}", [EmailController::class, 'update']);
    Route::delete("/emails/{id}", [EmailController::class, 'destroy']);
});


