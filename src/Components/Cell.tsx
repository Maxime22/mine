import React from 'react';
import { CellStatus } from '../Domain/Cell';

type CellProps = {
    status: CellStatus;
    onclick: Function;
};

const emojis = {
    untouched: '',
    dug: '',
    flagged: '🚩',
    detonated: '💥',
};

const cellStyle = (status: CellStatus): React.CSSProperties => ({
    width: '40px',
    height: '40px',
    textAlign: 'center',
    lineHeight: '40px',
    border: '1px solid #004785',
    boxSizing: 'border-box',
    cursor: 'pointer',
    backgroundColor:
        status === 'untouched' || status === 'flagged' ? '#e8e8e8' : "white",
});

export const Cell: React.FunctionComponent<CellProps> = props => {
    console.log(props)
    return (
        <div
            onClick={ev => {
                ev.preventDefault();
                props.onclick(ev);
            }}
            onContextMenu={ev => {
                ev.preventDefault();
                props.onclick(ev);
            }}
            style={cellStyle(props.status)}
        >
            {props.status !== "dug" ? emojis[props.status] : "n"}
        </div>
    );
};
