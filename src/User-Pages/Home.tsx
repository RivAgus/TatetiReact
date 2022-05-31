import React, { useState } from 'react';
import { arrayBuffer } from 'stream/consumers';
import '../Components/css/bootstrap.css';
import '../Components/css/game.css';
import Board from '../Game/Board';


function Home(){
    const [ifJoin, setIfJoin] = useState(false);
    const [ifCreate, setIfCreate] = useState(false);
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [gameToken, setGameToken] = useState("");
    const [showMenu, setShowMenu] = useState(true);
    const [showBoard, setShowBoard] = useState(false);

    const createGame = (e: any) =>{
        debugger
        e.preventDefault();
        setIfCreate(false)
        setShowBoard(true);
        setShowMenu(false);
    }
    const handleClick = (i: any) => {
        return(
            i
        )
    }
    const joinGame=(e: any) =>{
        e.preventDefault();
    }
    return(
        <>
        <div className="page-header pt-4">
            {showMenu && ifJoin && ifCreate &&
                <h1>Welcome</h1>}
            {showMenu && !ifJoin && !ifCreate &&
            <>
            <div className="d-flex justify-content-center">
            <div className="row  " />
            <div className='card text-white bg-primary col-lg-3 d-flex justify-content-center'>
                <div className="card-header pt-4">
                    <h4>TicTacToe</h4>
                </div>
                    <div className="card-body mx-auto ">
                        <br />
                        <button className='btn btn-secondary' onClick={(e)=> setIfCreate(true)}> Create new game</button>

                        <p className='pt-4'>Or maybe</p>

                        <button className='btn btn-warning' onClick={(e) => setIfJoin(true)}>Join a friend</button>
                        <br />
                    </div>
                    </div>
            </div>
            </>}
            {ifCreate && 
            <div className="d-flex justify-content-center pt-2">
            <div className="row  " />
                <div className='card text-white bg-secondary col-lg-3 d-flex justify-content-center'>
                    <div className="card-header pt-4">
                        <h4>New game</h4>
                    </div>
                    <div className="card-body mx-auto ">
                        <form onSubmit={createGame}>
                        <label className='col-form-label'>Your name: </label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder='Your name here'
                            onChange={e => setPlayer1(e.target.value)}
                        />
                        <br />
                        <button className='btn btn-success'> Start new game</button>
                        </form>
                    </div>
                </div>
            </div>
            }
            {ifJoin && 
            <div className="d-flex justify-content-center pt-2">
            <div className="row  " />
                <div className='card text-white bg-warning col-lg-3 d-flex justify-content-center'>
                    <div className="card-header pt-4">
                        <h4>Join game</h4>
                    </div>
                    <div className="card-body mx-auto ">
                        <form onSubmit={(e)=>joinGame(e)}>
                        <label className='col-form-label'>Your name: </label>
                        <input
                            className='form-control'
                            type="text"
                            placeholder='Your name here'
                            onChange={e => setPlayer2(e.target.value)}
                        />
                        <label className='col-form-label'>Game ID: </label>
                        <input 
                            className='form-control'
                            type="text"
                            placeholder='Game ID given by your friend'
                            onChange={e => setGameToken(e.target.value)}
                            
                        />
                        <br />
                        <button className='btn btn-dark'> Join match</button>
                        </form>
                    </div>
                </div>
            </div>
            }

            { showBoard &&

            <Board 
                id=''
                board={Array(9).fill(null)}
                handleClick={handleClick}
                player1={{id:'', name: player1}}
                player2={{id:'',name:player2}}
            />

            }
        </div>
        </>
    );
}
export default Home;