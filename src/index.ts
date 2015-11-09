import Matcher from 'domains/Matcher'
import CaseFactory from 'domains/CaseFactory'
import {ImplicitThen} from 'domains/ThenFactory'
import {ImplicitWhen} from 'domains/WhenFactory'

export default function match<D>(value: any): API<any,D>
export default function match<S,D>(value: S): API<S,D>
export default function match<S,D>(value: S): API<S,D> {
  return new API<S,D>(
    new Matcher<S,D>(value)
  )
}

class API<S,D> {

  constructor(private matcher: Matcher<S,D>) {}

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
      this.matcher.addCase((v => v[0].then ?
        CaseFactory.createElse<S,D>(args[0]) :
        CaseFactory.createElse<S,D>({then: args[0]})
      )(args))
    )
  }

  end(): D {
    return this.matcher.get()
  }

  get(): D {
    return this.matcher.get()
  }
}
