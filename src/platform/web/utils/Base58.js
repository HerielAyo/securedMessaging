 

import bs58 from "bs58";

export class Base58 {
    encode(buffer) {
        return bs58.encode(buffer);
    }

    decode(str) {
        return bs58.decode(str);
    }
}
