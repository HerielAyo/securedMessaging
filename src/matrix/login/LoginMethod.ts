

import type {ILogItem} from "../../logging/types";
import type {HomeServerApi} from "../net/HomeServerApi.js";

export interface ILoginMethod {
    homeserver: string;
    login(hsApi: HomeServerApi, deviceName: string, log: ILogItem): Promise<Record<string, any>>;
}
