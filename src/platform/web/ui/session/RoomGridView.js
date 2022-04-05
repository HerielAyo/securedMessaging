 

import {RoomView} from "./room/RoomView.js";
import {RoomBeingCreatedView} from "./room/RoomBeingCreatedView.js";
import {InviteView} from "./room/InviteView.js";
import {TemplateView} from "../general/TemplateView";
import {StaticView} from "../general/StaticView.js";

export class RoomGridView extends TemplateView {
    render(t, vm) {
        const children = [];
        for (let i = 0; i < (vm.height * vm.width); i+=1) {
            children.push(t.div({
                onClick: () => vm.focusTile(i),
                onFocusin: () => vm.focusTile(i),
                className: {
                    "container": true,
                    [`tile${i}`]: true,
                    "focused": vm => vm.focusIndex === i
                },
            }, t.mapView(vm => vm.roomViewModelAt(i), roomVM => {
                if (roomVM) {
                    if (roomVM.kind === "roomBeingCreated") {
                        return new RoomBeingCreatedView(roomVM);
                    } else if (roomVM.kind === "invite") {
                        return new InviteView(roomVM);
                    } else {
                        return new RoomView(roomVM);
                    }
                } else {
                    return new StaticView(t => t.div({className: "room-placeholder"}, [
                        t.h2({className: "focused"}, vm.i18n`Select a room on the left`),
                        t.h2({className: "unfocused"}, vm.i18n`Click to select this tile`),
                    ]));
                }
            })));
        }
        children.push(t.div({className: vm => `focus-ring tile${vm.focusIndex}`}));
        return t.div({className: "RoomGridView middle layout3x2"}, children);
    }
}
