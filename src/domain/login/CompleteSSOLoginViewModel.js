

import {ViewModel} from "../ViewModel.js";
import {LoginFailure} from "../../matrix/Client.js";

export class CompleteSSOLoginViewModel extends ViewModel {
    constructor(options) {
        super(options);
        const {
            loginToken,
            client,
            attemptLogin,
        } = options;
        this._loginToken = loginToken;
        this._client = client;
        this._attemptLogin = attemptLogin;
        this._errorMessage = "";
        this.performSSOLoginCompletion();
    }

    get errorMessage() { return this._errorMessage; }

    _showError(message) {
        this._errorMessage = message;
        this.emitChange("errorMessage");
    }

    async performSSOLoginCompletion() {
        if (!this._loginToken) {
            return;
        }
        const homeserver = await this.platform.settingsStorage.getString("sso_ongoing_login_homeserver");
        let loginOptions;
        try {
            loginOptions = await this._client.queryLogin(homeserver).result;
        }
        catch (err) {
            this._showError(err.message);
            return;
        }
        if (!loginOptions.token) {
            this.navigation.push("session");
            return;
        }
        const status = await this._attemptLogin(loginOptions.token(this._loginToken));
        let error = "";
        switch (status) {
            case LoginFailure.Credentials:
                error = this.i18n`Your login token is invalid.`;
                break;
            case LoginFailure.Connection:
                error = this.i18n`Can't connect to ${homeserver}.`;
                break;
            case LoginFailure.Unknown:
                error = this.i18n`Something went wrong while checking your login token.`;
                break;
        }
        if (error) {
            this._showError(error);
        }
    }
}
