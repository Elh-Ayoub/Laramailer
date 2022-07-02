import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom"
import { withRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./views/Home";
import "./css/responsive.css"
import "./css/style.css"
import Register from "./views/Auth/Register";
import Login from "./views/Auth/Login";
import ResetPassword from "./views/Auth/ResetPassword";
import ResendVerification from "./views/Auth/ResendVerification";
import 'react-toastify/dist/ReactToastify.css';
import AuthServices from "./services/Auth";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ResetPassword />} />
          <Route path="/auth/resend-verification" element={<ResendVerification />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
