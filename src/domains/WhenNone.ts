import When from './When'

export default class WhenNone<S> extends When<S> {

  constructor() {
    super(n => n === undefined || n === null)
  }
}
