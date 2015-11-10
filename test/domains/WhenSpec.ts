import When from 'domains/When'
import * as assert from 'power-assert'

describe("When", function() {

  before(() => {
    this.instance = new When<number>(n => n > 0)
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.instance instanceof When)
    })
  })

  describe("test", () => {
    it("should be return true", () => {
      assert.equal(this.instance.test(1), true)
    })
    it("should be return false", () => {
      assert.equal(this.instance.test(-1), false)
    })
  })
})
