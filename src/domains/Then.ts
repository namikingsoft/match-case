export default class Then<S,D> {

  constructor(
    private func: (value?:S)=>D
  ) {}

  exec(value?: S): D {
    return this.func(value)
  }
}
