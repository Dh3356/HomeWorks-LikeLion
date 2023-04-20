var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function Enumerable(enumerable) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = enumerable;
    };
}
class Person {
    constructor(name) {
        this.name = name;
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
}
__decorate([
    Enumerable(true),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Person.prototype, "getName", null);
__decorate([
    Enumerable(false),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Person.prototype, "setName", null);
const person = new Person('Dexter');
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
//# sourceMappingURL=accessor.js.map