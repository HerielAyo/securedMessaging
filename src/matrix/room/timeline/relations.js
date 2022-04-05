

import {REDACTION_TYPE} from "../common";

export const REACTION_TYPE = "m.reaction";
export const ANNOTATION_RELATION_TYPE = "m.annotation";

export function createAnnotation(targetId, key) {
    return {
        "m.relates_to": {
            "event_id": targetId,
            key,
            "rel_type": ANNOTATION_RELATION_TYPE
        }
    };
}

export function getRelationTarget(relation) {
    return relation.event_id || relation["m.in_reply_to"]?.event_id
}

export function setRelationTarget(relation, target) {
    if (relation.event_id !== undefined) {
        relation.event_id = target;
    } else if (relation["m.in_reply_to"]) {
        relation["m.in_reply_to"].event_id = target;
    }
}

export function getRelatedEventId(event) {
	if (event.type === REDACTION_TYPE) {
        return event.redacts;
    } else {
        const relation = getRelation(event);
        if (relation) {
            return getRelationTarget(relation);
        }
    }
    return null;
}

export function getRelationFromContent(content) {
    return content?.["m.relates_to"];
}

export function getRelation(event) {
	return getRelationFromContent(event.content);
}

