import React from "react";


function Tile(props: any){

    return(
        <>
            <button className="tile" onClick={props.handleClick()}>{props.value}</button>
        </>
    );

}
export default Tile;