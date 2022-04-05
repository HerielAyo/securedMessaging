 

import anotherjson from "another-json";
import {createEnum} from "../../utils/enum";

export const DecryptionSource = createEnum("Sync", "Timeline", "Retry");

// use common prefix so it's easy to clear properties that are not e2ee related during session clear
export const SESSION_E2EE_KEY_PREFIX = "e2ee:";
export const OLM_ALGORITHM = "m.olm.v1.curve25519-aes-sha2";
export const MEGOLM_ALGORITHM = "m.megolm.v1.aes-sha2";

export class DecryptionError extends Error {
    constructor(code, event, detailsObj = null) {
        super(`Decryption error ${code}${detailsObj ? ": "+JSON.stringify(detailsObj) : ""}`);
        this.code = code;
        this.event = event;
        this.details = detailsObj;
    }
}

export const SIGNATURE_ALGORITHM = "ed25519";

export function verifyEd25519Signature(olmUtil, userId, deviceOrKeyId, ed25519Key, value, log = undefined) {
    const clone = Object.assign({}, value);
    delete clone.unsigned;
    delete clone.signatures;
    const canonicalJson = anotherjson.stringify(clone);
    const signature = value?.signatures?.[userId]?.[`${SIGNATURE_ALGORITHM}:${deviceOrKeyId}`];
    try {
        if (!signature) {
            throw new Error("no signature");
        }
        // throws when signature is invalid
        olmUtil.ed25519_verify(ed25519Key, canonicalJson, signature);
        return true;
    } catch (err) {
        if (log) {
            const logItem = log.log({l: "Invalid signature, ignoring.", ed25519Key, canonicalJson, signature});
            logItem.error = err;
            logItem.logLevel = log.level.Warn;
        }
        return false;
    }
}

export function createRoomEncryptionEvent() {
    return {
        "type": "m.room.encryption",
        "state_key": "",
        "content": {
            "algorithm": MEGOLM_ALGORITHM,
            "rotation_period_ms": 604800000,
            "rotation_period_msgs": 100
        }
    }
}
