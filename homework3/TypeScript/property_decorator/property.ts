function format(formatString: string) {
    return function (target: any, propertyKey: string): any {
        let value = target[propertyKey];

        function getter() {
            return `${formatString} ${value}`;
        }

        function setter(newVal: string) {
            value = newVal;
        }

        return {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        }
    }
}

class Greeter3 {
    @format('Hello')
    greeting: string;
}

const t3 = new Greeter3();
t3.greeting = 'World';
console.log(t3.greeting);