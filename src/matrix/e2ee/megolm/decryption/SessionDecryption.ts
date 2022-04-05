 

import {DecryptionResult} from "../../DecryptionResult.js";
import {DecryptionError} from "../../common.js";
import {ReplayDetectionEntry} from "./ReplayDetectionEntry";
import type {RoomKey} from "./RoomKey";
import type {KeyLoader, OlmDecryptionResult} from "./KeyLoader";
import type {OlmWorker} from "../../OlmWorker";
import type {TimelineEvent} from "../../../storage/types";

interface DecryptAllResult {
    readonly results: Map<string, DecryptionResult>;
    readonly errors?: Map<string, Error>;
    readonly replayEntries: ReplayDetectionEntry[];
}
/**
 * Does the actual decryption of all events for a given megolm session in a batch
 */
export class SessionDecryption {
    private key: RoomKey;
    private events: TimelineEvent[];
    private keyLoader: KeyLoader;
    private olmWorker?: OlmWorker;
    private decryptionRequests?: any[];

    constructor(key: RoomKey, events: TimelineEvent[], olmWorker: OlmWorker | undefined, keyLoader: KeyLoader) {
        this.key = key;
        this.events = events;
        this.olmWorker = olmWorker;
        this.keyLoader = keyLoader;
        this.decryptionRequests = olmWorker ? [] : undefined;
    }

    async decryptAll(): Promise<DecryptAllResult> {
        const replayEntries: ReplayDetectionEntry[] = [];
        const results: Map<string, DecryptionResult> = new Map();
        let errors: Map<string, Error> | undefined;

        await this.keyLoader.useKey(this.key, async session => {
            for (const event of this.events) {
                try {
                    const ciphertext = event.content.ciphertext as string;
                    let decryptionResult: OlmDecryptionResult | undefined;
                    // TODO: pass all cipthertexts in one go to the megolm worker and don't deserialize the key until in the worker?
                    if (this.olmWorker) {
                        const request = this.olmWorker.megolmDecrypt(session, ciphertext);
                        this.decryptionRequests!.push(request);
                        decryptionResult = await request.response();
                    } else {
                        decryptionResult = session.decrypt(ciphertext) as OlmDecryptionResult;
                    }
                    const {plaintext} = decryptionResult!;
                    let payload;
                    try {
                        payload = JSON.parse(plaintext);
                    } catch (err) {
                        throw new DecryptionError("PLAINTEXT_NOT_JSON", event, {plaintext, err});
                    }
                    if (payload.room_id !== this.key.roomId) {
                        throw new DecryptionError("MEGOLM_WRONG_ROOM", event,
                            {encryptedRoomId: payload.room_id, eventRoomId: this.key.roomId});
                    }
                    replayEntries.push(new ReplayDetectionEntry(this.key.sessionId, decryptionResult!.message_index, event));
                    const result = new DecryptionResult(payload, this.key.senderKey, this.key.claimedEd25519Key);
                    results.set(event.event_id, result);
                } catch (err) {
                    // ignore AbortError from cancelling decryption requests in dispose method
                    if (err.name === "AbortError") {
                        return;
                    }
                    if (!errors) {
                        errors = new Map();
                    }
                    errors.set(event.event_id, err);
                }
            }
        });

        return {results, errors, replayEntries};
    }

    dispose() {
        if (this.decryptionRequests) {
            for (const r of this.decryptionRequests) {
                r.abort();
            }
        }
    }
}
