export type CellStatus = 'untouched' | 'flagged' | 'dug' | 'detonated';
export type CellAction = 'dig' | 'flag';

export class Cell {
    private _bomb: boolean;
    private _flagged: boolean;
    private _dug: boolean;
    private _adjacentMineCount: number;

    static withBomb(): Cell {
        return new Cell(true, false, false);
    }

    static withoutBomb(): Cell {
        return new Cell(false, false, false);
    }

    constructor(withBomb: boolean, flagged: boolean, dug: boolean, adjacentMineCount: number = 0) {
        this._bomb = withBomb;
        this._flagged = flagged;
        this._dug = dug;
        this._adjacentMineCount = adjacentMineCount;
    }

    flag(): Cell {
        if (this._dug === true) {
            throw new Error('This cell has already been dug');
        }
        if (!this._bomb) {
            throw new Error(`Can't run around flaggin cells !`);
        }
        return new Cell(this._bomb, !this._flagged, this._dug, this._adjacentMineCount);
    }

    dig(): Cell {
        return new Cell(this._bomb, false, true, this._adjacentMineCount);
    }

    get canBeRevealed(): boolean {
        return this._adjacentMineCount === 0;
    }

    get hasBomb(): boolean {
        return this._bomb;
    }

    get adjacentMinesCount(): number {
        return this._adjacentMineCount;
    }

    set adjacentMinesCount(count: number) {
        this._adjacentMineCount = count;
    }

    get detonated(): boolean {
        return this._bomb && this.dug;
    }

    get flagged(): boolean {
        return this._flagged;
    }

    get dug(): boolean {
        return this._dug;
    }

    get status(): CellStatus {
        if (this.detonated) {
            return 'detonated';
        }
        if (this.dug) {
            return 'dug';
        }
        if (this.flagged) {
            return 'flagged';
        }
        return 'untouched';
    }
}
