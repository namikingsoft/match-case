import Case from 'domains/Case'
import Then from 'domains/Then'
import {List} from 'immutable'

export default class Matcher<S,D> {

  constructor(
    private value: S,
    private cases?: List<Case<S,D>>
  ) {
    if (this.cases === undefined) {
      this.cases = List<Case<S,D>>()
    }
  }

  addCase(newCase: Case<S,D>): Matcher<S,D> {
    return new Matcher<S,D>(this.value, this.cases.push(newCase))
  }

  get(): D {
    const match = this.cases.find(c => c.when.test(this.value))
    if (match) {
      return match.then.exec(this.value)
    } else {
      return undefined
    }
  }
}
