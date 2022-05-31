import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../User-Pages/Home";
import Layout from "../Layout/Layout";
import About from "../User-Pages/About";
import Board from "../Game/Board";


function RouteGame(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout /> }>
                    <Route index element={<Home/>} />
                    <Route path='About' element={ <About />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );


}
export default RouteGame;