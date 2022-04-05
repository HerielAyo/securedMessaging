

import {ILogItem} from "../../logging/types";
import {ILoginMethod} from "./LoginMethod";
import {HomeServerApi} from "../net/HomeServerApi.js";

export class PasswordLoginMethod implements ILoginMethod {
    private readonly _username: string;
    private readonly _password: string;
    public readonly homeserver: string;

    constructor({username, password, homeserver}: {username: string, password: string, homeserver: string}) {
        this._username = username;
        this._password = password;
        this.homeserver = homeserver;
    }

    async login(hsApi: HomeServerApi, deviceName: string, log: ILogItem): Promise<Record<string, any>> {
        return await hsApi.passwordLogin(this._username, this._password, deviceName, {log}).response();
    }
}
