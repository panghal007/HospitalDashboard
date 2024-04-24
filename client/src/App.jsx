// App.jsx

import React from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import MainPage from "./components/MainPage";

import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
// import CaptureImage from './components/CaptureImage';
const App = () => {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />}>
                        <Route index path="/" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                    </Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    {/* <Route path='/capture' element={<CaptureImage />}></Route> */}
                    {/* <Route path='/dashboard' element={<Dashboard />}></Route>
          {/* <Route path='/add' element={<AddFoodItem />}></Route>
          <Route path='/userCalories' element={<UserCalories />}></Route> */}{" "}
                    */
                </Routes>
            </Router>
        </ChakraProvider>
    );
};

export default App;
