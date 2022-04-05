 

export class RoomFilter {
    constructor(query) {
        this._parts = query.split(" ").map(s => s.toLowerCase().trim());
    }

    matches(roomTileVM) {
        const name = roomTileVM.name.toLowerCase();
        return this._parts.every(p => name.includes(p));
    }
}
