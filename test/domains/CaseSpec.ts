import assert from 'power-assert'
import Case from 'domains/Case'
import When from 'domains/When'
import Then from 'domains/Then'

describe("Case", function() {

  before(() => {
    this.when = new When<number>(n => n > 0)
    this.then = new Then<number,number>(v => v + 1)
    this.instance = new Case<number,number>({
      when: this.when,
      then: this.then
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.instance instanceof Case)
    })
  })

  describe("when", () => {
    it("should be return initial param", () => {
      assert.equal(this.instance.when, this.when)
    })
  })

  describe("then", () => {
    it("should be return initial param", () => {
      assert.equal(this.instance.then, this.then)
    })
  })
})
