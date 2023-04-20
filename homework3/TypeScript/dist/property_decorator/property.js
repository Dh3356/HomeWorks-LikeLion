var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function format(formatString) {
    return function (target, propertyKey) {
        let value = target[propertyKey];
        function getter() {
            return `${formatString} ${value}`;
        }
        function setter(newVal) {
            value = newVal;
        }
        return {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        };
    };
}
class Greeter3 {
}
__decorate([
    format('Hello'),
    __metadata("design:type", String)
], Greeter3.prototype, "greeting", void 0);
const t3 = new Greeter3();
t3.greeting = 'World';
console.log(t3.greeting);
//# sourceMappingURL=property.js.map