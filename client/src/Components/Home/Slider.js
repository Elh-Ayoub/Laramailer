import React from "react";
import heroBg from "../../images/hero-bg.png"
import sliderImg from "../../images/slider-img.png"

function Slider(){
    return (
        <div className="hero_area">
            <div className="hero_bg_box">
                <div className="bg_img_box">
                    <img src={heroBg} alt=""/>
                </div>
            </div>
            <section className="slider_section">
                <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="detail-box">
                                            <h1>
                                            Send <br/>
                                            Better Emails
                                            </h1>
                                            <p>
                                            This is the right place to build your email list and send scheduled email with cool templates
                                            </p>
                                            <div className="btn-box">
                                            <a href="" className="btn1">
                                                Get started
                                            </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box">
                                            <img src={sliderImg} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Slider
