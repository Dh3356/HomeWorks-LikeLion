function HandleError() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target)
        //console.log(propertyKey)//함수명
        //console.log(descriptor)//해당 함수의 PropertyDescriptor

        const method = descriptor.value;

        descriptor.value = function() {
            try {
                method();//함수 내에 있는 코드를 실행한다
            } catch (e) {
                // 에러 핸들링 로직 구현
                console.log(e);
            }
        }
    };
}

class Greeter {
    test() {
        throw new Error("Method not implemented.");
    }
    @HandleError()
    hello() {
        throw new Error('테스트 에러');
    }
}

const t = new Greeter();
t.hello();