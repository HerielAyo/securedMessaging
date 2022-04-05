

import {ListView} from "../../../general/ListView";
import {TemplateView} from "../../../general/TemplateView";

export class ReactionsView extends ListView {
    constructor(reactionsViewModel) {
        const options = {
            className: "Timeline_messageReactions",
            tagName: "div",
            list: reactionsViewModel.reactions,
            onItemClick: reactionView => reactionView.onClick(),
        }
        super(options, reactionVM => new ReactionView(reactionVM));
    }
}

class ReactionView extends TemplateView {
    render(t, vm) {
        return t.button({
            className: {
                active: vm => vm.isActive,
                pending: vm => vm.isPending
            },
        }, [vm.key, " ", vm => `${vm.count}`]);
    }

    onClick() {
        this.value.toggle();
    }
}
