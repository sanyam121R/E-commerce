import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Route } from "react-router-dom";

const RequiredAuth = ({ element: Element, path: path }) => {
    const auth = useSelector(state=> state.auth);
    const isAuthenticated = localStorage.getItem("loginStatus");
    const navigate = useNavigate();
    
    console.log("this", isAuthenticated);

    return (
        <Route element={isAuthenticated==="success" ? Element : navigate("/login")}/>
    );
}

export default RequiredAuth;