<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

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
