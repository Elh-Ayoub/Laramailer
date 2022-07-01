import React, { useState } from "react";
import "../../css/login.css"
import loginSlide from "../../images/login-slide.jpg"
import { Link } from "react-router-dom"
import AuthServices from "../../services/Auth"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Register(){
    const [username, setUsername] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passConfirm, setPassConfirm] = useState(null)
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const notificationAlert = React.useRef();
    let loader = null
    const registration = (e) => {
        e.preventDefault()
        //
        toast.error('working!', {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
    }

    return (
        <div className="login-container">
            <ToastContainer/>
            <div id="main-wrapper" className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="card border-0">
                            <div className="card-body p-0">
                                <div className="row no-gutters">
                                    <div className="col-lg-6">
                                        <div className="p-4">
                                            <div className="mb-5">
                                                <h3 className="h4 font-weight-bold text-theme">Registration</h3>
                                            </div>
                                            <form onSubmit={registration}>
                                                <div className="form-group">
                                                    <label htmlFor="username">Username</label>
                                                    <input type="text" className="form-control my-1" id="username" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="full_name">Full name</label>
                                                    <input type="text" className="form-control my-1" id="full_name" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email address</label>
                                                    <input type="email" className="form-control my-1" id="email" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Password</label>
                                                    <input type="password" className="form-control my-1" id="exampleInputPassword1" />
                                                </div>
                                                <div className="form-group mb-4">
                                                    <label htmlFor="pass_confirm">Password confirmation</label>
                                                    <input type="pass_confirm" className="form-control my-1" id="pass_confirm" />
                                                </div>
                                                <button type="submit" className="btn btn-outline-primary col-12 mb-4">Sign up</button>
                                                <fieldset className="form-input my-1">
                                                    <Link to="/auth/login">Already have an account ? Sign in</Link>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-none d-lg-inline-block">
                                        <div className="account-block rounded-right">
                                            <div className="overlay rounded-right"></div>
                                            <div className="account-testimonial">
                                                <h4 className="text-white mb-4 text-left"><Link to="/" className="link-light">Laramailer</Link></h4>
                                                <p className="lead text-white text-left">You are one step away before being a part of this service. Grow faster, better, easier</p>
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

export default Register
