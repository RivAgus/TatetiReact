import React from 'react'

function About(){

    return(
        <>
        <div className="page-header pt-4">
            <h1>About</h1>
            <p className='lead'>'Tateti' or 'Tic tac toe'</p>
            <br />
            <div className='row'>
                <div className='col-lg-8 col-md-7 col-sm-6'>
                    <h3>Gameplay</h3>
                    <p>
                        The goal of tic-tac-toe is to be the first player to get three in a row on a 3-by-3 grid.
                    </p>
                    <p>
                        In a 3-by-3 grid game, the player who is playing "X" always goes first. Players alternate placing Xs and Os on the board until either player has three in a row, horizontally, vertically, or diagonally or until all squares on the grid are filled. If a player is able to draw three Xs or three Os in a row, then that player wins. If all squares are filled and neither player has made a complete row of Xs or Os, then the game is a draw.
                    </p>

                    <br />

                    <h3>Code</h3>
                    <p>
                        <strong>Frontend: </strong> ReactJS
                        <br />
                        <strong>Backend:  </strong> Ruby on Rails
                        <br />
                        <span className='text-secondary'><strong>Developer: </strong></span> Agustina Riveros
                    </p>
                </div>
            </div>
            
        </div>
        
        </>

    );

}
export default About;