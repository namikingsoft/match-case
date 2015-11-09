import When from './When'
import WhenNone from './WhenNone'
import WhenElse from './WhenElse'

export type ImplicitWhen<S> = S | ((value?:S)=>boolean)

export default class WhenFactory {

  static create<S>(arg: ImplicitWhen<S>): When<S> {
    if (arg instanceof Function) {
      return new When<S>(arg)
    } else {
      return new When<S>(v => v === arg)
    }
  }

  static createNone<S>(): When<S> {
    return new WhenNone<S>()
  }

  static createElse<S>(): When<S> {
    return new WhenElse<S>()
  }
}
