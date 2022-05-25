import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Game from "../Game/Game";
import Layout from "../Layout/Layout";
import About from "../User-Pages/About";


function RouteGame(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout /> }>
                    <Route path='Home' element={<Game />} />
                    <Route path='About' element={ <About />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );


}
export default RouteGame;