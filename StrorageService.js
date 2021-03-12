export class StorageService {

    typesEquals(x, y) {
        let p;
        if (x === y) return true;
        // if both x and y are null or undefined and exactly the same

        if (!(x instanceof Object) || !(y instanceof Object)) return false;
        // if they are not strictly equal, they both need to be Objects

        if (x.constructor !== y.constructor) return false;
        // they must have the exact same prototype chain, the closest we can do is test there constructor.

        for (p in x) {
            if (!y.hasOwnProperty(p)) return false;
        }
        for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
        }
        return true;
    }

    generateUIDWithCollisionChecking() {
        while (true) {
            const uid = ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(-4);
            if (!this._generatedUIDs.hasOwnProperty(uid)) {
                this._generatedUIDs[uid] = true;
                return uid;
            }
        }
    }

    constructor() {
        this._map = new Map();
        this._generatedUIDs = {};
    }

    add(node) {
        let newId = this.generateUIDWithCollisionChecking();
        this._map.set(newId, node)
        return newId;
    }

    getById(id) {
        return this._map.get(id)
    }

    getAll() {
        return this._map.values();
    }

    deleteById(id) {
        return this._map.delete(id)
    }

    updateById(id, node) {
        if (this._map.has(id)) {
            let oldNode = this._map.get(id);
            if (this.typesEquals(oldNode, node)) {
                for (const p in oldNode) {
                    oldNode[p] = node[p];
                }
            } else {
                console.error("Objects have different types")
            }
        }
        return false;
    }

    replaceById(id, node) {
        if (this._map.has(id)) {
            this._map.set(id, node);
            return true;
        } else {
            return false;
        }
    }
}
