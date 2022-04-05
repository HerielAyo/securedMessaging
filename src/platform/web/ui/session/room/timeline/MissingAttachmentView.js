 

import {BaseMessageView} from "./BaseMessageView.js";

export class MissingAttachmentView extends BaseMessageView {
    renderMessageBody(t, vm) {
        return t.p({className: "Timeline_messageBody statusMessage"}, vm.label);
    }
}
