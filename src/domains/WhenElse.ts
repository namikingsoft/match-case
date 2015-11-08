import When from 'domains/When'

export default class WhenElse<S> extends When<S> {

  constructor() {
    super(n => true)
  }
}
