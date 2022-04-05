 

import {ObservableMap} from "../../../observable/map/ObservableMap.js";
import {RetainedValue} from "../../../utils/RetainedValue";

export class MemberList extends RetainedValue {
    constructor({members, closeCallback}) {
        super(closeCallback);
        this._members = new ObservableMap();
        for (const member of members) {
            this._members.add(member.userId, member);
        }
    }

    afterSync(memberChanges) {
        for (const [userId, memberChange] of memberChanges.entries()) {
            this._members.set(userId, memberChange.member);
        }
    }

    get members() {
        return this._members;
    }
}
