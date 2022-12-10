import React from "react";

//import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
import Header from "./Header";
//import Pricing from "../Pricing/Pricing";
import Blog from "../Blog/Blog";
import Profile from "../Profile/Profile";

const Homepage = () => {
    return (
        <>
            <Navbar />
            <Header />
            {/* <Blog />  */}
            {/* <Profile /> */}
            {/* <Pricing /> */}
            <Footer />
        </>
    );
};

export default Homepage;
