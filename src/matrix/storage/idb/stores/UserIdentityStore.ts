 
import {Store} from "../Store";

interface UserIdentity {
    userId: string;
    roomIds: string[];
    deviceTrackingStatus: number;
}

export class UserIdentityStore {
    private _store: Store<UserIdentity>;

    constructor(store: Store<UserIdentity>) {
        this._store = store;
    }

    get(userId: string): Promise<UserIdentity | undefined> {
        return this._store.get(userId);
    }

    set(userIdentity: UserIdentity): void {
        this._store.put(userIdentity);
    }

    remove(userId: string): void {
        this._store.delete(userId);
    }
}
