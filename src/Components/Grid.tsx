import React from 'react';
import { GameContext } from '../GameContext';
import { Cell } from './Cell';
import { Game } from './Game';

export const Grid: React.FunctionComponent = () => {
    const { grid, updateGridCellStatus } = React.useContext(GameContext);

    const handleClick = (index: number, button: number) => {
        updateGridCellStatus(index, button === 0 ? 'dig' : 'flag');
    };

    const gameOver =
        (grid.isDefeated() && 'defeat') ||
        (grid.isVictorious() && 'victory') ||
        false;

        console.log(grid)

    return (
        <React.Fragment>
            <Game gameOver={gameOver} />
            <div
                style={{
                    display: 'flex',
                    border: '4px solid #004785',
                    borderRadius:'5px',
                    margin:"auto",
                    marginTop:"40px",
                    boxSizing: 'content-box',
                    flexWrap: 'wrap',
                    width: `calc(40px * ${grid.column})`,
                }}
            >
                {grid.map((cell, index) => (
                    <Cell
                        key={index}
                        status={cell.status}
                        onclick={(ev: MouseEvent) =>
                            handleClick(index, ev.button)
                        }
                    />
                ))}
            </div>
        </React.Fragment>
    );
};
