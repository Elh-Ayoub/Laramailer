import React, { useEffect, useState } from "react";
import "../../css/login.css"
import loginSlide from "../../images/login-slide.jpg"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../../Components/Loader"
import { toast, ToastContainer } from "react-toastify";
import AuthServices from "../../services/Auth";

function Login(props){
    const [user, setUser] = useState({loading: true, data: null, error: null})
    useEffect(() => {
        AuthServices.user()
        .then(response => {
            setUser({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setUser({loading: false, data: null, error: error.response.data})
        })
    }, [])
    const navigate = useNavigate()
    if(user.data){
        navigate("/")
    }    

    const [identifier, setIdentifier] = useState(null)
    const [password, setPasssword] = useState(null)
    const [res, setRes] = useState({loading: false, data: null, error: null})
    let loader = null

    const submitLogin = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data = {identifier: identifier, password: password}
        AuthServices.login(data)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    const setEverythingToNull = () => {
        setIdentifier(null)
        document.getElementById("identifier").value = ""
        setPasssword(null)
        document.getElementById("password").value = ""
    }

    if(res.loading){
        loader = loader = <div className="loader_mid"><Loader/></div>
    }
    if(res.data){
        setEverythingToNull()
        if(res.data.status === 'success'){
            toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setRes({loading: false, data: null, error: null})
        window.location.reload()
    }
    if(res.error){
        if(res.error.status === "fail"){
            toast.error(res.error.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        if(res.error.status === "fail-arr"){
            for (const [key, value] of Object.entries(res.error.message)) {
                toast.error(value[0], {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
            }
        }
        setRes({loading: false, data: null, error: null})
    }

    return (
        <div className="login-container">
            <ToastContainer/>
            {loader}
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
                                            <form onSubmit={submitLogin}>
                                                <div className="form-group">
                                                    <label htmlFor="identifier">Email or username</label>
                                                    <input type="text" className="form-control my-1" id="identifier" onChange={(e) => {setIdentifier(e.target.value)}} />
                                                </div>
                                                <div className="form-group mb-4">
                                                    <label htmlFor="password">Password</label>
                                                    <input type="password" className="form-control my-1" id="password" onChange={(e) => {setPasssword(e.target.value)}} />
                                                </div>
                                                <button type="submit" className="btn btn-outline-primary col-12 mb-4" disabled={res.loading}>Sign in</button>
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
