import React from "react";
import { Outlet } from "react-router-dom";
import '../Components/css/bootstrap.css';
import NavBar from "./NavBar";

function Layout(){

    return(
        <>
        < NavBar />
        <div className="container">
            <Outlet />    
        </div>
        </>
    );
}
export default Layout;