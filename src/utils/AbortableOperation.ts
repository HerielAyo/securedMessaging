 

import {BaseObservableValue, ObservableValue} from "../observable/ObservableValue";

export interface IAbortable {
    abort();
}

export type SetAbortableFn = (a: IAbortable) => typeof a;
export type SetProgressFn<P> = (progress: P) => void;
type RunFn<T, P> = (setAbortable: SetAbortableFn, setProgress: SetProgressFn<P>) => T;

export class AbortableOperation<T, P = void> implements IAbortable {
    public readonly result: T;
    private _abortable?: IAbortable;
    private _progress: ObservableValue<P | undefined>;

    constructor(run: RunFn<T, P>) {
        this._abortable = undefined;
        const setAbortable: SetAbortableFn = abortable => {
            this._abortable = abortable;
            return abortable;
        };
        this._progress = new ObservableValue<P | undefined>(undefined);
        const setProgress: SetProgressFn<P> = (progress: P) => {
            this._progress.set(progress);
        };
        this.result = run(setAbortable, setProgress);
    }

    get progress(): BaseObservableValue<P | undefined> {
        return this._progress;
    }

    abort() {
        this._abortable?.abort();
        this._abortable = undefined;
    }
}
