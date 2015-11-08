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
    this.instance = new Matcher<number,number>(1)
    this.newInstance = this.instance.addCase(this.inCase)
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.instance instanceof Matcher)
    })
  })

  describe("addCase", () => {
    it("should be return new instance", () => {
      assert.notEqual(this.instance, this.newInstance)
    })
    it("should be increase case list size", () => {
      assert.equal(this.instance.cases.size, this.newInstance.cases.size-1)
    })
  })

  describe("get", () => {
    before(() => {
      this.resultCase = new Matcher<number,number>(1)
      .addCase(this.inCase)
      .get()
      this.resultElse = new Matcher<number,number>(-1)
      .addCase(this.inCase)
      .get()
    })
    it("should be return match case value", () => {
      assert.equal(this.resultCase, 2)
    })
    it("should be return match else value", () => {
      assert.equal(this.resultElse, undefined)
    })
  })
})
