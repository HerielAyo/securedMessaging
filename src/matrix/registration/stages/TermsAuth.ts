

import {AuthenticationData} from "../types";
import {BaseRegistrationStage} from "./BaseRegistrationStage";

export class TermsAuth extends BaseRegistrationStage {
    generateAuthenticationData(): AuthenticationData {
        return {
            session: this._session,
            type: this.type,
            // No other auth data needed for m.login.terms
        };    
    }

    get type(): string {
        return "m.login.terms";
    }

    get privacyPolicy() {
        return this._params?.policies["privacy_policy"];
    }

    get termsOfService() {
        return this._params?.policies["terms_of_service"];
    }
}
