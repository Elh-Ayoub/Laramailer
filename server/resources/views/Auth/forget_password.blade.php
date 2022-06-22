<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/icon.png')}}"/>
  <title>Reset password - {{env('APP_NAME')}}</title>
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('dist/css/adminlte.min.css') }}">
  <style>body{font-family: Nunito} .login-form{background: #0e387a ;color: white;}.border-radius-10{border-radius: 10px;}</style>
</head>
<body class="hold-transition login-page" style="background-color: #9fafca;">
<div class="login-box">
  <div class="login-logo">
        <a href="" style="color: #235F83" class="mx-3 text-lg-center text-bold">
            <img src="{{ asset('assets/logo.png')}}" class="figure-img" alt="logo">
        </a>
  </div>
  <div class="card border-radius-10">
    <div class="card-body login-form border-radius-10">
        <p class="login-box-msg text-bold">Forgot password ? No problem!</p>
        <form method="POST" action="{{route('forget_password.send')}}" enctype="multipart/form-data">
            @csrf
            @if(Session::get('success'))
                <div class="alert alert-success text-center">
                    {{Session::get('success')}}
                </div>
            @endif
            @if(Session::get('fail'))
                <div class="alert alert-danger text-center">
                    {{Session::get('fail')}}
                </div>
            @endif
            <div class="input-group mb-3">
                <input type="email" class="form-control" placeholder="Email" name="email">
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="submit" class="btn btn-outline-light btn-block">Send reset password link</button>
                </div>
            </div>
        </form>
        <div class="row justify-content-center mt-2">
            <a href="{{route('login.view')}}" class="text-light" style="font-style: italic;">Go back to login!</a>
        </div>
    </div>
  </div>
</div>
<!-- jQuery -->
<script src="{{ asset('plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('dist/js/adminlte.min.js')}}"></script>
</body>
</html>