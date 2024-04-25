import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import "./MainPage.css";


import { Outlet } from "react-router-dom";

const MainPage = () => {

    return (
        <div className="hero" style={{ display: "flex", height: "100vh" }}>
            {/* Left side with image */}
            <div
                className="image-container"
                style={{ backgroundColor: "#f0f0f0" }}
            >
                <img className="back" src="back_crop.png" alt="Background" />
                <img className="logo" src="logo1.png" alt="Logo" />
                <h2>
                    Feel <span>Safe </span>Everywhere
                </h2>
            </div>

            {/* Right side with tabs */}
            <div className="right" >
            
            <img className="logo2" src="logo2.png" alt="Logo" />
            
            <div className="nav-container">
            
            
                    <NavLink to="/">Sign Up</NavLink>
                    <span className="">/</span>
                    <NavLink to="/login">Login</NavLink>
                    
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainPage;
