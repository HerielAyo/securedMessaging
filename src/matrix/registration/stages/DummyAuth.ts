

import {AuthenticationData} from "../types";
import {BaseRegistrationStage} from "./BaseRegistrationStage";

export class DummyAuth extends BaseRegistrationStage {
    generateAuthenticationData(): AuthenticationData {
        return {
            session: this._session,
            type: this.type,
        };    
    }

    get type(): string {
        return "m.login.dummy";
    }
}
