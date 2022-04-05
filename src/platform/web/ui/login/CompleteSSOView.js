

import {TemplateView} from "../general/TemplateView";
import {SessionLoadStatusView} from "./SessionLoadStatusView.js";

export class CompleteSSOView extends TemplateView {
    render(t) {
        return t.div({ className: "CompleteSSOView" },
            [
                t.p({ className: "CompleteSSOView_title" }, "Finishing up your SSO Login"),
                t.if(vm => vm.errorMessage, (t, vm) => t.p({className: "error"}, vm.i18n(vm.errorMessage))),
                t.mapView(vm => vm.loadViewModel, loadViewModel => loadViewModel ? new SessionLoadStatusView(loadViewModel) : null),
            ]
        );
    }
}
