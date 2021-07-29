import { Cell, CellAction } from './Cell';

export type Cells = Array<Cell>;

export class Grid {
    [key: number]: number;
    private _column: number;
    private _cells: Cells;

    static generate(row: number, column: number, minesCount: number): Grid {
        const length = row * column;
        let cells: Cells = [];
        for (let i = 0; i < length; i++) {
            const cell = minesCount > i ? Cell.withBomb() : Cell.withoutBomb();
            cells.push(cell);
        }

        let index = -1;
        while (++index < length) {
            const rand = index + Math.floor(Math.random() * (length - index));
            const cell = cells[rand];

            cells[rand] = cells[index];
            cells[index] = cell;
        }

        /* let tableCells: boolean[][] = [];
        let c = 0;
        // créer un tableau à 2 dimensions, interroger à gauche à droite en haut en bas si bomb est à true, si oui on augmente un compteur
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                if (!tableCells[i]) tableCells[i] = [];
                tableCells[i][j] = cells[c].bomb;
                c++;
            }
        }
        c = 0;
        let numberOfBombsNear = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                numberOfBombsNear = 0;
                tableCells[i - 1][j] === true ? numberOfBombsNear++ : '';
                tableCells[i + 1][j] === true ? numberOfBombsNear++ : '';
                tableCells[i][j - 1] === true ? numberOfBombsNear++ : '';
                tableCells[i][j + 1] === true ? numberOfBombsNear++ : '';
                cells[c].numberOfBombsNear = numberOfBombsNear;
                c++;
            }
        }

        console.log(tableCells);
        console.log(cells); */

        return new Grid(column, cells);
    }

    constructor(column: number, cells: Cells) {
        if (!Number.isInteger(column)) {
            throw new TypeError('column count must be an integer');
        }

        if (cells.length % column !== 0 || cells.length === 0) {
            throw new RangeError(
                'cell count must be dividable by column count'
            );
        }

        this._column = column;
        this._cells = cells;
    }

    [Symbol.iterator]() {
        return this._cells[Symbol.iterator]();
    }

    map(
        callbackfn: (value: Cell, index: number, array: Cell[]) => {},
        thisArg?: any
    ) {
        return this._cells.map(callbackfn);
    }

    cellByIndex(index: number): Cell | undefined {
        return this._cells[index];
    }

    cellByCoodinates(x: number, y: number): Cell | undefined {
        return this._cells[this._column * y + x];
    }

    sendActionToCell(cellIndex: number, action: CellAction): Grid {
        const cells = [...this._cells];
        const cell = cells[cellIndex];

        cells[cellIndex] = cell[action]();
        return new Grid(this._column, cells);
    }

    isDefeated = () => {
        for (let cell of this) {
            if (cell.detonated === true) return true;
        }
        return false;
    };

    isVictorious = () => {
        for (let cell of this) {
            if (
                (cell.dug === false && cell.flagged === false) ||
                (cell.dug === false &&
                    cell.flagged === true &&
                    cell.bomb === false) ||
                cell.detonated === true
            ) {
                return false;
            }
        }
        return true;
    };

    get column() {
        return this._column;
    }
}
