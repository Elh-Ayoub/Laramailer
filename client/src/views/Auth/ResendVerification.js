import React from "react";
import "../../css/login.css"
import loginSlide from "../../images/login-slide.jpg"
import { Link } from "react-router-dom"


function ResendVerification(){
    
    return (
        <div className="login-container">
            <div id="main-wrapper" className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="card border-0">
                            <div className="card-body p-0">
                                <div className="row no-gutters">
                                    <div className="col-lg-6">
                                        <div className="p-4">
                                            <div className="mb-5">
                                                <h3 className="h4 font-weight-bold text-theme">Email verification</h3>
                                            </div>
                                            <form>
                                                <div className="form-group mb-4">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" className="form-control my-1" id="email" />
                                                </div>
                                                <button type="submit" className="btn btn-outline-primary col-12 mb-4">Resend verification link</button>
                                                <fieldset className="form-input my-1">
                                                    <Link to="/auth/login">Go back to login</Link>
                                                </fieldset> 
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-none d-lg-inline-block">
                                        <div className="account-block rounded-right">
                                            <div className="overlay rounded-right"></div>
                                            <div className="account-testimonial">
                                                <h4 className="text-white mb-4 text-left"><Link to="/" className="link-light">Laramailer</Link></h4>
                                                <p className="lead text-white text-left">Verfication link expired? No problem we can resend new one. Verify your email address and enjoy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResendVerification
