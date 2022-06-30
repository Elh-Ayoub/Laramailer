import React from "react";
import "../../css/login.css"
import loginSlide from "../../images/login-slide.jpg"
import { Link } from "react-router-dom"


function Register(){
    
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
                            <h2 class="text-center">Registration</h2>
                            <form id="example-advanced-form" action="#">
                                <fieldset class="form-input">
                                    <label for="userName">Username *</label>
                                    <input id="userName" name="userName" type="text" class="form-control required"/>
                                    <label for="full_name">Full name *</label>
                                    <input id="full_name" name="full_name" type="text" class="form-control required"/>
                                    <label for="email">Email *</label>
                                    <input id="email" name="email" type="email" class="form-control required"/>
                                    <label for="password">Password *</label>
                                    <input id="password" name="password" type="password" class="form-control required"/>
                                    <label for="confirm">Confirm Password *</label>
                                    <input id="confirm" name="confirm_password" type="password" class="form-control required"/>
                                    <p>(*) Mandatory</p>
                                </fieldset>
                                <fieldset class="form-input">
                                    <h4>Terms and Conditions</h4>
                                    <input id="acceptTerms-2" name="acceptTerms" type="checkbox" class="required"/>
                                    <label for="acceptTerms-2" class="mx-2">I agree with the <a href="#"> Terms and Conditions.</a> </label>
                                </fieldset>
                                <button class="btn btn-outline-primary my-3 col-12">Sign up</button>  
                                <fieldset class="form-input my-2">
                                    <Link to="/auth/login">Already have account ? Log in</Link>
                                </fieldset>                             
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
