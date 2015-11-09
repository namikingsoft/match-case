import API from './domains/API'

export default function match<D>(value?: any): API<any,D>;
export default function match<S,D>(value?: S): API<S,D>;
export default function match<S,D>(value?: S): API<S,D> {
  return new API<S,D>(value)
}
