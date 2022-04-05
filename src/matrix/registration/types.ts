

export type AccountDetails = {
    username: string | null;
    password: string;
    initialDeviceDisplayName: string;
    inhibitLogin: boolean;
} 

export type RegistrationResponse = RegistrationResponseMoreDataNeeded | RegistrationResponseSuccess;

export type RegistrationResponseMoreDataNeeded = {
    completed?: string[];
    flows: RegistrationFlow[];
    params: Record<string, any>;
    session: string;
    status: 401;
} 

export type RegistrationResponseSuccess = {
    user_id: string;
    device_id: string;
    access_token?: string;
    status: 200;
}

export type RegistrationFlow = {
    stages: string[];
}

/* Types for Registration Stage */
export type AuthenticationData = {
    type: string;
    session: string;
    [key: string]: any;
}

// contains additional data needed to complete a stage, eg: link to privacy policy
export type RegistrationParams = {
    [key: string]: any;   
}
