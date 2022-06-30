import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { withRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./views/Home";
import "./css/responsive.css"
import "./css/style.css"
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";


function App() {

  return (
    <div className="sub_page">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
