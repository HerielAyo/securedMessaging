 

export function getPrevContentFromStateEvent(event) {
    // where to look for prev_content is a bit of a mess,
    // see https://matrix.to/#/!NasysSDfxKxZBzJJoE:matrix.org/$DvrAbZJiILkOmOIuRsNoHmh2v7UO5CWp_rYhlGk34fQ?via=matrix.org&via=pixie.town&via=amorgan.xyz
    return event.unsigned?.prev_content || event.prev_content;
}

export const REDACTION_TYPE = "m.room.redaction";

export function isRedacted(event) {
    return !!event?.unsigned?.redacted_because;
}

export enum RoomStatus {
    None = 1 << 0,
    BeingCreated = 1 << 1,
    Invited = 1 << 2,
    Joined = 1 << 3,
    Replaced = 1 << 4,
    Archived = 1 << 5,
}

export enum RoomType {
    DirectMessage,
    Private,
    Public
}
