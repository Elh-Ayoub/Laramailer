import React from "react";
import {BrowserRouter, Routes, Route, uselayout} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./views/Home";
import "./css/responsive.css"
import "./css/style.css"
import Header from "./Components/Header";
import Footer from "./Components/Footer";


function App() {
  return (
    <div className="sub_page">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
