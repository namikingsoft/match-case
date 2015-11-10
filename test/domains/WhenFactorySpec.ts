import WhenFactory from 'domains/WhenFactory'
import WhenElse from 'domains/WhenElse'
import WhenNone from 'domains/WhenNone'
import When from 'domains/When'
import * as assert from 'power-assert'

describe("WhenFactory", function() {

  describe("create", () => {
    context("case function", () => {
      before(() => {
        this.when = WhenFactory.create<number>(n => n > 0)
      })
      it("should be return new instance", () => {
        assert.ok(this.when instanceof When)
      })
      it("should be test correct", () => {
        assert.equal(this.when.test(10), true)
        assert.equal(this.when.test(-1), false)
      })
    })
    context("case value", () => {
      before(() => {
        this.when = WhenFactory.create<number>(1)
      })
      it("should be return new instance", () => {
        assert.ok(this.when instanceof When)
      })
      it("should be test correct", () => {
        assert.equal(this.when.test(1), true)
        assert.equal(this.when.test(2), false)
      })
    })
  })

  describe("createNone", () => {
    before(() => {
      this.when = WhenFactory.createNone<number>()
    })
    it("should be return new instance", () => {
      assert.ok(this.when instanceof WhenNone)
    })
  })

  describe("createElse", () => {
    before(() => {
      this.when = WhenFactory.createElse<number>()
    })
    it("should be return new instance", () => {
      assert.ok(this.when instanceof WhenElse)
    })
  })
})
