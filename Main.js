import {StorageService} from "./StrorageService.js"

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

