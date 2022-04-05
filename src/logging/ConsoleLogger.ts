
import {BaseLogger} from "./BaseLogger";
import {LogItem} from "./LogItem";
import type {ILogItem, LogItemValues, ILogExport} from "./types";

export class ConsoleLogger extends BaseLogger {
    _persistItem(item: LogItem): void {
        printToConsole(item);
    }

    async export(): Promise<ILogExport | undefined> {
        return undefined;
    }
}

const excludedKeysFromTable = ["l", "id"];
function filterValues(values: LogItemValues): LogItemValues | null {
    return Object.entries(values)
        .filter(([key]) => !excludedKeysFromTable.includes(key))
        .reduce((obj: LogItemValues, [key, value]) => {
            obj = obj || {};
            obj[key] = value;
            return obj;
        }, null);
}

function printToConsole(item: LogItem): void {
    const label = `${itemCaption(item)} (${item.duration}ms)`;
    const filteredValues = filterValues(item.values);
    const shouldGroup = item.children || filteredValues;
    if (shouldGroup) {
        if (item.error) {
            console.group(label);
        } else {
            console.groupCollapsed(label);
        }
        if (item.error) {
            console.error(item.error);
        }
    } else {
        if (item.error) {
            console.error(item.error);
        } else {
            console.log(label);
        }
    }
    if (filteredValues) {
        console.table(filteredValues);
    }
    if (item.children) {
        for(const c of item.children) {
            printToConsole(c);
        }
    }
    if (shouldGroup) {
        console.groupEnd();
    }
}

function itemCaption(item: ILogItem): string {
    if (item.values.t === "network") {
        return `${item.values.method} ${item.values.url}`;
    } else if (item.values.l && typeof item.values.id !== "undefined") {
        return `${item.values.l} ${item.values.id}`;
    } else if (item.values.l && typeof item.values.status !== "undefined") {
        return `${item.values.l} (${item.values.status})`;
    } else if (item.values.l && item.error) {
        return `${item.values.l} failed`;
    } else if (typeof item.values.ref !== "undefined") {
        return `ref ${item.values.ref}`;
    } else {
        return item.values.l || item.values.type;
    }
}
