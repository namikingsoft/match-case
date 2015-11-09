import assert from 'power-assert'
import Then from 'domains/Then'

describe("Then", function() {

  before(() => {
    this.instance = new Then<number,number>(v => v + 1)
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.instance instanceof Then)
    })
  })

  describe("exec", () => {
    it("should be return initial function result", () => {
      assert.equal(this.instance.exec(1), 2)
    })
  })
})
