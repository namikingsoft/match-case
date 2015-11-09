import When from './When'

export default class WhenElse<S> extends When<S> {

  constructor() {
    super(n => true)
  }
}
