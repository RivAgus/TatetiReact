import React, { useEffect, useState } from "react";
import {Player} from './Player'
import {Game} from '../Game/Game'
import axios from "axios";


export default function Board(props: {game: Game | undefined}){
    const boardTiles = [0,1,2,3,4,5,6,7,8]
    const winingCombos = [
        [0, 1, 2],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6]
    ]
    let checkTurn:NodeJS.Timer;

    const [turn, setTurn] = useState<number>();
    const [tiles, setTiles] = useState(new Array(9).fill(null));
    const [player1] = useState<Player | undefined>(props.game!.player1)
    const [player2] = useState<Player | undefined>(props.game!.player2)
    const [move, setMove] = useState<number>(9);

    const[ifWinner, setIfWinner]= useState(false);
    const[winner, setWinner]=useState("");

    const[player1name, setPlayer1Name] = useState("");
    const[player2name, setPlayer2Name]=useState("");

    const [game, setGame] = useState<Game>(props.game!)

    //This UseEffect wil only be used once
    useEffect(()=>{
        if(game && game.player1 !== undefined){
            getPlayerName(game.player2_id)
            setTurn(1)
            getGame(game.player1)
        }
        else if(game && game.player2 !== undefined){
            getPlayerName(game.player1_id)
            // setPlayer(game.player2)
            getGame(game.player2)
            setTurn(2)
        }
    },[])

    useEffect(()=>{
        if(turn === 1){
            setTimerTurn()
        }
    },[turn === 1])

    //To check turns
    const setTimerTurn = () => {
        checkTurn = setInterval(
            () => {
                checkPlayerTurn(checkTurn)},
            1000
        );  
    }

    //GetGame - to check the game
    //,{headers: {'Authorization': `Bearer ${player.token}`}}
    const getGame = async(player: Player) => {
        axios.get(`http://localhost:3000/games/${game!.id}`).then(response=> {
            if(response){
                let foundGame : Game = {
                    id: response.data.game.id,
                    player1_id: response.data.game.player1_id,
                    player2_id: response.data.game.player2_id,
                    game_state: response.data.game.game_state,
                    is_turn: response.data.game.is_turn,
                    player1: game.player1,
                    player2: game.player2
                }
                
                setGame(foundGame)
            }
        }).catch((response)=>{
            console.log(response)
        })
    }

    //To get the players name
    const getPlayerName = async(id: number) =>{
        axios.get(`http://localhost:3000/players/${id}/name`).then(response=>{
            if(response){
                if(player1 === undefined){
                    setPlayer1Name(response.data.player)
                    setPlayer2Name(game.player2!.name)
                }
                else if(player2 === undefined){
                    setPlayer1Name(game.player1!.name)
                    setPlayer2Name(response.data.player)
                }
            }
        }).catch(response=>{console.log(response)})

    }


    const handleClick = (i: any) => {
        //Check if it's the turn of the person playing
        if(game.is_turn === 1 && player2 !==undefined ){
            alert("Not your turn")
            return
        }
        else if(game.is_turn === 2 && player1 !== undefined){
            alert("Not your turn")
            return
        }

        const squares = tiles!.slice()
        if (squares[i]) {
            return
        }

        let moves = move - 1
        setMove(moves)
        checkIfTie()
        squares[i] = turn === 1 ? "X" : "O"
        setTiles(squares)
        let wiinner = checkIfWinner(squares)
        setPlay(i)

        if(wiinner === "O"){
            alert("Winner is O")
            setWinner(wiinner)
            setIfWinner(true)
            clearInterval(checkTurn)
            return
        }else if(wiinner === "X"){
            alert("Winner is X")
            setWinner(wiinner)
            setIfWinner(true)
            clearInterval(checkTurn)
            return
        } 
    }

    useEffect(()=>{
        if(winner !== ""){
           console.log(winner) 
        }
    },[winner])
    const checkIfTie = () => {
        if (move === 0) {
            alert("It's a tie")
            return
        }
    }

    const checkIfWinner = (tiles: any[]) => {
        for (let i = 0; i < winingCombos.length; i++) {
            const [a, b, c] = winingCombos[i];
            if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
                return tiles[a];
            }
        }
    return null;
}


    const setPlay = async(i:any)=>{
        axios.put(`http://localhost:3000/games/${game.id}/${game.player1_id}/${game.player2_id}/${turn}`,{played: i,winner: winner})
       .then(response => {setGame(response.data.game)
        setTimerTurn()}).catch(response=>{console.log(response.request.statusText)})
    }

    const checkPlayerTurn = async(check: NodeJS.Timer) => {
        axios.get(`http://localhost:3000/games/${game.id}`)
        .then(response=>{
            if(response){
                if(response.data.game.is_turn === turn){
                    let board = response.data.game.board.split("")
                    setTiles(board.map((e:any)=> e === "A" ? null : e))
                    clearInterval(checkTurn)
                }
                if(response.data.game.winner){
                    setWinner(response.data.game.winner)
                    setIfWinner(true)
                }
                setGame(response.data.game)
                
                }
            }).catch(error=>console.log(error.request.statusText))

    }
    function Tile(props: any){     
        return(
            <button className="tile" onClick={props.play}>
                {props.value}
            </button>
        )
    }

    const renderTiles = (t: number) => {
        return(
            <Tile
                value={tiles[t]}
                play={()=>handleClick(t)}
            />
        )
    }

    return(
        <>
            <div className="page-header pt-4">
                <h1>TicTacToe</h1>
                <div className="row">
                    <div className="col-lg-10">
                    <h5>Player 1: <span><strong>{player1name}</strong></span> </h5> 
                    <h5>Player 2: <span><strong>{player2name}</strong></span></h5>
                    
                    </div>
                    <div className="col-lg-2 ">
                        <h4 className="">Game code:</h4>
                        <input 
                            className="form-control"
                            placeholder={(props.game?.id)?.toString()}
                            readOnly
                        />
                        {ifWinner &&
                        <h4>WINNER IS {winner}</h4>}
                    </div>
                </div>
                
            </div>
            <div className="container">
                {!ifWinner &&
                <div className="gridCard">
                    {boardTiles.map((t)=>{
                        return(renderTiles(t))
                    })}
                </div>}
            </div>
            <div className="mt-4">
                <h5>Game status: {props.game?.game_state}</h5>
                <h5>Game turn: {game.is_turn === 1 ? player1name : player2name }</h5>
            </div>
    
        </>
    );
}
