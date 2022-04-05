

import {ViewModel} from "../../ViewModel.js";

export class UnknownRoomViewModel extends ViewModel {
    constructor(options) {
        super(options);
        const {roomIdOrAlias, session} = options;
        this._session = session;
        this.roomIdOrAlias = roomIdOrAlias;
        this._error = null;
        this._busy = false;
    }

    get error() {
        return this._error?.message;
    }

    async join() {
        this._busy = true;
        this.emitChange("busy");
        try {
            const roomId = await this._session.joinRoom(this.roomIdOrAlias);
            // navigate to roomId if we were at the alias
            // so we're subscribed to the right room status
            // and we'll switch to the room view model once
            // the join is synced
            this.navigation.push("room", roomId);
            // keep busy on true while waiting for the join to sync
        } catch (err) {
            this._error = err;
            this._busy = false;
            this.emitChange("error");
        }
    }

    get busy() {
        return this._busy;
    }

    get kind() {
        return "unknown";
    }
}