import React from 'react';

type GameProps = {
    gameOver: false | 'victory' | 'defeat' | string;
};

export const Game: React.FunctionComponent<GameProps> = props => {
    let gameOver = props.gameOver
    gameOver =  (gameOver === "victory") ? "Vous avez gagné ! =)" : (gameOver === "defeat") ? "Vous avez perdu ! =(" : ""
    return <div style={{textAlign: "center",fontWeight:"bold"}}>{gameOver}</div>;
};
