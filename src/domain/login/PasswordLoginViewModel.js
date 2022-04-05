

import {ViewModel} from "../ViewModel.js";
import {LoginFailure} from "../../matrix/Client.js";

export class PasswordLoginViewModel extends ViewModel {
    constructor(options) {
        super(options);
        const {loginOptions, attemptLogin} = options;
        this._loginOptions = loginOptions;
        this._attemptLogin = attemptLogin;
        this._isBusy = false;
        this._errorMessage = "";
    }

    get isBusy() { return this._isBusy; }
    get errorMessage() { return this._errorMessage; }

    setBusy(status) {
        this._isBusy = status;
        this.emitChange("isBusy");
    }

    _showError(message) {
        this._errorMessage = message;
        this.emitChange("errorMessage");
    }

    async login(username, password) {
        this._errorMessage = "";
        this.emitChange("errorMessage");
        const status = await this._attemptLogin(this._loginOptions.password(username, password));
        let error = "";
        switch (status) {
            case LoginFailure.Credentials:
                error = this.i18n`Your username and/or password don't seem to be correct.`;
                break;
            case LoginFailure.Connection:
                error = this.i18n`Can't connect to ${this._loginOptions.homeserver}.`;
                break;
            case LoginFailure.Unknown:
                error = this.i18n`Something went wrong while checking your login and password.`;
                break;
        }
        if (error) {
            this._showError(error);
        }
    }
}
