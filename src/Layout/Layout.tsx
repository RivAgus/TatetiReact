import React from "react";
import { Outlet } from "react-router-dom";
import '../Components/css/bootstrap.css';

function Layout(){

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/Home">Tateti</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <a className="nav-link active" href="/Home">Home
                        <span className="visually-hidden">(current)</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/About">About</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">More</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/Register">Register </a>
                            <a className="dropdown-item" href="/Login">Login</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
        <div className="container">
            <Outlet />    
        </div>
        </>
    );
}
export default Layout;