

import {TemplateView} from "../../general/TemplateView";

export class UnknownRoomView extends TemplateView {
    render(t, vm) {
        return t.main({className: "UnknownRoomView middle"}, t.div([
            t.h2([
                vm.i18n`You are currently not in ${vm.roomIdOrAlias}.`,
                t.br(),
                vm.i18n`Want to join it?`
            ]),
            t.button({
                className: "button-action primary",
                onClick: () => vm.join(),
                disabled: vm => vm.busy,
            }, vm.i18n`Join room`),
            t.if(vm => vm.error, t => t.p({className: "error"}, vm.error))
        ]));
    }
}
