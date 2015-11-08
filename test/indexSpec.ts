import match from 'index'
import {List} from 'immutable'

describe("match-case", function() {

  context("case 1", () => {
    it("should be return case result", () => {
      match<number,number>(10)
        .whenThen(n => n > 0, v => v * v)
        .noneThen(v => v + v)
        .elseThen(v => v + v)
      .end()
      .should.be.equals(100)
    })
    it("should be return else result", () => {
      match<number,number>(-5)
        .whenThen(n => n > 0, v => v * v)
        .elseThen(v => v + v)
      .end()
      .should.be.equals(-10)
    })
  })

  context("case 2", () => {
    it("should be return case result", () => {
      match<number,number>(10)
      .add({
        when: n => n > 0,
        then: v => v * v,
      })
      .addElse({
        then: v => v + v,
      })
      .get()
      .should.be.equals(100)
    })
    it("should be return else result", () => {
      match<number,number>(-5)
      .add({
        when: n => n > 0,
        then: v => v * v
      })
      .addElse({
        then: v => v + v,
      })
      .get()
      .should.be.equals(-10)
    })
  })

  context("case 3", () => {
    before(() => {
      this.result = List.of<any>(
        0, 1, "2", 3, ()=>4, new Date(), {num:6}, 7, undefined, 8,
        "9", 10, "Hello", 13, 12, null, "11", 14, "World", 15, 16
      )
      .map<number>(
        v => match<any, number>(v).noneThen(0)
        .add({
          when: n => typeof(n) === "number",
          then: v => v
        })
        .add({
          when: n => typeof(n) === "string" && /^[0-9]+$/.test(n),
          then: v => parseInt(v)
        })
        .add({
          when: n => typeof(n) === "function",
          then: v => v()
        })
        .add({
          when: n => n instanceof Date,
          then: 5
        })
        .add({
          when: n => n.num > 0,
          then: v => v.num
        })
        .get()
      )
      .filter(n => (1 <= n&&n <= 15))
      .sort()
      .map<string>(
        v => match<number, string>(v)
        .whenThen(n => n%3===0 && n%5===0, "FizzBuzz")
        .whenThen(n => n%3===0, "Fizz")
        .whenThen(n => n%5===0, "Buzz")
        .elseThen(v => v.toString())
        .end()
      )
      .join(" ")
    })
    it("should be return correctly results", () => {
      this.result.should.be.equal(
        "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz"
      )
    })
  })
})
