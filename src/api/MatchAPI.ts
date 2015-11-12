import Matcher from '../domains/Matcher'
import CaseFactory from '../domains/CaseFactory'
import {ImplicitThen} from '../domains/ThenFactory'
import {ImplicitWhen} from '../domains/WhenFactory'

export default class MatchAPI<S,D> {

  constructor(
    private value?: S,
    private matcher?: Matcher<S,D>
  ) {
    if (this.matcher === undefined) {
      this.matcher = new Matcher<S,D>()
    }
  }

  caseOf(
    when: ImplicitWhen<S>,
    then: ImplicitThen<S,D>
  ): MatchAPI<S,D>
  caseOf(param: {
    when: ImplicitWhen<S>,
    then: ImplicitThen<S,D>
  }): MatchAPI<S,D>
  caseOf(...args): MatchAPI<S,D> {
    return new MatchAPI<S,D>(
      this.value,
      this.matcher.addCase((v => v.length === 1 ?
        CaseFactory.create<S,D>(args[0]) :
        CaseFactory.create<S,D>({when: args[0], then: args[1]})
      )(args))
    )
  }

  caseOfNone(
    then: ImplicitThen<S,D>
  ): MatchAPI<S,D>
  caseOfNone(param: {
    then: ImplicitThen<S,D>
  }): MatchAPI<S,D>
  caseOfNone(...args): MatchAPI<S,D> {
    return new MatchAPI<S,D>(
      this.value,
      this.matcher.addCase((v => v[0].then ?
        CaseFactory.createNone<S,D>(args[0]) :
        CaseFactory.createNone<S,D>({then: args[0]})
      )(args))
    )
  }

  caseOfElse(
    then: ImplicitThen<S,D>
  ): MatchAPI<S,D>
  caseOfElse(param: {
    then: ImplicitThen<S,D>
  }): MatchAPI<S,D>
  caseOfElse(...args): MatchAPI<S,D> {
    return new MatchAPI<S,D>(
      this.value,
      this.matcher.addCase((v => v[0].then ?
        CaseFactory.createElse<S,D>(args[0]) :
        CaseFactory.createElse<S,D>({then: args[0]})
      )(args))
    )
  }

  end(): D {
    return this.matcher.match(this.value)
  }

  get(value: S = this.value): D {
    return this.matcher.match(value)
  }
}
