

import {ListView} from "../../general/ListView";
import {TemplateView} from "../../general/TemplateView";
import {RoomTileView} from "./RoomTileView.js";

class FilterField extends TemplateView {
    render(t, options) {
        const clear = () => {
            filterInput.value = "";
            filterInput.blur();
            clearButton.blur();
            options.clear();
        };
        const filterInput = t.input({
            type: "text",
            placeholder: options?.label,
            "aria-label": options?.label,
            autocomplete: options?.autocomplete,
            enterkeyhint: 'search',
            name: options?.name,
            onInput: event => options.set(event.target.value),
            onKeydown: event => {
                if (event.key === "Escape" || event.key === "Esc") {
                    clear();
                }
            },
            onFocus: () => filterInput.select()
        });
        const clearButton = t.button({
            onClick: clear,
            title: options.i18n`Clear`,
            "aria-label": options.i18n`Clear`
        });
        return t.div({className: "FilterField"}, [filterInput, clearButton]);
    }
}

export class LeftPanelView extends TemplateView {
    render(t, vm) {
        const gridButtonLabel = vm => {
            return vm.gridEnabled ?
                vm.i18n`Show single room` :
                vm.i18n`Enable grid layout`;
        };
        const roomList = t.view(new ListView(
            {
                className: "RoomList",
                list: vm.tileViewModels,
            },
            tileVM => new RoomTileView(tileVM)
        ));
        const utilitiesRow = t.div({className: "utilities"}, [
            t.a({className: "button-utility close-session", href: vm.closeUrl, "aria-label": vm.i18n`Back to account list`, title: vm.i18n`Back to account list`}),
            t.view(new FilterField({
                i18n: vm.i18n,
                label: vm.i18n`Filter rooms…`,
                name: "room-filter",
                autocomplete: true,
                set: query => {
                    // scroll up if we just started filtering
                    if (vm.setFilter(query)) {
                        roomList.scrollTop = 0;
                    }
                },
                clear: () => vm.clearFilter()
            })),
            t.button({
                onClick: () => vm.toggleGrid(),
                className: {
                    "button-utility": true,
                    grid: true,
                    on: vm => vm.gridEnabled
                },
                title: gridButtonLabel,
                "aria-label": gridButtonLabel
            }),
            t.a({className: "button-utility settings", href: vm.settingsUrl, "aria-label": vm.i18n`Settings`, title: vm.i18n`Settings`}),
            t.a({className: "button-utility create", href: vm.createRoomUrl, "aria-label": vm.i18n`Create room`, title: vm.i18n`Create room`}),
            t.a({className: "button-utility create", href: vm.createRoomUrl, "aria-label": vm.i18n`Create room`, title: vm.i18n`User profile`}),
        ]);

        return t.div({className: "LeftPanel"}, [
            utilitiesRow,
            roomList
        ]);
    }
}
