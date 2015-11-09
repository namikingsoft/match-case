import Case from './Case'
import WhenFactory, {ImplicitWhen} from './WhenFactory'
import ThenFactory, {ImplicitThen} from './ThenFactory'

export default class CaseFactory {

  static create<S,D>(param: {
    when: ImplicitWhen<S>,
    then: ImplicitThen<S,D>,
  }): Case<S,D> {
    return new Case<S,D>({
      when: WhenFactory.create<S>(param.when),
      then: ThenFactory.create<S,D>(param.then),
    })
  }

  static createNone<S,D>(param: {
    then: ImplicitThen<S,D>,
  }): Case<S,D> {
    return new Case<S,D>({
      when: WhenFactory.createNone<S>(),
      then: ThenFactory.create<S,D>(param.then),
    })
  }

  static createElse<S,D>(param: {
    then: ImplicitThen<S,D>,
  }): Case<S,D> {
    return new Case<S,D>({
      when: WhenFactory.createElse<S>(),
      then: ThenFactory.create<S,D>(param.then),
    })
  }
}
