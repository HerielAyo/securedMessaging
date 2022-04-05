 

export function createSessionEntry(olmSession, senderKey, timestamp, pickleKey) {
    return {
        session: olmSession.pickle(pickleKey),
        sessionId: olmSession.session_id(),
        senderKey,
        lastUsed: timestamp,
    };
}

export class Session {
    constructor(data, pickleKey, olm, isNew = false) {
        this.data = data;
        this._olm = olm;
        this._pickleKey = pickleKey;
        this.isNew = isNew;
        this.isModified = isNew;
    }

    static create(senderKey, olmSession, olm, pickleKey, timestamp) {
        const data = createSessionEntry(olmSession, senderKey, timestamp, pickleKey);
        return new Session(data, pickleKey, olm, true);
    }

    get id() {
        return this.data.sessionId;
    }

    load() {
        const session = new this._olm.Session();
        session.unpickle(this._pickleKey, this.data.session);
        return session;
    }

    unload(olmSession) {
        olmSession.free();
    }

    save(olmSession) {
        this.data.session = olmSession.pickle(this._pickleKey);
        this.isModified = true;
    }
}
