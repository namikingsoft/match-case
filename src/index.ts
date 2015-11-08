import Matcher from 'domains/Matcher'
import CaseFactory from 'domains/CaseFactory'
import {ImplicitThen} from 'domains/ThenFactory'
import {ImplicitWhen} from 'domains/WhenFactory'

export default function match<S,D>(value: S): any {
  return new API<S,D>(
    new Matcher<S,D>(value)
  )
}

class API<S,D> {

  constructor(private matcher: Matcher<S,D>) {}

  whenThen(
    when: ImplicitWhen<S>,
    then: ImplicitThen<S,D>
  ): API<S,D> {
    return new API<S,D>(
      this.matcher.addCase(
        CaseFactory.create<S,D>({when, then})
      )
    )
  }

  noneThen(
    then: ImplicitThen<S,D>
  ): API<S,D> {
    return new API<S,D>(
      this.matcher.addCase(
        CaseFactory.createNone<S,D>({then})
      )
    )
  }

  elseThen(
    then: ImplicitThen<S,D>
  ): API<S,D> {
    return new API<S,D>(
      this.matcher.addCase(
        CaseFactory.createElse<S,D>({then})
      )
    )
  }

  end(): D {
    return this.matcher.get()
  }

  add(param: {
    when: ImplicitWhen<S>,
    then: ImplicitThen<S,D>,
  }): API<S,D> {
    return new API<S,D>(
      this.matcher.addCase(
        CaseFactory.create<S,D>(param)
      )
    )
  }

  addNone(param: {
    then: ImplicitThen<S,D>,
  }): API<S,D> {
    return new API<S,D>(
      this.matcher.addCase(
        CaseFactory.createNone<S,D>(param)
      )
    )
  }

  addElse(param: {
    then: ImplicitThen<S,D>,
  }): API<S,D> {
    return new API<S,D>(
      this.matcher.addCase(
        CaseFactory.createElse<S,D>(param)
      )
    )
  }

  get(): D {
    return this.matcher.get()
  }
}
