 

import {BaseTextTile} from "./BaseTextTile.js";
import {UpdateAction} from "../UpdateAction.js";

export class EncryptedEventTile extends BaseTextTile {
    updateEntry(entry, params, tilesCreator) {
        const parentResult = super.updateEntry(entry, params, tilesCreator);
        // event got decrypted, recreate the tile and replace this one with it
        if (entry.eventType !== "m.room.encrypted") {
            // the "shape" parameter trigger tile recreation in TimelineView
            return UpdateAction.Replace("shape");
        } else {
            return parentResult;
        }
    }

    get shape() {
        return "message-status"
    }

    _getBody() {
        const decryptionError = this._entry.decryptionError;
        const code = decryptionError?.code;
        let string;
        if (code === "MEGOLM_NO_SESSION") {
            string = this.i18n`The sender hasn't sent us the key for this message yet.`;
        } else {
            string = decryptionError?.message || this.i18n`Could not decrypt message because of unknown reason.`;
        }
        return string;
    }
}
