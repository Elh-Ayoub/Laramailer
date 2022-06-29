import React from "react";
import heroBg from "../images/hero-bg.png"

function Header(){
    return(
    <div className="hero_area">
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
                    Laramailer
                </span>
              </a>
    
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className=""> </span>
              </button>
    
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  ">
                  <li className="nav-item ">
                    <a className="nav-link" href="index.html">Home </a>
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
                    <a className="nav-link" href="team.html">Team</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-user" aria-hidden="true"></i> Login</a>
                  </li>
                  <form className="form-inline">
                    <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </form>
                </ul>
              </div>
            </nav>
          </div>
        </header>
    </div>
    )
}

export default Header
