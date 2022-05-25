import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Game from "../Game/Game";
import Layout from "../Layout/Layout";


function RouteGame(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout /> }>
                    <Route path='Home' element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );


}
export default RouteGame;