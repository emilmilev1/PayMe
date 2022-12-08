import React from "react";

//import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
//import Header from "./Header";
//import Pricing from "../Pricing/Pricing";
import Blog from "../Blog/Blog";

const Homepage = () => {
    return (
        <>
            <Navbar />
            {/* <Header /> */}
            <Blog />
            {/* <Pricing /> */}
            <Footer />
        </>
    );
};

export default Homepage;
