import Matcher from 'domains/Matcher'
import Case from 'domains/Case'
import When from 'domains/When'
import Then from 'domains/Then'
import {List} from 'immutable'

describe("Matcher", function() {

  before(() => {
    this.inCase = new Case<number,number>({
      when: new When<number>(n => n > 0),
      then: new Then<number,number>(v => v + 1),
    })
    this.instance = new Matcher<number,number>()
    this.caseInstance = this.instance.addCase(this.inCase)
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.instance instanceof Matcher)
    })
  })

  describe("addCase", () => {
    it("should be return new instance", () => {
      assert.notEqual(this.instance, this.caseInstance)
    })
    it("should be increase case list size", () => {
      assert.equal(this.instance.cases.size, this.caseInstance.cases.size-1)
    })
  })

  describe("match", () => {
    before(() => {
      this.resultCase = this.caseInstance.match(10)
      this.resultElse = this.caseInstance.match(-1)
    })
    it("should be return match case value", () => {
      assert.equal(this.resultCase, 11)
    })
    it("should be return match else value", () => {
      assert.equal(this.resultElse, undefined)
    })
  })
})
