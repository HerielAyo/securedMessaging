
import {Store} from "../Store";
import {MemberData} from "./RoomMemberStore";

// TODO: Move to Invite when that's TypeScript.
export interface InviteData {
    roomId: string;
    isEncrypted: boolean;
    isDirectMessage: boolean;
    name?: string;
    avatarUrl?: string;
    avatarColorId: number;
    canonicalAlias?: string;
    timestamp: number;
    joinRule: string;
    inviter?: MemberData;
}

export class InviteStore {
    private _inviteStore: Store<InviteData>;

    constructor(inviteStore: Store<InviteData>) {
        this._inviteStore = inviteStore;
    }

    getAll(): Promise<InviteData[]> {
        return this._inviteStore.selectAll();
    }

    set(invite: InviteData): void {
        this._inviteStore.put(invite);
    }

    remove(roomId: string): void {
        this._inviteStore.delete(roomId);
    }
}
