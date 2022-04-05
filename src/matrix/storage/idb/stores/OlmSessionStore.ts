 
import {Store} from "../Store";

function encodeKey(senderKey: string, sessionId: string): string {
    return `${senderKey}|${sessionId}`;
}

function decodeKey(key: string): { senderKey: string, sessionId: string } {
    const [senderKey, sessionId] = key.split("|");
    return {senderKey, sessionId};
}

interface OlmSession {
    session: string;
    sessionId: string;
    senderKey: string;
    lastUsed: number;
}

type OlmSessionEntry = OlmSession & { key: string };

export class OlmSessionStore {
    private _store: Store<OlmSessionEntry>;

    constructor(store: Store<OlmSessionEntry>) {
        this._store = store;
    }

    async getSessionIds(senderKey: string): Promise<string[]> {
        const sessionIds: string[] = [];
        const range = this._store.IDBKeyRange.lowerBound(encodeKey(senderKey, ""));
        await this._store.iterateKeys(range, key => {
            const decodedKey = decodeKey(key as string);
            // prevent running into the next room
            if (decodedKey.senderKey === senderKey) {
                sessionIds.push(decodedKey.sessionId);
                return false;   // fetch more
            }
            return true; // done
        });
        return sessionIds;
    }

    getAll(senderKey: string): Promise<OlmSession[]> {
        const range = this._store.IDBKeyRange.lowerBound(encodeKey(senderKey, ""));
        return this._store.selectWhile(range, session => {
            return session.senderKey === senderKey;
        });
    }

    get(senderKey: string, sessionId: string): Promise<OlmSession | undefined> {
        return this._store.get(encodeKey(senderKey, sessionId));
    }

    set(session: OlmSession): void {
        (session as OlmSessionEntry).key = encodeKey(session.senderKey, session.sessionId);
        this._store.put(session as OlmSessionEntry);
    }

    remove(senderKey: string, sessionId: string): void {
        this._store.delete(encodeKey(senderKey, sessionId));
    }
}
