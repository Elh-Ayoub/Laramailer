import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Services from "../Components/Home/Services";
import Slider from "../Components/Home/Slider";

function Home(){
    
    return<div>
        <Header/>
        <Slider/>
        <Services/>
        <Footer/>
    </div> 
}

export default Home
