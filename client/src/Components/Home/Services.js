import React from "react";
import S1 from "../../images/s1.png"
import S2 from "../../images/s2.png"
import S3 from "../../images/s3.png"


function Services(){
    return(
        <section className="service_section layout_padding">
            <div className="service_container">
            <div className="container ">
                <div className="heading_container heading_center">
                <h2>
                    Our <span>Services</span>
                </h2>
                <p>There are many services that we can help with</p>
                </div>
                <div className="row">
                    <div className="col-md-4 ">
                        <div className="box ">
                        <div className="img-box">
                            <img src={S1} alt="Email lists"/>
                        </div>
                        <div className="detail-box">
                            <h5>
                            Email lists
                            </h5>
                            <p>You can build multy list for multi email senders </p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="box ">
                        <div className="img-box">
                            <img src={S2} alt="Scheduler"/>
                        </div>
                        <div className="detail-box">
                            <h5>
                            Schedule emails
                            </h5>
                            <p>
                                We take care of scheduling your email list with desired frequency forever
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="box ">
                        <div className="img-box">
                            <img src={S3} alt="Templates"/>
                        </div>
                        <div className="detail-box">
                            <h5>
                            Creative templates
                            </h5>
                            <p>
                            Choose a default template, customize it, or build your own with HTML/CSS
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default Services
