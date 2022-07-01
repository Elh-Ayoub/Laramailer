import React from "react";
import "../../css/login.css"
import loginSlide from "../../images/login-slide.jpg"
import { Link } from "react-router-dom"


function Login(){
    
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
                                                <h3 className="h4 font-weight-bold text-theme">Log in</h3>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="identifier">Email or username</label>
                                                    <input type="text" className="form-control my-1" id="identifier" />
                                                </div>
                                                <div className="form-group mb-4">
                                                    <label htmlFor="exampleInputPassword1">Password</label>
                                                    <input type="password" className="form-control my-1" id="exampleInputPassword1" />
                                                </div>
                                                <button type="submit" className="btn btn-outline-primary col-12 mb-4">Sign in</button>
                                                <fieldset className="form-input my-1">
                                                    <Link to="/auth/register">Don't have account ? Sign up</Link>
                                                </fieldset>
                                                <fieldset className="form-input my-1">
                                                    <Link to="/auth/forgot-password">Reset password</Link>
                                                </fieldset> 
                                                <fieldset className="form-input my-1">
                                                    <Link to="/auth/resend-verification">Resend verfication email</Link>
                                                </fieldset> 
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-none d-lg-inline-block">
                                        <div className="account-block rounded-right">
                                            <div className="overlay rounded-right"></div>
                                            <div className="account-testimonial">
                                                <h4 className="text-white mb-4 text-left"><Link to="/" className="link-light">Laramailer</Link></h4>
                                                <p className="lead text-white text-left">Welcome back mate! Log in to your account, enjoy!</p>
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

export default Login
