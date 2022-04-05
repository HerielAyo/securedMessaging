

import {ViewModel} from "./ViewModel.js";
import {Client} from "../matrix/Client.js";

export class LogoutViewModel extends ViewModel {
    constructor(options) {
        super(options);
        this._sessionId = options.sessionId;
        this._busy = false;
        this._showConfirm = true;
        this._error = undefined;
    }

    get showConfirm() {
        return this._showConfirm;
    }

    get busy() {
        return this._busy;
    }

    get cancelUrl() {
        return this.urlCreator.urlForSegment("session", true);
    }

    async logout() {
        this._busy = true;
        this._showConfirm = false;
        this.emitChange("busy");
        try {
            const client = new Client(this.platform);
            await client.startLogout(this._sessionId);
            this.navigation.push("session", true);
        } catch (err) {
            this._error = err;
            this._busy = false;
            this.emitChange("busy");
        }
    }

    get status() {
        if (this._error) {
            return this.i18n`Could not log out of device: ${this._error.message}`;
        } else {
            return this.i18n`Logging out… Please don't close the app.`;
        }
    }
}
