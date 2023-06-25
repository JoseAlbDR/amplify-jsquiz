exports.handler = async (event, context) => {
  const jsQuestions = [
    {
      question: `What's the output?`,
      code: `function sayHi() {
        console.log(name);
        console.log(age);
        var name = "Lydia";
        let age = 21;
      }`,

      options: [
        "Lydia and undefined",
        "Lydia and ReferenceError",
        "ReferenceError and 21",
        "undefined and ReferenceError",
      ],
      correctOption: 3,
      points: 10,
      answer: `Within the function, we first declare the name variable with the var keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of undefined, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the name variable, so it still holds the value of undefined.

      Variables with the let keyword (and const) are hoisted, but unlike var, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a ReferenceError.`,
    },
    {
      question: `What's the output?`,
      code: `for (var i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 1);
      }
      
      for (let i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 1);
      }`,

      options: ["0 1 2 and 0 1 2", "0 1 2 and 3 3 3", "3 3 3 and 0 1 2"],
      correctOption: 2,
      points: 10,
      answer: `Because of the event queue in JavaScript, the setTimeout callback function is called after the loop has been executed. Since the variable i in the first loop was declared using the var keyword, this value was global. During the loop, we incremented the value of i by 1 each time, using the unary operator ++. By the time the setTimeout callback function was invoked, i was equal to 3 in the first example.

      In the second loop, the variable i was declared using the let keyword: variables declared with the let (and const) keyword are block-scoped (a block is anything between { }). During each iteration, i will have a new value, and each value is scoped inside the loop.`,
    },
    {
      question: `What's the output?`,
      code: `const shape = {
        radius: 10,
        diameter() {
          return this.radius * 2;
        },
        perimeter: () => 2 * Math.PI * this.radius
      };
      
      shape.diameter();
      shape.perimeter();`,

      options: [
        "20 and 62.83185307179586",
        "20 and NaN",
        "20 and 63",
        "NaN and 63",
      ],
      correctOption: 2,
      points: 10,
      answer: `Note that the value of diameter is a regular function, whereas the value of perimeter is an arrow function.

      With arrow functions, the this keyword refers to its current surrounding scope, unlike regular functions! This means that when we call perimeter, it doesn't refer to the shape object, but to its surrounding scope (window for example).
      
      There is no value radius on that object, which returns NaN.`,
    },
    {
      question: `Which one is true?`,
      code: `const bird = {
        size: "small"
      };
      
      const mouse = {
        name: "Mickey",
        small: true
      };`,

      options: [
        "mouse.bird.size is not valid",
        "mouse[bird.size] is not valid",
        "mouse[bird['size']] is not valid",
        "All of them are valid",
      ],
      correctOption: 0,
      points: 10,
      answer: `In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood.

      JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket [ and keeps going until it finds the closing bracket ]. Only then, it will evaluate the statement.
      
      mouse[bird.size]: First it evaluates bird.size, which is "small". mouse["small"] returns true
      
      However, with dot notation, this doesn't happen. mouse does not have a key called bird, which means that mouse.bird is undefined. Then, we ask for the size using dot notation: mouse.bird.size. Since mouse.bird is undefined, we're actually asking undefined.size. This isn't valid, and will throw an error similar to Cannot read property "size" of undefined.`,
    },
    {
      question: `What's the output?`,
      code: `let c = { greeting: "Hey!" };
      let d;
      
      d = c;
      c.greeting = "Hello";
      console.log(d.greeting);`,

      options: ["Hello", "undefined", "ReferenceError", "TypeError"],
      correctOption: 0,
      points: 10,
      answer: `In JavaScript, all objects interact by reference when setting them equal to each other.

      First, variable c holds a value to an object. Later, we assign d with the same reference that c has to the object.
      
      When you change one object, you change all of them.`,
    },
    {
      question: `What's the output?`,
      code: `+true; !'Lydia';`,
      options: ["1 and false", "false and NaN", "false and false"],
      correctOption: 0,
      points: 10,
      answer: `The unary plus tries to convert an operand to a number. true is 1, and false is 0.

      The string 'Lydia' is a truthy value. What we're actually asking, is "is this truthy value falsy?". This returns false.`,
    },
    {
      question: `What's the output?`,
      code: `let a = 3;
      let b = new Number(3);
      let c = 3;
      
      console.log(a == b);
      console.log(a === b);
      console.log(b === c);`,
      options: [
        "true false true",
        "false false true",
        "true false false",
        "false true true",
      ],
      correctOption: 2,
      points: 10,
      answer: `new Number() is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.

      When we use the == operator (Equality operator), it only checks whether it has the same value. They both have the value of 3, so it returns true.
      
      However, when we use the === operator (Strict equality operator), both value and type should be the same. It's not: new Number() is not a number, it's an object. Both return false.`,
    },
    {
      question: `What's the output?`,
      code: `class Chameleon {
        static colorChange(newColor) {
          this.newColor = newColor;
          return this.newColor;
        }
      
        constructor({ newColor = 'green' } = {}) {
          this.newColor = newColor;
        }
      }
      
      const freddie = new Chameleon({ newColor: 'purple' });
      console.log(freddie.colorChange('orange'));`,
      options: ["orange", "purple", "green", "TypeError"],
      correctOption: 3,
      points: 10,
      answer: `The colorChange function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since freddie is an instance of class Chameleon, the function cannot be called upon it. A TypeError is thrown.`,
    },
    {
      question: `What's the output?`,
      code: `let greeting;
      greetign = {}; // Typo!
      console.log(greetign);`,
      options: ["{}", "ReferenceError: greetign is not defined", "undefined"],
      correctOption: 0,
      points: 10,
      answer: `It logs the object, because we just created an empty object on the global object! When we mistyped greeting as greetign, the JS interpreter actually saw this as:

      global.greetign = {} in Node.js
      window.greetign = {}, frames.greetign = {} and self.greetign in browsers.
      self.greetign in web workers.
      globalThis.greetign in all environments.
      In order to avoid this, we can use "use strict". This makes sure that you have declared a variable before setting it equal to anything.`,
    },
    {
      question: `What happens when we do this?`,
      code: `function bark() {
        console.log('Woof!');
      }
      
      bark.animal = 'dog';`,
      options: [
        "Nothing, this is totally fine!",
        "SyntaxError. You cannot add properties to a function this way.",
        "'Woof' gets logged.",
        "ReferenceError",
      ],
      correctOption: 0,
      points: 10,
      answer: `This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)

      A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.`,
    },
    {
      question: `What's the output?`,
      code:
        `function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }
      
      const member = new Person('Lydia', 'Hallie');
      Person.getFullName = function() {
        return` +
        "`${this.firstName} ${this.lastName}`;" +
        `
      };
      
      console.log(member.getFullName());`,
      options: [
        "TypeError",
        "SyntaxError",
        "Lydia Hallie",
        "undefined undefined",
      ],
      correctOption: 0,
      points: 10,
      answer: `In JavaScript, functions are objects, and therefore, the method getFullName gets added to the constructor function object itself. For that reason, we can call Person.getFullName(), but member.getFullName throws a TypeError.`,
    },
    {
      question: `What's the output?`,
      code: `function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }
      
      const lydia = new Person('Lydia', 'Hallie');
      const sarah = Person('Sarah', 'Smith');
      
      console.log(lydia);
      console.log(sarah);`,
      options: [
        'Person {firstName: "Lydia", lastName: "Hallie"} and undefined',
        'Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}',
        'Person {firstName: "Lydia", lastName: "Hallie"} and {}',
        'Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError',
      ],
      correctOption: 0,
      points: 10,
      answer: ``,
    },
    {
      question: ` What are the three phases of event propagation?`,
      code: ``,
      options: [
        "A: Target > Capturing > Bubbling",
        "B: Bubbling > Target > Capturing",
        "C: Target > Bubbling > Capturing",
        "D: Capturing > Target > Bubbling",
      ],
      correctOption: 3,
      points: 10,
      answer: `During the capturing phase, the event goes through the ancestor elements down to the target element. It then reaches the target element, and bubbling begins.`,
    },
    {
      question: ` All object have prototypes.`,
      code: ``,
      options: ["true", "false"],
      correctOption: 1,
      points: 10,
      answer: `All objects have prototypes, except for the base object. The base object is the object created by the user, or an object that is created using the new keyword. The base object has access to some methods and properties, such as .toString. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.`,
    },
    {
      question: `What's the output?`,
      code: `function sum(a, b) {
        return a + b;
      }
      
      sum(1, '2');`,
      options: ["NaN", "TypeError", "12", "3"],
      correctOption: 2,
      points: 10,
      answer: `JavaScript is a dynamically typed language: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called implicit type coercion. Coercion is converting from one type into another.

      In this example, JavaScript converts the number 1 into a string, in order for the function to make sense and return a value. During the addition of a numeric type (1) and a string type ('2'), the number is treated as a string. We can concatenate strings like "Hello" + "World", so what's happening here is "1" + "2" which returns "12".
      
      `,
    },
    {
      question: `What's the output?`,
      code: `let number = 0;
      console.log(number++);
      console.log(++number);
      console.log(number);`,
      options: ["1 1 2", "1 2 2", "0 2 2", "0 1 2"],
      correctOption: 2,
      points: 10,
      answer: `The postfix unary operator ++:
      Returns the value (this returns 0)
      Increments the value (number is now 1)

      The prefix unary operator ++:
      Increments the value (number is now 2)
      Returns the value (this returns 2)

      This returns 0 2 2.`,
    },
    {
      question: `What's the output?`,
      code:
        `function getPersonInfo(one, two, three) {
        console.log(one);
        console.log(two);
        console.log(three);
      }
      
      const person = 'Lydia';
      const age = 21;
      
      getPersonInfo` +
        "${person} is ${age} years old" +
        `;`,
      options: [
        `"Lydia" 21 ["", " is ", " years old"]`,
        `["", " is ", " years old"] "Lydia" 21`,
        `"Lydia" ["", " is ", " years old"] 21`,
      ],
      correctOption: 1,
      points: 10,
      answer: `If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!`,
    },
    {
      question: `What's the output?`,
      code: `function checkAge(data) {
        if (data === { age: 18 }) {
          console.log('You are an adult!');
        } else if (data == { age: 18 }) {
          console.log('You are still an adult.');
        } else {
          console.log('Hmm.. You don't have an age I guess');
        }
      }
      
      checkAge({ age: 18 });`,
      options: [
        `You are an adult!`,
        `You are still an adult.`,
        `Hmm.. You don't have an age I guess`,
      ],
      correctOption: 2,
      points: 10,
      answer: `When testing equality, primitives are compared by their value, while objects are compared by their reference. JavaScript checks if the objects have a reference to the same location in memory.

      The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality.
      
      This is why both { age: 18 } === { age: 18 } and { age: 18 } == { age: 18 } return false.`,
    },
    {
      question: ` What's the output?`,
      code: `function getAge(...args) {
        console.log(typeof args);
      }
      
      getAge(21);`,
      options: [`"number"`, `"array"`, `"object"`, `"NaN"`],
      correctOption: 2,
      points: 10,
      answer: `The rest parameter (...args) lets us "collect" all remaining arguments into an array. An array is an object, so typeof args returns "object"
      `,
    },
    {
      question: `What's the output?`,
      code: `function getAge() {
        'use strict';
        age = 21;
        console.log(age);
      }
      
      getAge();`,
      options: [`21`, `undefined`, `ReferenceError`, `TypeError`],
      correctOption: 2,
      points: 10,
      answer: `With "use strict", you can make sure that you don't accidentally declare global variables. We never declared the variable age, and since we use "use strict", it will throw a reference error. If we didn't use "use strict", it would have worked, since the property age would have gotten added to the global object.

      `,
    },
    {
      question: `What's the value of sum?`,
      code: `const sum = eval('10*10+5');`,
      options: [`105`, `"105"`, `TypeError`, `"10*10+5"`],
      correctOption: 0,
      points: 10,
      answer: `eval evaluates codes that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is 10 * 10 + 5. This returns the number 105.`,
    },
    {
      question: `How long is cool_secret accessible?`,
      code: `sessionStorage.setItem('cool_secret', 123);`,
      options: [
        `Forever, the data doesn't get lost.`,
        `When the user closes the tab.`,
        `When the user closes the entire browser, not only the tab.`,
        `When the user shuts off their computer.`,
      ],
      correctOption: 1,
      points: 10,
      answer: `The data stored in sessionStorage is removed after closing the tab.

      If you used localStorage, the data would've been there forever, unless for example localStorage.clear() is invoked.`,
    },
    {
      question: `What's the output?`,
      code: `var num = 8;
      var num = 10;
      
      console.log(num);`,
      options: [`8`, `10`, `SyntaxError`, `ReferenceError`],
      correctOption: 1,
      points: 10,
      answer: `With the var keyword, you can declare multiple variables with the same name. The variable will then hold the latest value.

      You cannot do this with let or const since they're block-scoped.`,
    },
    {
      question: `What's the output?`,
      code: `const obj = { 1: 'a', 2: 'b', 3: 'c' };
      const set = new Set([1, 2, 3, 4, 5]);
      
      obj.hasOwnProperty('1');
      obj.hasOwnProperty(1);
      set.has('1');
      set.has(1);`,
      options: [
        `false true false true`,
        `false true true true`,
        `true true false true`,
        `true true true true`,
      ],
      correctOption: 2,
      points: 10,
      answer: `All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why obj.hasOwnProperty('1') also returns true.

      It doesn't work that way for a set. There is no '1' in our set: set.has('1') returns false. It has the numeric type 1, set.has(1) returns true.`,
    },
    {
      question: `What's the output?`,
      code: `const obj = { a: 'one', b: 'two', a: 'three' };
      console.log(obj);`,
      options: [
        `{ a: "one", b: "two" }`,
        `{ b: "two", a: "three" }`,
        `{ a: "three", b: "two" }`,
        `SyntaxError`,
      ],
      correctOption: 2,
      points: 10,
      answer: `If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value.`,
    },
    {
      question: `The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.`,
      code: ``,
      options: [`true`, `false`, `it depends`],
      correctOption: 0,
      points: 10,
      answer: `The base execution context is the global execution context: it's what's accessible everywhere in your code.`,
    },
    {
      question: `What's the output?`,
      code: `for (let i = 1; i < 5; i++) {
        if (i === 3) continue;
        console.log(i);
      }`,
      options: [`1 2`, `1 2 3`, `1 2 4`, `1 3 4`],
      correctOption: 2,
      points: 10,
      answer: `The continue statement skips an iteration if a certain condition returns true.`,
    },
    {
      question: ` What's the output?`,
      code: `String.prototype.giveLydiaPizza = () => {
        return 'Just give Lydia pizza already!';
      };
      
      const name = 'Lydia';
      
      console.log(name.giveLydiaPizza())`,
      options: [
        `"Just give Lydia pizza already!"`,
        `TypeError: not a function`,
        `SyntaxError`,
        `undefined`,
      ],
      correctOption: 0,
      points: 10,
      answer: `String is a built-in constructor, which we can add properties to. I just added a method to its prototype. Primitive strings are automatically converted into a string object, generated by the string prototype function. So, all strings (string objects) have access to that method!`,
    },
    {
      question: ` What's the output?`,
      code: `const a = {};
      const b = { key: 'b' };
      const c = { key: 'c' };
      
      a[b] = 123;
      a[c] = 456;
      
      console.log(a[b]);`,
      options: [`123`, `456`, `undefined`, `ReferenceError`],
      correctOption: 1,
      points: 10,
      answer: `Object keys are automatically converted into strings. We are trying to set an object as a key to object a, with the value of 123.

      However, when we stringify an object, it becomes "[object Object]". So what we are saying here, is that a["[object Object]"] = 123. Then, we can try to do the same again. c is another object that we are implicitly stringifying. So then, a["[object Object]"] = 456.
      
      Then, we log a[b], which is actually a["[object Object]"]. We just set that to 456, so it returns 456.
      
      `,
    },
    {
      question: `What's the output?`,
      code: `const foo = () => console.log('First');
      const bar = () => setTimeout(() => console.log('Second'));
      const baz = () => console.log('Third');
      
      bar();
      foo();
      baz();`,
      options: [
        `First Second Third`,
        `First Third Second`,
        `Second First Third`,
        `Second Third First`,
      ],
      correctOption: 1,
      points: 10,
      answer: `We have a setTimeout function and invoked it first. Yet, it was logged last.

      This is because in browsers, we don't just have the runtime engine, we also have something called a WebAPI. The WebAPI gives us the setTimeout function to start with, and for example the DOM.
      
      After the callback is pushed to the WebAPI, the setTimeout function itself (but not the callback!) is popped off the stack.
      
      Now, foo gets invoked, and "First" is being logged.
      
      foo is popped off the stack, and baz gets invoked. "Third" gets logged.
      
      The WebAPI can't just add stuff to the stack whenever it's ready. Instead, it pushes the callback function to something called the queue.
      
      This is where an event loop starts to work. An event loop looks at the stack and task queue. If the stack is empty, it takes the first thing on the queue and pushes it onto the stack.
      
      bar gets invoked, "Second" gets logged, and it's popped off the stack.`,
    },
    // {
    //   question: ``,
    //   code: ``,
    //   options: [`8`, `10`, `SyntaxError`, `ReferenceError`],
    //   correctOption: 1,
    //   points: 10,
    //   answer: ``,
    // },
  ];

  const response = JSON.stringify(jsQuestions);
  return {
    statusCode: 200,
    body: response,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
};
