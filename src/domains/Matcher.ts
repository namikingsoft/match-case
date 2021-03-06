import Case from './Case'
import Then from './Then'
import {List} from 'immutable'

export default class Matcher<S,D> {

  constructor(
    private cases?: List<Case<S,D>>
  ) {
    if (this.cases === undefined) {
      this.cases = List<Case<S,D>>()
    }
  }

  addCase(newCase: Case<S,D>): Matcher<S,D> {
    return new Matcher<S,D>(this.cases.push(newCase))
  }

  match(value: S): D {
    const match = this.cases.find(c => c.when.test(value))
    return match ? match.then.exec(value) : undefined
  }
}
