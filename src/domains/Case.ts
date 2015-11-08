import When from 'domains/When'
import Then from 'domains/Then'

export default class Case<S,D> {

  constructor(private param: {
    when: When<S>,
    then: Then<S,D>,
  }) {}

  get when(): When<S> {
    return this.param.when
  }

  get then(): Then<S,D> {
    return this.param.then
  }
}
