import React from "react";
import "../../css/login.css"
import loginSlide from "../../images/login-slide.jpg"
import { Link } from "react-router-dom"


function Login(){
    
    return (
        <div class="login-container">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 banner-sec">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner" role="listbox">
                                <div class="carousel-item active">
                                    <img class="d-block img-fluid" src={loginSlide} alt="First slide"/>
                                    <div class="carousel-caption d-none d-md-block">
                                        <div class="banner-text">
                                            <h2>This is Heaven</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                                        </div>	
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 login-sec row align-content-center">
                        <div class="login-sec-bg">
                            <h2 class="text-center">Log In</h2>
                            <form id="example-advanced-form" action="#">
                                <fieldset class="form-input">
                                    <label for="identifier">Username or email*</label>
                                    <input id="identifier" name="identifier" type="text" class="form-control required"/>
                                    <label for="password">Password *</label>
                                    <input id="password" name="password" type="password" class="form-control required"/>
                                    <p>(*) Mandatory</p>
                                </fieldset>
                                <button class="btn btn-outline-primary my-3 col-12">Sign in</button>
                                <fieldset class="form-input my-2">
                                    <Link to="/auth/register">Don't have account ? Sign up</Link>
                                </fieldset>
                                <fieldset class="form-input my-2">
                                    <Link to="/auth/register">Reset password</Link>
                                </fieldset> 
                                <fieldset class="form-input my-2">
                                    <Link to="/auth/register">Resend verfication email</Link>
                                </fieldset>                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
