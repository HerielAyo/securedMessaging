 

import {BaseMessageTile} from "./BaseMessageTile.js";

export class MissingAttachmentTile extends BaseMessageTile {
    get shape() {
        return "missing-attachment"
    }

    get label() {
        const name = this._getContent().body;
        const msgtype = this._getContent().msgtype;
        if (msgtype === "m.image") {
            return this.i18n`The image ${name} wasn't fully sent previously and could not be recovered.`;
        } else {
            return this.i18n`The file ${name} wasn't fully sent previously and could not be recovered.`;
        }
    }
}
