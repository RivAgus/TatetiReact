import React, { useState } from "react";


function Tile(props: any){
    const [symbolPlayer, setSymbolPlayer] = useState('');

    const handleClick = () => {
        if(props.player == "X"){
            return show("X")
        }
        else {return show("O")}
    }
    const show = (symbol: string) =>{
        setSymbolPlayer(symbol)
    }

    return(
        <>
            <button className="tile" onClick={handleClick}>{symbolPlayer}</button>
        </>
    );

}
export default Tile;