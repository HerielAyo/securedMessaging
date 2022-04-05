 

import {TemplateView} from "../../general/TemplateView";
import {spinner} from "../../common.js";

export class TimelineLoadingView extends TemplateView {
    render(t, vm) {
        return t.div({className: "TimelineLoadingView"}, [
            spinner(t),
            t.div(vm.isEncrypted ? vm.i18n`Loading encrypted messages…` : vm.i18n`Loading messages…`)
        ]);
    }
}
