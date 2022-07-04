import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"


function Sidebar(props){
    return (
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand mb-4">
                    <Link to="/"><img src={logo} className="sidebar-brand-img"/></Link>
                </li>
                <li className={(props.active === "Dashboard") ? ("active") : ("")}>
                    <Link to="/dashboard"><i className="fa fa-dashboard"></i> Dashboard</Link>
                </li>
                <li className={(props.active === "My Mailers") ? ("active") : ("")}>
                    <a href="#"><i class="fa fa-envelope"></i> My Mailers</a>
                </li>
                <li className={(props.active === "Email lists") ? ("active") : ("")}>
                    <a href="#"><i class="fas fa-clipboard-list"></i> Email lists</a>
                </li>
                <li className={(props.active === "Templates") ? ("active") : ("")}>
                    <a href="#"><i class="fas fa-th-large"></i> Templates</a>
                </li>
                <li className={(props.active === "My account") ? ("active") : ("")}>
                    <Link to="/profile"><i class="fas fa-address-card"></i> My account</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
