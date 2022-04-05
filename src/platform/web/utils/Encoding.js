 

import {UTF8} from "../dom/UTF8.js";
import {Base64} from "./Base64.js";
import {Base58} from "./Base58.js";

export class Encoding {
    constructor() {
        this.utf8 = new UTF8();
        this.base64 = new Base64();
        this.base58 = new Base58();
    }
}
