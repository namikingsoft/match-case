import assert from 'power-assert'
import ThenFactory from 'domains/ThenFactory'
import Then from 'domains/Then'

describe("ThenFactory", function() {

  describe("create", () => {
    context("case function", () => {
      before(() => {
        this.when = ThenFactory.create<number,number>(v => v + 1)
      })
      it("should be return new instance", () => {
        assert.ok(this.when instanceof Then)
      })
      it("should be excute correct", () => {
        assert.equal(this.when.exec(1), 2)
      })
    })
    context("case value", () => {
      before(() => {
        this.when = ThenFactory.create<number,number>(1)
      })
      it("should be return new instance", () => {
        assert.ok(this.when instanceof Then)
      })
      it("should be test correct", () => {
        assert.equal(this.when.exec(2), 1)
      })
    })
  })
})
