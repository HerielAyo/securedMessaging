

import {BaseRequest} from "./Request.js";

// a request as returned by the HomeServerApi
class HomeServerRequest extends BaseRequest {
    constructor(args) {
        super();
        this.arguments = args;
    }

    respond(body) {
        return this._respond(body);
    }
}

class Target {
    constructor() {
        this.requests = {};
    }
}

function handleMethod(target, name, ...args) {
    let requests = target.requests[name]
    if (!requests) {
        target.requests[name] = requests = [];
    }
    const request = new HomeServerRequest(args);
    requests.push(request);
    return request;
}

class Handler {
    get(target, prop) {
        return handleMethod.bind(null, target, prop);
    }
}

export class HomeServer {
    constructor() {
        this._target = new Target();
        this.api = new Proxy(this._target, new Handler());
    }

    get requests() {
        return this._target.requests;
    }
}