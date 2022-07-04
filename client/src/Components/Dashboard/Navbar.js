import React, { useState } from "react";
import { Link } from "react-router-dom";


function Navbar(props){
    const [showNav, setShowNav] = useState(false);

    return (
        <div className="d-flex justify-content-between align-items-center p-3">
            <div className="navbar-header">
                <button className="navbar-toggler btn-md" type="button" onClick={() => {props.setShowSide(!props.showSide)}}>
                    <i className="fa fa-bars"></i>
                </button>
            </div>
            <nav className="navbar navbar-expand-lg navbar-dashboar justify-content-end">            
                <button className="navbar-toggler btn-md" type="button" data-toggle="collapse" data-target="#dashboard_navbar" onClick={() => {setShowNav(!showNav)}} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
        
                <div className={(showNav) ? ("collapse navbar-collapse navbar-dashboard nav-border-bottom show") : ("collapse navbar-collapse navbar-dashboard nav-border-bottom")}  id="dashboard_navbar">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link dashboard-nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link dashboard-nav-link" href="#">Documentation</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link dashboard-nav-link" href="#">logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
