export default class When<S> {

  constructor(
    private func: (value?:S)=>boolean
  ) {}

  test(value: S): boolean {
    return this.func(value)
  }
}
