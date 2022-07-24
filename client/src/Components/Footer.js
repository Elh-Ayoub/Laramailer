import React from "react";
import { Link } from "react-router-dom";


function Footer(){
    return (
        <div>
        <section className="info_section layout_padding2">
            <div className="container">
            <div className="row">
                <div className="col-md-6 col-lg-3 info_col">
                    <div className="info_contact">
                        <h4>Info</h4>
                        <div className="contact_link_box">
                            <a href="tel://212639109957">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                                <span>+212-639109957</span>
                            </a>
                            <a href="https://t.me/Elh98ayoub">
                                <i className="fas fa-paper-plane" aria-hidden="true"></i>
                                <span>+380-955072544</span>
                            </a>
                            <a href="mailto:contact@laramailer.com">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                <span>contact@laramailer.com</span>
                            </a>
                        </div>
                    </div>
                    <div className="info_social">
                        <a href="">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/ayoub-el-haddadi-590b99219/" target="_blank">
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                        <a href="https://github.com/Elh-Ayoub/" target="_blank">
                            <i className="fa fa-github" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 info_col">
                    <div className="info_detail">
                        <h4>About</h4>
                        <p>
                            Laramiler is a service that can help you store and build an email list, 
                            and create cool templates that fits your needs, send it or schedule a loop mailers
                        </p>
                        <Link to="/about" className="">
                            Read more &raquo;
                        </Link>
                    </div>
                </div>
                <div className="col-md-6 col-lg-2 mx-auto info_col">
                    <div className="info_link_box">
                        <h4>Links</h4>
                        <div className="info_links">
                        <Link to="/" className="">
                            Home
                        </Link>
                        <Link to="/about" className="">
                            About
                        </Link>
                        <Link to="/contact-us" className="">
                            Contact us
                        </Link>
                        <Link to="/documentation" className="">
                            Documentation
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
        <section className="footer_section">
            <div className="container">
                <p>
                    &copy; <span id="displayYear">{new Date().getFullYear()}</span> All Rights Reserved By 
                    <a className="text-info" href="https://www.linkedin.com/in/ayoub-el-haddadi-590b99219/"> Ayoub El-Haddadi</a>
                </p>
            </div>
        </section>
        </div>
    )
}

export default Footer
