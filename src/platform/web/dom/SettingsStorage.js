 

export class SettingsStorage {
    constructor(prefix) {
        this._prefix = prefix;
    }

    async setInt(key, value) {
        this._set(key, value);
    }

    async getInt(key, defaultValue = 0) {
        const value = window.localStorage.getItem(`${this._prefix}${key}`);
        if (typeof value === "string") {
            return parseInt(value, 10);
        }
        return defaultValue;
    }

    async setBool(key, value) {
        this._set(key, value);
    }

    async getBool(key, defaultValue = false) {
        const value = window.localStorage.getItem(`${this._prefix}${key}`);
        if (typeof value === "string") {
            return value === "true";
        }
        return defaultValue;
    }

    async setString(key, value) {
        this._set(key, value);
    }

    async getString(key) {
        return window.localStorage.getItem(`${this._prefix}${key}`);
    }

    async remove(key) {
        window.localStorage.removeItem(`${this._prefix}${key}`);
    }

    async _set(key, value) {
        window.localStorage.setItem(`${this._prefix}${key}`, value);
    }
}
