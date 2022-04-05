 

import type {TimelineEvent} from "../../../storage/types";

export class ReplayDetectionEntry {
    public readonly sessionId: string;
    public readonly messageIndex: number;
    public readonly event: TimelineEvent;

    constructor(sessionId: string, messageIndex: number, event: TimelineEvent) {
        this.sessionId = sessionId;
        this.messageIndex = messageIndex;
        this.event = event;
    }

    get eventId(): string {
        return this.event.event_id;
    }

    get timestamp(): number {
        return this.event.origin_server_ts;
    }
}
