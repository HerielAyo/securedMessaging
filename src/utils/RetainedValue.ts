

export class RetainedValue {
    private readonly _freeCallback: () => void;
    private _retentionCount: number = 1;

    constructor(freeCallback: () => void) {
        this._freeCallback = freeCallback;
    }

    retain(): void {
        this._retentionCount += 1;
    }

    release(): void {
        this._retentionCount -= 1;
        if (this._retentionCount === 0) {
            this._freeCallback();
        }
    }
}
