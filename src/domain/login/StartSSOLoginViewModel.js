

import {ViewModel} from "../ViewModel.js";

export class StartSSOLoginViewModel extends ViewModel{
    constructor(options) {
        super(options);
        this._sso = options.loginOptions.sso;
        this._isBusy = false;
    }
   
    get isBusy() { return this._isBusy; }
    
    setBusy(status) {
        this._isBusy = status;
        this.emitChange("isBusy");
    }

    async startSSOLogin() {
        await this.platform.settingsStorage.setString("sso_ongoing_login_homeserver", this._sso.homeserver);
        const link = this._sso.createSSORedirectURL(this.urlCreator.createSSOCallbackURL());
        this.platform.openUrl(link);
    }
}
