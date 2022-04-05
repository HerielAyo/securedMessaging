

export class SSOLoginHelper{
    private _homeserver: string;

    constructor(homeserver: string) {
        this._homeserver = homeserver;
    }

    get homeserver(): string { return this._homeserver; }

    createSSORedirectURL(returnURL: string): string {
        return `${this._homeserver}/_matrix/client/r0/login/sso/redirect?redirectUrl=${returnURL}`;
    }
}
