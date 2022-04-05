

export type Content = { [key: string]: any }

export interface TimelineEvent {
    content: Content;
    type: string;
    event_id: string;
    sender: string;
    origin_server_ts: number;
    unsigned?: Content;
}

export type StateEvent = TimelineEvent & { prev_content?: Content, state_key: string }
