class NodeType1 {
    constructor(field1, field2) {
        this.field1 = field1
        this.field2 = field2
    }
}

class NodeType2 {
    constructor(field1, field2, field3) {
        this.field1 = field1
        this.field2 = field2
        this.field3 = field3
    }
}
class StorageService {

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


let storage = new StorageService();
let id1 = storage.add(String("stringElem1"));
let id2 = storage.add(new NodeType1("node1", "elem1"));
let id3 = storage.add(new NodeType1("node1", "elem2"));
let id4 = storage.add(new NodeType2("node2", "elem1", "field3"));
let id5 = storage.add(new NodeType2("node2", "elem2", "field3"));
let id6 = storage.add(String("stringElem2"));
let id7 = storage.add(5);

console.log("GET_BY_ID")
let elementById = storage.getById(id1);
console.log("Элемент по id " + id1 + " :" + JSON.stringify(elementById))

elementById = storage.getById(id2);
console.log("Элемент по id " + id2 + " :" + JSON.stringify(elementById))

elementById = storage.getById(id4);
console.log("Элемент по id " + id4 + " :" + JSON.stringify(elementById))

console.log("DELETE_BY_ID")
console.log("Все элементы коллекции: ", storage.getAll())
let deleteById = storage.deleteById(id3);
console.log(deleteById)
console.log("Все элементы коллекции: ", storage.getAll())
storage.getById(id3) // error
deleteById = storage.deleteById(id3);
console.log(deleteById)
console.log("Все элементы коллекции: ", storage.getAll())

console.log("REPLACE_BY_ID")
let replaceById = storage.replaceById(id3, String("Неудачно замененный элемент"))
console.log(replaceById)
replaceById = storage.replaceById(id5, String("Замененный элемент"));
console.log(replaceById)
console.log("Все элементы коллекции: ", storage.getAll())

console.log("UPDATE_BY_ID")
let updateById = storage.updateById(id2, new NodeType2("field1", "field2", "field3"));
console.log(updateById)
updateById = storage.updateById(id3, new NodeType1("newField1!", "newField2!"));
console.log(updateById)
updateById = storage.updateById(id2, new NodeType1("newField1", "newField2"));
console.log(updateById)
console.log("Все элементы коллекции: ", storage.getAll())
