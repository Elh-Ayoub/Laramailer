import React, { useEffect, useState } from "react";
import heroBg from "../images/hero-bg.png"
import logo from "../images/logo-w.png"
import { Link } from "react-router-dom";
import AuthServices from "../services/Auth";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";


function Header(props){
  const [res, setRes] = useState({loading: false, data: null, error: null})
  const logout = () => {
    setRes({loading: true, data: null, error: null})
    AuthServices.logout()
    .then(response => {
        setRes({loading: false, data: response.data, error: null})
    })
    .catch(error => {
        setRes({loading: false, data: null, error: error.response.data})
    })
  }

  let loader = null
  if(res.loading){
    loader = loader = <div className="loader_mid"><Loader/></div>
  }
  if(res.data){
    if(res.data.status === 'success'){
        toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
    }
    setRes({loading: false, data: null, error: null})
    window.location.reload()
  }

  return(
    <div className="hero_area">
        <ToastContainer/>
        {loader}
        <div className="hero_bg_box">
          <div className="bg_img_box">
            <img src={heroBg} alt=""/>
          </div>
        </div>
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container ">
              <a className="navbar-brand" href="index.html">
                <span>
                    <img className="mx-2" style={{height: "45px"}} src={logo}/>
                </span>
              </a>
    
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className=""> </span>
              </button>
    
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  align-items-center">
                  <li className="nav-item ">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html"> About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="service.html">Services</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="why.html">Why Us</a>
                  </li>
                  <li className="nav-item">
                    {(props.user.data) ? (
                      <Link to="/auth/login" className="nav-link"><i className="fa fa-user mr-1" aria-hidden="true"></i> {props.user.data.username}</Link>
                    ) : (
                      <Link to="/auth/login" className="nav-link"><i className="fa fa-user" aria-hidden="true"></i> Login</Link>
                    )}
                  </li>
                  {(props.user.data) ? (
                    <li className="nav-item">
                      <button className="btn btn-outline-light" onClick={logout}><i className="fa fa-sign-out mr-1" aria-hidden="true"></i> Logout</button>
                    </li>
                  ) : (null)}
                </ul>
              </div>
            </nav>
          </div>
        </header>
    </div>
  )
}

export default Header
