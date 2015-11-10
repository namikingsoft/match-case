import CaseFactory from 'domains/CaseFactory'
import Case from 'domains/Case'
import * as assert from 'power-assert'

describe("ThenFactory", function() {

  describe("create", () => {
    before(() => {
      this.newCase = CaseFactory.create<number,number>({
        when: n => n > 0,
        then: v => v + 1,
      })
    })
    it("should be return new instance", () => {
      assert.ok(this.newCase instanceof Case)
    })
    it("should be test correctly", () => {
      assert.equal(this.newCase.when.test(10), true)
      assert.equal(this.newCase.when.test(-1), false)
    })
    it("should be exec correctly", () => {
      assert.equal(this.newCase.then.exec(1), 2)
    })
  })

  describe("createNone", () => {
    before(() => {
      this.newCase = CaseFactory.createNone<number,number>({
        then: v => v + 1,
      })
    })
    it("should be return new instance", () => {
      assert.ok(this.newCase instanceof Case)
    })
    it("should be test correctly", () => {
      assert.equal(this.newCase.when.test(undefined), true)
      assert.equal(this.newCase.when.test(null), true)
      assert.equal(this.newCase.when.test(0), false)
    })
    it("should be exec correctly", () => {
      assert.equal(this.newCase.then.exec(1), 2)
    })
  })

  describe("createElse", () => {
    before(() => {
      this.newCase = CaseFactory.createElse<number,number>({
        then: v => v + 1,
      })
    })
    it("should be return new instance", () => {
      assert.ok(this.newCase instanceof Case)
    })
    it("should be test correctly", () => {
      assert.equal(this.newCase.when.test(1), true)
      assert.equal(this.newCase.when.test(undefined), true)
      assert.equal(this.newCase.when.test(null), true)
      assert.equal(this.newCase.when.test(0), true)
    })
    it("should be exec correctly", () => {
      assert.equal(this.newCase.then.exec(1), 2)
    })
  })
})
