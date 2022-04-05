

import {StaticView} from "./StaticView";
import {spinner} from "../common.js";

export class LoadingView extends StaticView {
    constructor(label = "Loading") {
        super(label, (t, label) => {
            return t.div({ className: "LoadingView" }, [spinner(t), label]);
        });
    }
}
