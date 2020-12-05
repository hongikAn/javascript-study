# this

Created By: 홍익 안
Last Edited: Nov 26, 2020 6:24 PM

# this 키워드

this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리킨다.

this는 자바스크립트 엔진에 의해 암묵적으로 생성되는데, this가 가리키는 값, 즉 **this의 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.**

```jsx
console.log(this); // 전역에서 this는 전역 객체 window를 가리킴

function hello() {
  console.log(this); // 일반 함수 내부에서 this는 전역 객체 window를 가리킴
}

const person = {
  name: "hong",
  getName() {
    // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킴
    console.log(this); // {name: 'hong', getName: f}
    return this.name;
  },
};
console.log(person.getName()); // hong 출력

function Person(name) {
  this.name = name;
  // 생성자 함수 내에서 this는 생성자 함수가 생성할 인스턴스를 가리킴
  console.log(this); // Person {name: 'hong'}
}

const me = new Person("hong");
```

# 함수 호출 방식과 this

this에 할당될 값은 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

주의할 것은 동일한 함수도 다양한 방식으로 호출할 수 있다.

- 일반 함수 호출
- 메서드 호출
- 생성자 함수 호출
- Function.prototype.apply / call / bind 메서드에 의한 간접 호출

```jsx
const foo = function () {
  console.dir(this);
};

// 1. 일반 함수 호출
foo(); // window

// 2. 메서드 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
const obj = { foo };
obj.foo(); // obj

// 3. 생성자 함수 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// this는 생성자 함수가 생성한 인스턴스를 가리킴
new foo(); // foo {}

// 4. apply/call/bind 메서드에 의한 간접 호출
// this는 인수에 의해 결정됨
const bar = { name: "bar" };

foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar)(); // bar
```

전역 함수는 물론이고 중첩 함수를 일반 함수로 호출하면 함수 내부의 this에는 전역객체가 바인딩됨.

this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서는 this는 의미가 없다.

```jsx
function foo() {
  console.log("this: ", this); // window
  function bar() {
    console.log("this: ", this); // window
  }
  bar();
}
foo();
```

메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this는 전역 객체가 바인딩됨

```jsx
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("this: ", this); // {value: 100, foo: f}
    console.log("this.value: ", this.value); // 100

    // 메서드 내에서 정의한 중첩 함수
    function bar() {
      console.log("bar this: ", this); // window
      console.log("bar this.value: ", this.value); // 1
    }
    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 this에 전역객체가 바인딩됨
    bar();
  },
};
obj.foo();
```

`**이처럼 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다**`

하지만 메서드 내에서 정의한 중첩 함수 또는 메서드에게 전달한 콜백 함수가 일반 함수로 호출될 때 this가 전역 객체를 바인딩 하는 것은 문제가 있다. 이때 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법은 다음과 같다.

```jsx
var value = 1;

const obj = {
  value: 100,
  foo() {
    const that = this; // this 바인딩(obj)을 that에 할당

    // 콜백 함수 내부에서 this 대신 that 참조
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);

    // 혹은 명시적으로 this를 바인딩
    setTimeout(
      function () {
        console.log(this.value); // 100
      }.bind(this),
      100
    );
  },
};
obj.foo();
```

또는 화살표 함수를 사용해서 this 바인딩 일치도 가능

```jsx
var value = 1;

const obj = {
  value: 100,
  foo() {
    // 화살표 함수 내부 this는 상위 스코프의 this를 가리킴.
    setTimeout(() => console.log(this.value), 100); // 100
  },
};
obj.foo();
```
