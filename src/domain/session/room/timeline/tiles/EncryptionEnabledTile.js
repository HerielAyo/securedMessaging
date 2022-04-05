 

import {SimpleTile} from "./SimpleTile.js";

export class EncryptionEnabledTile extends SimpleTile {
    get shape() {
        return "announcement";
    }

    get announcement() {
        const senderName =  this._entry.displayName || this._entry.sender;
        return this.i18n`${senderName} has enabled end-to-end encryption`;
    }
}
