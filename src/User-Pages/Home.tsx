import React, { useEffect, useState } from 'react';
import '../Components/css/bootstrap.css';
import '../Components/css/game.css';
import Board from '../Game/Board';
import {ChevronBackOutline} from 'react-ionicons'
import {Player} from '../Game/Player'
import axios from 'axios';
import {Game} from '../Game/Game'


let check: NodeJS.Timer;

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
    const [game, setGame] = useState<Game>();
    
    //Create player
    const [playerCreated, setPlayerCreated] = useState<Player>()
    
    //Join game
    const [gameIDSearch, setGameIDSearch] = useState<number>();
    


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
        const res = (await axios.post(`http://localhost:3000/players`,{
            name: name
        }))

        if(res){
            let newPlayer: Player ={
                id: res.data.player.id,
                name:res.data.player.name,
                token: res.data.player.token
            }
            setPlayerCreated(newPlayer)
        }

    }

// useEffect(()=>{
//     console.log("player: "+playerCreated)
// },[playerCreated])

    //Creates a new game
    const postGame = async(player: Player) =>{
        //To change menus
        setShowMenu(false);
        //post
        axios.post(`http://localhost:3000/games`,{player1_id: player.id},{headers: {"Authorization": `Bearer ${player.token}`}}).then((response:any)=>{
            if(response){
                let gameCreated : Game = {
                    id: response.data.game.id,
                    player1_id: response.data.game.player1_id,
                    player2_id: response.data.game.player2_id,
                    game_state: response.data.game.game_state,
                    is_turn: response.data.game.is_turn,
                    player1: player,
                    player2: undefined
                }
                setGame(gameCreated)
                setIfCreate(false)
                setIfWaiting(true)
            }
        }).catch((response)=>{
            console.log(response.request.statusText);
        })
       
    }

    useEffect(()=>{
        if(playerCreated){
            console.log("Player en created para post o join: "+playerCreated)
            if(ifCreate){
                postGame(playerCreated)
            }
            else{
                joinGame(gameIDSearch!, playerCreated)
            }
        }
    },[playerCreated])

    const joinGame= async(gameID: number, player: Player) =>{
        //To change menus
        setIfCreate(false)
        setShowMenu(false);
        //Try to join the game
        axios.put(`http://localhost:3000/games/${gameID}/join`,{id: gameID, player2_id: player.id},{headers: {"Authorization": `Bearer ${player.token}`}}).then((response:any)=>{
            if(response){
                let gameJoined  : Game = {
                    id: response.data.game.id,
                    player1_id: response.data.game.player1_id,
                    player2_id: response.data.game.player2_id,
                    game_state: response.data.game.game_state,
                    is_turn: response.data.game.is_turn,
                    player1: undefined,
                    player2: player
                }
                setGame(gameJoined )
                setIfJoin(false)
                setShowBoard(true)

            }
        }).catch((response)=>{
            console.log(response.request.statusText);
        })

}


const checkGameCanStart = () => {
    if(game!.player1 !== undefined){
        getGame(game!.player1)
    }
    if(game!.player2 !== undefined){
        getGame(game!.player2)
    }
    
}



useEffect(() => {
    if(ifWaiting){
        checkGame()
    }
        
},[ifWaiting])


const checkGame = () => {
    check = setInterval(()=>{
            checkGameCanStart()},5000
    )
}

    const getGame = async(player: Player) => {
        axios.get(`http://localhost:3000/games/${game!.id}/${player.id}`,{headers: {'Authorization': `Bearer ${player.token}`}}).then(response=> {
            if(response.data.game.player1_id && response.data.game.player2_id){
                let foundGame : Game = {
                    id: response.data.game.id,
                    player1_id: response.data.game.player1_id,
                    player2_id: response.data.game.player2_id,
                    game_state: response.data.game.game_state,
                    is_turn: response.data.game.is_turn,
                    player1: game!.player1,
                    player2: game!.player2
                }
                setGame(foundGame)
                setIfWaiting(false)
                setShowBoard(true)
                clearInterval(check)
            }
        }).catch((response)=>{
            console.log(response.request.statusText)
        })
    }
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
                            <h5>Waiting ...</h5>
                            <br />
                            <label className='col-form-label'>Game code</label>
                            <input className="form-control" type="text" readOnly placeholder={(game!.id).toString()} />
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
                            type="number"
                            placeholder='Game ID given by your friend'
                            onChange={e => setGameIDSearch(e.target.valueAsNumber)}
                            
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