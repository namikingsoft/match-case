import Matcher from './Matcher'
import CaseFactory from './CaseFactory'
import {ImplicitThen} from './ThenFactory'
import {ImplicitWhen} from './WhenFactory'

export default class API<S,D> {

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
  ): API<S,D>
  caseOf(param: {
    when: ImplicitWhen<S>,
    then: ImplicitThen<S,D>
  }): API<S,D>
  caseOf(...args): API<S,D> {
    return new API<S,D>(
      this.value,
      this.matcher.addCase((v => v.length === 1 ?
        CaseFactory.create<S,D>(args[0]) :
        CaseFactory.create<S,D>({when: args[0], then: args[1]})
      )(args))
    )
  }

  caseOfNone(
    then: ImplicitThen<S,D>
  ): API<S,D>
  caseOfNone(param: {
    then: ImplicitThen<S,D>
  }): API<S,D>
  caseOfNone(...args): API<S,D> {
    return new API<S,D>(
      this.value,
      this.matcher.addCase((v => v[0].then ?
        CaseFactory.createNone<S,D>(args[0]) :
        CaseFactory.createNone<S,D>({then: args[0]})
      )(args))
    )
  }

  caseOfElse(
    then: ImplicitThen<S,D>
  ): API<S,D>
  caseOfElse(param: {
    then: ImplicitThen<S,D>
  }): API<S,D>
  caseOfElse(...args): API<S,D> {
    return new API<S,D>(
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

  get(value: S): D {
    return this.matcher.match(value)
  }
}
