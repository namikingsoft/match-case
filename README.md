Match-case
==============================
Functional javascript pattern matcher.


Install
------------------------------

```
npm install match-case
```


Basic Usage
------------------------------

```javascript
var match = require('match-case')

match(10)
  .caseOf({
    when: n => n > 0,
    then: v => v * v
   })
  .caseOfElse({
    then: v => 404
  })
.end()
//  =>
.should.be.equals(100)

match(-1)
  .caseOf(n => n > 0, v => v * v)
  .caseOfElse(404)
.end()
// =>
.should.be.equals(404)

const matcher = match()
  .caseOf(n => n > 0, 200)
  .caseOfNone(404)
  .caseOfElse(500)
// =>
matcher.get(10).should.be.equals(200)
matcher.get(-1).should.be.equals(404)
matcher.get(null).should.be.equals(500)
matcher.get(undefined).should.be.equals(500)
```


Practical Usage
------------------------------
Fizz-Buzz example powered by TypeScript(ES6)

```javascript
import match from 'match-case'
import {List} from 'immutable'

List.of<any>(
  0, 1, "2", 3, ()=>4, {num:5}, new Date(), 7, undefined, 8,
  "9", 10, "Hello", 11, "12", null, 13, 14, "World", 15, 16
)
.map<number>(
  v => match<number>(v)
  .caseOfNone(0) // prevent runtime error
  .caseOf({
    when: n => typeof(n) === "number",
    then: v => v
  })
  .caseOf({
    when: n => typeof(n) === "string" && /^[0-9]+$/.test(n),
    then: v => parseInt(v)
  })
  .caseOf({
    when: n => typeof(n) === "function",
    then: v => v()
  })
  .caseOf({
    when: n => !isNaN(n.num),
    then: v => parseInt(v.num)
  })
  .caseOf({
    when: n => n instanceof Date,
    then: 6
  })
  .end()
 )
.filter(n => (1 <= n&&n <= 15))
.map<string>(
  v => match<number,string>(v)
  .caseOf({
    when: n => n%3===0 && n%5===0,
    then: "FizzBuzz"
  })
  .caseOf({
    when: n => n%3===0,
    then: "Fizz"
  })
  .caseOf({
    when: n => n%5===0,
    then: "Buzz"
  })
  .caseOfElse({
    then: v => v.toString()
  })
  .end()
)
.join(" ")

// =>
.should.be.equal("1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz")
```


More Usage
------------------------------
Please see [spec files](./test).


Development
------------------------------

### Build

```
npm run build
```

### Test

```
npm test
```

### Test Watch

```
npm run test:watch
```


License
------------------------------
[MIT](./LICENSE)

