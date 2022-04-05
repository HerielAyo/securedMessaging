
import {LogLevel} from "./LogFilter";
import type {ILogger, ILogExport, ILogItem, LabelOrValues, LogCallback, LogItemValues} from "./types";

function noop (): void {}

export class NullLogger implements ILogger {
    public readonly item: ILogItem = new NullLogItem(this);

    log(): void {}

    run<T>(_, callback: LogCallback<T>): T {
        return callback(this.item);    
    }

    wrapOrRun<T>(item: ILogItem | undefined, _, callback: LogCallback<T>): T {
        if (item) {
            return item.wrap(_, callback);
        } else {
            return this.run(_, callback);
        }
    }

    runDetached(_, callback): ILogItem {
        new Promise(r => r(callback(this.item))).then(noop, noop);
        return this.item;
    }

    async export(): Promise<ILogExport | undefined> {
        return undefined;
    }

    get level(): typeof LogLevel {
        return LogLevel;
    }
}

export class NullLogItem implements ILogItem {
    public readonly logger: NullLogger;
    public readonly logLevel: LogLevel;
    public children?: Array<ILogItem>;
    public values: LogItemValues;
    public error?: Error;

    constructor(logger: NullLogger) {
        this.logger = logger;
    }

    wrap<T>(_: LabelOrValues, callback: LogCallback<T>): T {
        return callback(this);
    }

    log(): ILogItem {
        return this;
    }
    set(): ILogItem { return this; }

    runDetached(_: LabelOrValues, callback: LogCallback<unknown>): ILogItem {
        new Promise(r => r(callback(this))).then(noop, noop);
        return this;
    }

    wrapDetached(_: LabelOrValues, _callback: LogCallback<unknown>): void {
        return this.refDetached();
    }

    refDetached(): void {}

    ensureRefId(): void {}

    get level(): typeof LogLevel {
        return LogLevel;
    }

    get duration(): 0 {
        return 0;
    }

    catch(err: Error): Error {
        return err;
    }

    child(): ILogItem  {
        return this;
    }

    finish(): void {}

    serialize(): undefined {
        return undefined;
    }
}

export const Instance = new NullLogger(); 
