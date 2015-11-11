Functional Matcher for JavaScript
==============================
[![npm version](https://badge.fury.io/js/match-case.svg)](https://badge.fury.io/js/match-case)
[![Dependency Status](https://david-dm.org/namikingsoft/match-case.svg)](https://david-dm.org/namikingsoft/match-case)
[![Build Status](https://travis-ci.org/namikingsoft/match-case.svg?branch=master)](https://travis-ci.org/namikingsoft/match-case)
[![Coverage Status](https://coveralls.io/repos/namikingsoft/match-case/badge.svg?branch=master&service=github)](https://coveralls.io/github/namikingsoft/match-case?branch=master)

Match-case is npm package that add functional pattern matcher.



Install
------------------------------

```
npm install match-case
```


Basic Usage
------------------------------
In case of ECMAScript6

```javascript
import match from 'match-case'

const result1 = match(10).
  caseOf(n => n > 0, v => v * v).
  caseOfElse(404).
end()

assert(result1 === 100)

const result2 = match(-1).
  caseOf({
    when: n => n > 0,
    then: v => v * v
   }).
  caseOfElse({
    then: v => 404
  }).
get()

assert(result2 === 404)

const matcher = match().
  caseOf(n => n > 0, 200).
  caseOfNone(404).
  caseOfElse(500)

assert(matcher.get(10) === 200)
assert(matcher.get(-1) === 404)
assert(matcher.get(null) === 500)
assert(matcher.get(undefined) === 500)
```

In case of ECMAScript5

```javascript
var match = require('match-case').default

var result = match(10).
  caseOf({
    when: function(n) {return n > 0},
    then: function(v) {return v * v}
  }).
  caseOfElse(404).
end()

assert(result === 100)
```


Practical Usage
------------------------------
Fizz-Buzz example in case of TypeScript(ES6)

```javascript
///<reference path='./node_modules/match-case/lib/index.d.ts'/>
import match from 'match-case'
import {List} from 'immutable'

const result = List.of<any>(
  0, 1, "2", 3, ()=>4, {num:5}, new Date(), 7, undefined, 8,
  "9", 10, "Hello", 11, "12", null, 13, 14, "World", 15, 16
).
map<number>(
  v => match<number>(v).
  caseOfNone(0). // prevent runtime error
  caseOf({
    when: n => typeof(n) === "number",
    then: v => v
  }).
  caseOf({
    when: n => typeof(n) === "string" && /^[0-9]+$/.test(n),
    then: v => parseInt(v)
  }).
  caseOf({
    when: n => typeof(n) === "function",
    then: v => v()
  }).
  caseOf({
    when: n => !isNaN(n.num),
    then: v => parseInt(v.num)
  }).
  caseOf({
    when: n => n instanceof Date,
    then: 6
  }).
  end()
 ).
filter(n => (1 <= n&&n <= 15)).
map<string>(
  v => match<number,string>(v).
  caseOf({
    when: n => n%3===0 && n%5===0,
    then: "FizzBuzz"
  }).
  caseOf({
    when: n => n%3===0,
    then: "Fizz"
  }).
  caseOf({
    when: n => n%5===0,
    then: "Buzz"
  }).
  caseOfElse({
    then: v => v.toString()
  }).
  end()
).
join(" ")

assert(
  result === "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz"
)
```


More Usage
------------------------------
Please see [API spec files](./test/api).


Development
------------------------------

#### Get ready

```
npm install
```

#### Build

```
npm run build
```

#### Test

```
npm test
```

#### Test watch

```
npm run test:watch
```


License
------------------------------
[MIT](./LICENSE)

