import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Dashboard/Footer";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import "../../css/dashboard.css"

function Dashboard(){
    const [showSide, setShowSide] = useState(true)

    return (
        <div id="wrapper" className={(showSide) ? ("wrapper-content") : ("wrapper-content toggled")}>
            <Sidebar active="Dashboard"/>
            <Navbar showSide={showSide} setShowSide={setShowSide}/>
            <div id="page-content-wrapper">                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Dashboard</h1>
                            <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, 
                            and will appear non-collapsed on larger screens.</p>
                            <p>Make sure to keep your content here</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default Dashboard
