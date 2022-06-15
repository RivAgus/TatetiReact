import React, { useState } from "react";
import Tile from "./Tile";
import {Player} from './Player'
import { PlayCircle } from "react-ionicons";

interface GameProps {
    id: string;
    board: number[];
    handleClick(index: number): void;
    player1: Player;
    player2: Player;

}

export default function Board(props: undefined | GameProps){

    
    return(
        <>
            <div className="page-header pt-4">
                <h1>TicTacToe</h1>
                <div className="row">
                    <div className="col-lg-10">
                    <h5>Player 1: <span><strong>{props?.player1.name}</strong></span> </h5> 
                    { (props?.player2.name.valueOf() !== '') ?
                        <h5>Player 2: <span><strong>{props?.player2.name}</strong></span></h5>
                    :   <h5>Player 2: <span>Waiting for player 2...</span></h5>}
                    </div>
                    <div className="col-lg-2 ">
                        <h4 className="">Game code:</h4>
                        <input 
                            className="form-control"
                            placeholder={props?.id}
                            readOnly
                        />
                    </div>
                </div>
                
            </div>
            <div className="container">
                <div className="gridCard">
                    <div className="tile"></div>
                    <div className="tile"></div>
                    <div className="tile"></div>
                    <div className="tile"></div>
                    <div className="tile"></div>
                    <div className="tile"></div>
                    <div className="tile"></div>
                    <div className="tile"></div>
                    <div className="tile"></div>
                </div>
            </div>
            <div className="mt-4">
                <h5>Game status: </h5>
            </div>
    
        </>
    );

}
// export default Board;