import React, { useEffect, useState } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import AuthServices from "../services/Auth"
import Img from "../images/slider-img.png"
import { Link } from "react-router-dom"


function About(){
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

    return(
        <div className="sub_page">
            <Header user={user}/>
            <section class="about_section layout_padding">
                <div class="container">
                <div class="heading_container heading_center">
                    <h2>
                    About <span>Us</span>
                    </h2>
                </div>
                <div class="row">
                    <div class="col-md-6 ">
                    <div class="img-box">
                        <img src={Img} alt="Image"/>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="detail-box">
                        <h3>
                        We Are Laramiler
                        </h3>
                        <p>
                            Laramiler is a service that can help you store and build an email list, and create cool templates that fits your needs
                            and easly send generated templates to your clients, immedialtly or create a scheduler that sends daily or twice daily
                            or monthly or twice monthly or even yearly.
                        </p>
                        <p>
                            If you are stuck in somewhere or have some questions you can check <Link to="/documentation">Documentation</Link> page 
                            that can help you and answer most comman question that comes in your way. Or you can send message
                            in <Link to="/contact-us">Contact us</Link> page.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <Footer/>
        </div>
    ) 
}

export default About
