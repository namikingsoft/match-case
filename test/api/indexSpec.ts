import assert from 'power-assert'
import match from 'index'
import {List} from 'immutable'

describe("match-case", function() {

  context("basic", () => {

    it("can assign functions or value", () => {
      const result1 = match<number,number>(10)
      .caseOf(n => n > 0, v => v * v)
      .end()
      assert(result1 === 100)

      const result2 = match<number,number>(10)
      .caseOf(10, 100)
      .end()
      assert(result2 === 100)

      const result3 = match<number,number>(-5)
      .caseOf(n => n > 0, 100)
      .caseOfElse(v => v + v)
      .end()
      assert(result3 === -10)

      const result4 = match<number,number>(undefined)
      .caseOf(n => n > 0, v => v * v)
      .caseOfNone(v => 404)
      .end()
      assert(result4 === 404)

      const result5 = match<number,number>(null)
      .caseOf(n => n > 0, v => v * v)
      .caseOfNone(404)
      .end()
      assert(result5 === 404)
    })

    it("can assign object assigned functions or value", () => {
      const result1 = match<number,number>(10)
      .caseOf({
        when: n => n > 0,
        then: v => v * v
      })
      .end()
      assert(result1 === 100)

      const result2 = match<number,number>(10)
      .caseOf({when: 10, then: 100})
      .end()
      assert(result2 === 100)

      const result3 = match<number,number>(-5)
      .caseOf({when: n => n > 0, then: 100})
      .caseOfElse({then: v => v + v})
      .end()
      assert(result3 === -10)

      const result4 = match<number,number>(undefined)
      .caseOf({when: n => n > 0, then: v => v * v})
      .caseOfNone({then: v => 404})
      .end()
      assert(result4 === 404)

      const result5 = match<number,number>(null)
      .caseOf({when: n => n > 0, then: v => v * v})
      .caseOfNone({then: v => 404})
      .end()
      assert(result5 === 404)
    })

    it("can set value after case construction", () => {
      const matcher = match<number,number>()
      .caseOf({
        when: n => n > 0,
        then: v => v * v
      })
      .caseOfElse({
        then: v => v + v
      })
      assert(matcher.get(10) === 100)
      assert(matcher.get(-5) === -10)
    })
  })

  context("practical", () => {

    it("can arrange fizz-buzz", () => {
      const result = List.of<any>(
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

      assert(
        result === "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz"
      )
    })
  })
})
