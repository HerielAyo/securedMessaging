

import type {AuthenticationData, RegistrationParams} from "../types";

export abstract class BaseRegistrationStage {
    protected _session: string;
    protected _nextStage: BaseRegistrationStage;
    protected readonly _params?: Record<string, any>

    constructor(session: string, params?: RegistrationParams) {
        this._session = session;
        this._params = params;
    }

    /**
     * eg: m.login.recaptcha or m.login.dummy
     */
    abstract get type(): string;

    /**
     * This method should return auth part that must be provided to
     * /register endpoint to successfully complete this stage
     */
    /** @internal */
    abstract generateAuthenticationData(): AuthenticationData;

    setNextStage(stage: BaseRegistrationStage) {
        this._nextStage = stage;
    }

    get nextStage(): BaseRegistrationStage {
        return this._nextStage;
    }
}
