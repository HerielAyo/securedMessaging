 

import {TemplateView} from "../general/TemplateView";
import {SessionLoadStatusView} from "./SessionLoadStatusView.js";

export class SessionLoadView extends TemplateView {
    render(t, vm) {
        return t.div({className: "PreSessionScreen"}, [
            t.div({className: "logo"}),
            t.div({className: "SessionLoadView"}, [
                t.view(new SessionLoadStatusView(vm))
            ]),
            t.div({className: {"button-row": true, hidden: vm => vm.loading}},
                t.a({className: "button-action primary", href: vm.backUrl}, vm.i18n`Go back`))
        ]);
    }
}
