function deco1(value: string) {
    console.log('데코레이터가 평가됨');
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(value);
    }
}

class TestClass1 {
    @deco1('HELLO')
    test() {
        console.log('함수 호출됨')
    }
}