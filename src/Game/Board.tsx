import React, { useState } from "react";
import Tile from "./Tile";
import {Player} from './Player'

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
            </div>
            <div className="container">
                <div className="gridCard">
                    {props?.board.map((value, index)=>(
                        <Tile
                            key={index}
                            value={value}
                            index={index}
                            handleClick={props?.handleClick}
                        />
                    ))}
                </div>
            </div>
    
        </>
    );

}
// export default Board;