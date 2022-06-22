import React, { useEffect, useState } from 'react';
import '../Components/css/bootstrap.css';
import '../Components/css/game.css';
import Board from '../Game/Board';
import {ChevronBackOutline} from 'react-ionicons'
import {Player} from '../Game/Player'

export interface Game {
    id: number,
    game_state: string,
    is_turn: number,
    player1_id: number,
    player2_id: number,
    player1: Player | undefined,
    player2: Player | undefined
} 
function Home(){
    //Menus
    const [ifJoin, setIfJoin] = useState(false);
    const [ifCreate, setIfCreate] = useState(false);
    const [ifWaiting, setIfWaiting] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [showBoard, setShowBoard] = useState(false);
    //Players
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    //Create game
    const [gameID, setGameID] = useState("");
    const [game, setGame] = useState<Game>();
    
    //Create player
    const [playerCreated, setPlayerCreated] = useState<Player | undefined>()
    
    //Join game
    const [gameIDSearch, setGameIDSearch] = useState('');
    
    //This function registers the player created
    const createJoinGame = (e:any) => {
        e.preventDefault();
        if(ifCreate){
            postPlayer(player1)
        }
        else if(ifJoin){
            postPlayer(player2)
        }
    }
    //To create a new player
    const postPlayer = async(name: string) =>{
        const response = await fetch(`http://localhost:3000/players`,{
            method: 'POST',
            credentials: 'include',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({name})
        })
        const data = await response.json()
        if(response.status === 200){
            let newPlayer: Player ={
                id: data.player.id,
                name: data.player.name,
                token: data.player.token
            }
            setPlayerCreated(newPlayer)
        }
        else{
            console.log("An error occurred: " + response.statusText)
        }
    }
    //Creates a new game
    const postGame = async(player: Player) =>{
        //To change menus
            setShowMenu(false);
        const response = await fetch(`http://localhost:3000/games`,{
            method: 'POST',
            credentials: 'include',
            headers: {'Authorization': `Bearear ${player.token}`,
                'Content-type': 'application/json'},
            body: JSON.stringify({player1_id: player.id})
        });
        const data = await response.json();
        if(response.status === 200){
            let gameCreated : Game = {
                id: data.game.id,
                player1_id: data.game.player1_id,
                player2_id: data.game.player2_id,
                game_state: data.game.game_state,
                is_turn: data.game.game_state,
                player1: player,
                player2: undefined
            }
            
            setGame(gameCreated)
            setIfCreate(false)
            setIfWaiting(true)
        }
        else{
            console.log("An error occurred: " + response.statusText)
        }
    }

    useEffect(()=>{
        if(playerCreated !== undefined){
            if(ifCreate){
                postGame(playerCreated)
            }
            else{
                joinGame(gameIDSearch, playerCreated)
            }
        }
    },[playerCreated])

    const joinGame= async(gameID: string, player: Player) =>{
        //To change menus
        setIfCreate(false)
        setShowMenu(false);
        //Try to join the game
        const response = await fetch(`http://localhost:3000/games/${gameID}/join`,{
            method: 'PUT',
            credentials: 'include',
            headers: { 'Authorization': `Bearear ${player.token}`,
                'Content-type': 'application/json'},
            body: JSON.stringify({id: gameID, player2_id: player.id})
        });
        const data = await response.json();
        if(response.status === 200){
            let gameJoined : Game = {
                id: data.game.id,
                player1_id: data.game.player1_id,
                player2_id: data.game.player2_id,
                game_state: data.game.game_state,
                is_turn: data.game.game_state,
                player1: undefined,
                player2: player
            }
            setGame(gameJoined)
        }
        else{
            console.log("An error occurred: " + response.statusText)
        }
        
    }

    useEffect(() => {
        let check = setInterval(
            () => checkGameCanStart(),
            1000
        );

        const checkGameCanStart = () => {
            if (game && game.player1_id && game.player2_id) {
                setIfWaiting(false)
                setShowBoard(true)
                clearInterval(check)
            }
        }
    })

    //To go back in the menu
    const back = (e: any) =>{
        e.preventDefault()
        if(ifJoin){
            setIfJoin(false)
            setShowMenu(true)
        }
        if(ifCreate){
            setIfCreate(false)
            setShowMenu(true)
        }
    }

    return(
        <>
        <div className="page-header pt-4">
            {(ifJoin || ifCreate) &&
                <div className='d-flex align-baseline justify-content-start'>
                    <ChevronBackOutline
                    color={'#00000'} 
                    title={"GoBack"}
                    height="55px"
                    width="40px"
                    onClick={back}
                    /> 
                </div>}
            {!showBoard &&
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
            {ifWaiting &&
            <>
                <div className="d-flex justify-content-center pt-2">
                <div className="row  " />
                    <div className='card text-white bg-secondary col-lg-3 d-flex justify-content-center'>
                        <div className="card-header pt-4">
                            <h4>New game</h4>
                        </div>
                        <div className="card-body mx-auto ">
                            <h5>Waiting for other player...</h5>
                            <br />
                        </div>
                    </div>
                </div>
            </>}
            {ifCreate && 
            <>
            <div className="d-flex justify-content-center pt-2">
            <div className="row  " />
                <div className='card text-white bg-secondary col-lg-3 d-flex justify-content-center'>
                    <div className="card-header pt-4">
                        <h4>New game</h4>
                    </div>
                    <div className="card-body mx-auto ">
                        <form onSubmit={createJoinGame}>
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
            </>
            }
            {ifJoin && 
            <>
            <div className="d-flex justify-content-center pt-2">
            <div className="row  " />
                <div className='card text-white bg-warning col-lg-3 d-flex justify-content-center'>
                    <div className="card-header pt-4">
                        <h4>Join game</h4>
                    </div>
                    <div className="card-body mx-auto ">
                        <form onSubmit={(e)=>createJoinGame(e)}>
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
                            onChange={e => setGameIDSearch(e.target.value)}
                            
                        />
                        <br />
                        <button className='btn btn-dark'> Join match</button>
                        </form>
                    </div>
                </div>
            </div>
            </>
            }

            { showBoard &&

            <Board 
                game={game}
            />

            }
        </div>
        </>
    );
}
export default Home;