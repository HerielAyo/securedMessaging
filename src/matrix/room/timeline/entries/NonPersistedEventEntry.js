

import {EventEntry} from "./EventEntry.js";

// EventEntry but without the two properties that are populated via SyncWriter
// Useful if you want to create an EventEntry that is ephemeral

export class NonPersistedEventEntry extends EventEntry {
    get fragmentId() {
        throw new Error("Cannot access fragmentId for non-persisted EventEntry");
    }

    get entryIndex() {
        throw new Error("Cannot access entryIndex for non-persisted EventEntry");
    }

    get isNonPersisted() {
        return true;
    }

    // overridden here because we reuse addLocalRelation() for updating this entry
    // we don't want the RedactedTile created using this entry to ever show "is being redacted"
    get isRedacting() {
        return false;
    }

    get isRedacted() {
        return super.isRedacting;
    }
}
