import MatchAPI from './api/MatchAPI'

export default function match<D>(value?: any): MatchAPI<any,D>;
export default function match<S,D>(value?: S): MatchAPI<S,D>;
export default function match<S,D>(value?: S): MatchAPI<S,D> {
  return new MatchAPI<S,D>(value)
}
