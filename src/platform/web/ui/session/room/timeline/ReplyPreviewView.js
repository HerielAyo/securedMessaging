

import {renderStaticAvatar} from "../../../avatar";
import {TemplateView} from "../../../general/TemplateView";
import {viewClassForEntry} from "../common";

export class ReplyPreviewView extends TemplateView {
    render(t, vm) {
        const viewClass = viewClassForEntry(vm);
        if (!viewClass) {
            throw new Error(`Shape ${vm.shape} is unrecognized.`)
        }
        const view = new viewClass(vm, { reply: true, interactive: false });
        return t.div(
            { className: "ReplyPreviewView" },
            t.blockquote([
                t.a({ className: "link", href: vm.permaLink }, "In reply to"),
                t.a({ className: "pill", href: vm.senderProfileLink }, [
                    renderStaticAvatar(vm, 12, undefined, true),
                    vm.displayName,
                ]),
                t.br(),
                t.view(view),
            ])
        );
    }
}

export class ReplyPreviewError extends TemplateView {
    render(t) {
        return t.blockquote({ className: "ReplyPreviewView" }, [
            t.div({ className: "Timeline_messageBody statusMessage" }, "This reply could not be found.")
        ]);
    }
}
