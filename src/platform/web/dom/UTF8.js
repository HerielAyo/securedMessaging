 
export class UTF8 {
    constructor() {
        this._encoder = null;
        this._decoder = null;
    }

    encode(str) {
        if (!this._encoder) {
            this._encoder = new TextEncoder();
        }
        return this._encoder.encode(str);
    }

    decode(buffer) {
        if (!this._decoder) {
            this._decoder = new TextDecoder();
        }
        return this._decoder.decode(buffer);
    }
}
