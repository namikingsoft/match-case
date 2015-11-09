import Then from './Then'

export type ImplicitThen<S,D> = D | ((value?:S)=>D)

export default class ThenFactory {

  static create<S,D>(arg: ImplicitThen<S,D>): Then<S,D> {
    if (arg instanceof Function) {
      return new Then<S,D>(arg)
    } else {
      return new Then<S,D>(v => <D>arg)
    }
  }
}
