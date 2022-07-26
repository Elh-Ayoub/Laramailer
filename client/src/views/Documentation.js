import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AuthServices from "../services/Auth";
import "../css/documentation.css"
import { Link } from "react-router-dom";
import emailListImg from "../images/emailList.png"
import mailerImg from "../images/mailers.png"
import freebieImg from "../images/freebies.png"


function Documentation(){
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

    return (
        <div className="sub_page">
            <Header user={user}/>
            <section className="mt-5">
                <div className="container">
                    <div className="section-heading wow fadeIn">
                        <h2></h2>
                        <div className="heading-separator"></div>
                    </div>
                    
                    <div className="row">
                        <div className="history-wrapper">
                            <div className="title-wrap text-center one-of-two">
                                <h2 className="h1 text-secondary mb-0 text-uppercase"></h2>
                                <p className="fs-3 font-weight-500">Documentation</p>
                            </div>
                            <div className="timeline-box one-of-two">
                                <img className="mb-1-6 rounded img-fluid border" src={emailListImg} alt="..."/>
                                <div className="content">
                                    <h3 className="h4 mb-2 mb-md-3 text-left">Email list</h3>
                                    <p className="mb-0 text-left">
                                        First thing you need is an email list, creating email list is not a big deal you just need to log in,
                                        access you dashboard, email lists section and click "Create list" button, you need to name it and with a small
                                        description will be better. Before deleting an email list make sure not attached with a mailer because it will be paused.
                                    </p>
                                </div>
                                <div className="year">1</div>
                            </div>
                            <div className="timeline-box one-of-two">
                                <img className="mb-1-6 rounded img-fluid border" src="https://via.placeholder.com/280x280/FF7F50/000000" alt="..."/>
                                <div className="content">
                                    <h3 className="h4 mb-2 mb-md-3 text-left">Template</h3>
                                    <p className="mb-0 text-left">
                                        Another challenging step it to create a template, in template section you have default template which you can edit
                                        for you own reasons.
                                        <br/><br/>
                                        For update a template you have there tabs in update template page. First one is for preview, second you can update images
                                        in templates. Third tab is for updatingtext and links in template and changes can be seen after saving changes bu clicking 
                                        "Save changes" in buttom of page.
                                        <br/><br/>
                                        If you are developer or have basic knowledge about HTML/CSS last tab is for you, you find html code of your template, but you must
                                        keep in mind that inline css is very recomended for email templates.
                                    </p>
                                </div>
                                <div className="year">2</div>
                            </div>
                            <div className="timeline-box one-of-two">
                                <img className="mb-1-6 rounded img-fluid border" src={mailerImg} alt="..."/>
                                <div className="content">
                                    <h3 className="h4 mb-2 mb-md-3 text-left">Mailers</h3>
                                    <p className="mb-0 text-left">
                                        After having a template and email list, it's time to create a mailer. You have multipe choices, you can create scheduled mailer that
                                        sends template selected to emails in selected list, you can setup a daily, twice daily, weekly, twice monthly and yearly frequencies.
                                        <br/>
                                        You can also create a mailer that sends once at desired time. and it will be saved in your dashbord to resend it any time you want.
                                        <br/><br/>
                                        Keep in mind that in a template or email list that is attached to mailer has been deleted the mailer will be stopped and cannot be sent.
                                        <br/>
                                        And you can set reply email, it's your account email by default, and from name is you full name in account settings.
                                    </p>
                                </div>
                                <div className="year">3</div>
                            </div>
                            <div className="timeline-box one-of-two">
                                <img className="mb-1-6 rounded img-fluid border" src={freebieImg} alt="..."/>
                                <div className="content">
                                    <h3 className="h4 mb-2 mb-md-3 text-left">Freebies</h3>
                                    <p className="mb-0 text-left">
                                        Freebies are greate tool for growing you email list, just share a greate thing (guid, book, demo ...) with other people
                                        insterested. A accessible link will be provided after freebie creation and to download the freebie a valid email is needed in the email append to email list selected at creation
                                        automatically. 
                                        <br/><br/>
                                        if in some how email list selected has been deleted if new email comes a new list will be created automatically and append email.
                                        <br/><br/>
                                        And if you have any other suggestion please send a message to administration in <Link to="/contact-us">Contact us</Link>
                                    </p>
                                </div>
                                <div className="year">4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Documentation
