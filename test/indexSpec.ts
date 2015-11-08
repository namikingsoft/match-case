import match from 'index'
import Case from 'index'

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
})
