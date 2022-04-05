 

import {OLM_ALGORITHM} from "./e2ee/common.js";
import {countBy, groupBy} from "../utils/groupBy";

export class DeviceMessageHandler {
    constructor({storage}) {
        this._storage = storage;
        this._olmDecryption = null;
        this._megolmDecryption = null;
    }

    enableEncryption({olmDecryption, megolmDecryption}) {
        this._olmDecryption = olmDecryption;
        this._megolmDecryption = megolmDecryption;
    }

    obtainSyncLock(toDeviceEvents) {
        return this._olmDecryption?.obtainDecryptionLock(toDeviceEvents);
    }

    async prepareSync(toDeviceEvents, lock, txn, log) {
        log.set("messageTypes", countBy(toDeviceEvents, e => e.type));
        const encryptedEvents = toDeviceEvents.filter(e => e.type === "m.room.encrypted");
        if (!this._olmDecryption) {
            log.log("can't decrypt, encryption not enabled", log.level.Warn);
            return;
        }
        // only know olm for now
        const olmEvents = encryptedEvents.filter(e => e.content?.algorithm === OLM_ALGORITHM);
        if (olmEvents.length) {
            const olmDecryptChanges = await this._olmDecryption.decryptAll(olmEvents, lock, txn);
            log.set("decryptedTypes", countBy(olmDecryptChanges.results, r => r.event?.type));
            for (const err of olmDecryptChanges.errors) {
                log.child("decrypt_error").catch(err);
            }
            const newRoomKeys = this._megolmDecryption.roomKeysFromDeviceMessages(olmDecryptChanges.results, log);
            return new SyncPreparation(olmDecryptChanges, newRoomKeys);
        }
    }

    /** check that prep is not undefined before calling this */
    async writeSync(prep, txn) {
        // write olm changes
        prep.olmDecryptChanges.write(txn);
        const didWriteValues = await Promise.all(prep.newRoomKeys.map(key => this._megolmDecryption.writeRoomKey(key, txn)));
        return didWriteValues.some(didWrite => !!didWrite);
    }
}

class SyncPreparation {
    constructor(olmDecryptChanges, newRoomKeys) {
        this.olmDecryptChanges = olmDecryptChanges;
        this.newRoomKeys = newRoomKeys;
        this.newKeysByRoom = groupBy(newRoomKeys, r => r.roomId);
    }
}
