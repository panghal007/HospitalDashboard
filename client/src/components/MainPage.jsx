import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import "./MainPage.css";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const handleSignupSuccess = () => {
        setActiveTab("login"); // Redirect to login tab after successful signup
    };
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Left side with image */}
            <div
                className="image-container"
                style={{ width: "40%", backgroundColor: "#f0f0f0", padding: "20px" }}
            >
                <img className="back" src="back_crop.png" alt="Background" />
                <img className="logo" src="logo1.png" alt="Logo" />
                <h2>
                    Feel <span>Safe </span>Everywhere
                </h2>
            </div>

            {/* Right side with tabs */}
            <div style={{ width: "60%", padding: "20px" }}>
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
