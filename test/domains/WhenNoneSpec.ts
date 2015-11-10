import WhenNone from 'domains/WhenNone'
import * as assert from 'power-assert'

describe("WhenNone", function() {

  before(() => {
    this.instance = new WhenNone<number>()
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.instance instanceof WhenNone)
    })
  })

  describe("test", () => {
    it("should be return true", () => {
      assert.equal(this.instance.test(undefined), true)
      assert.equal(this.instance.test(null), true)
    })
    it("should be return false", () => {
      assert.equal(this.instance.test(0), false)
    })
  })
})
