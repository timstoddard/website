import { SortByDateRange, SortByFilter } from './Posts'

export default class SubredditService {
  private subredditName: string = ''
  private sortBy: SortByFilter = SortByFilter.HOT
  private params: { [key: string]: unknown } = {}

  constructor(subredditName: string, sortBy: SortByFilter) {
    this.subredditName = subredditName
    this.sortBy = sortBy
    return this
  }

  after = (after: string): SubredditService => {
    this.params.after = after
    return this
  }

  count = (count: number): SubredditService => {
    this.params.count = count
    return this
  }

  limit = (limit: number): SubredditService => {
    this.params.limit = limit
    return this
  }

  t = (t: SortByDateRange): SubredditService => {
    this.params.t = t
    return this
  }

  serialize = (): string => {
    const { params } = this
    const base = `https://www.reddit.com/r/${this.subredditName}/${this.sortBy}.json`
    const queryParams = Object.keys(params)
      .map(((n: string): string => `${n}=${params[n]}`))
      .join('&')
    return `${base}?${queryParams}`
  }
}
