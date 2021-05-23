import axios, { AxiosResponse } from 'axios'
import classNames from 'classnames'
import * as React from 'react'
import OutlookIcon, { OutlookIconName } from './OutlookIcon'
import SubredditService from './subreddit-service'
import styles from './scss/Posts.scss'

const PRELOAD_THRESHOLD_PX = 100

// TEMP
const fakePosts: Post[] = new Array(20).fill(0).map((n: any, i: number) => ({
  id: `id-${i}`,
  title: `Title ${i}`,
  author: `Author ${i}`,
  selftext: `selftext ${i}`,
  permalink: `permalink-${i}`,
  created_utc: new Date().valueOf(),
  ups: i * 3,
  downs: i % 3,
  fullname: `Fullname ${i}`,
}))

export interface Post {
  id: string
  title: string
  author: string
  selftext: string
  permalink: string
  created_utc: number
  ups: number
  downs: number
  fullname: string
}

export enum SortByFilter {
  HOT = 'hot',
  NEW = 'new',
  CONTROVERSIAL = 'controversial',
  TOP = 'top',
  RISING = 'rising',
}

export enum SortByDateRange {
  NOW = 'hour',
  TODAY = 'day',
  THIS_WEEK = 'week',
  THIS_MONTH = 'month',
  THIS_YEAR = 'year',
  ALL_TIME = 'all',
}

interface PostsProps {
  subredditName: string
  getPostDetails: (postUrl: string) => void
  setSortSettingsString: (n: string) => void
  className: string
}

interface PostsState {
  posts: Post[]
  sortBy: SortByFilter
  sortByDateRange: SortByDateRange
  selectedPost: Post
  showingSortOptions1: boolean
  showingSortOptions2: boolean
}

const DEFAULT_SORT_BY = SortByFilter.HOT

const httpGet = (subredditService: SubredditService): Promise<AxiosResponse<unknown>> => {
  return axios.get(subredditService.serialize())
}

export default class Posts extends React.Component<PostsProps, PostsState> {
  containerElement: React.Ref<HTMLDivElement>

  constructor(props: PostsProps) {
    super(props)

    this.containerElement = React.createRef()

    const sortBy = localStorage.getItem('OUTLOOK_REDDIT_SORT_BY') as SortByFilter
    || DEFAULT_SORT_BY

    this.state = {
      posts: fakePosts, // posts: [],
      sortBy,
      sortByDateRange: SortByDateRange.NOW,
      selectedPost: null,
      showingSortOptions1: false,
      showingSortOptions2: false,
    }
  }

  componentDidMount = (): void => {
    // this.loadPosts()
  }

  loadPosts = (): void => {
    /*const {
      extractPosts,
    } = this
    const {
      subredditName,
      setSortSettingsString,
    } = this.props
    const {
      sortBy,
      sortByDateRange,
    } = this.state
    // axios.get(`https://www.reddit.com/r/${subredditName}/${sortBy}.json?t=${sortByDateRange}&limit=50`)
    httpGet(new SubredditService(subredditName, sortBy).t(sortByDateRange).limit(50))
      .then((response: AxiosResponse) => {
        this.setState({
          posts: response.data.data.children.map(extractPosts),
        }, () => {
          console.log(this.state.posts)
          setSortSettingsString(this.serializeSortSettings())
          // this.loadMorePosts()
        })
      })
      .catch((error: Error) => {
        console.error(error) // tslint:disable-line:no-console
      })
  }

  loadMorePosts = (): void => {
    const {
      extractPosts,
    } = this
    const {
      subredditName,
      setSortSettingsString,
    } = this.props
    const {
      posts,
      sortBy,
      sortByDateRange,
    } = this.state
    const { fullname: lastId } = posts[posts.length - 1]
    // axios.get(`https://www.reddit.com/r/${subredditName}/${sortBy}.json?after=${lastId}`)
    httpGet(new SubredditService(subredditName, sortBy).after(lastId))
      .then((response: AxiosResponse) => {
        console.log(response.data.data)
        console.log(response.data.data.children)
        this.setState({
          posts: [
            ...posts,
            ...response.data.data.children.map(extractPosts),
          ],
        }, () => {
          console.log(this.state.posts)
          setSortSettingsString(this.serializeSortSettings())
        })
      })
      .catch((error: Error) => {
        console.error(error) // tslint:disable-line:no-console
      })//*/
  }

  saveSettings = (): void => {
    const { sortBy } = this.state
    localStorage.setItem('OUTLOOK_REDDIT_SORT_BY', sortBy)
  }

  setSelectedPost = (selectedPostIndex: number): (() => void) =>
    (): void => {
      const { getPostDetails } = this.props
      const { posts } = this.state
      const selectedPost = posts[selectedPostIndex]
      this.setState({ selectedPost })
      getPostDetails(`https://www.reddit.com/${selectedPost.permalink}.json`)
    }

  setFilter = (sortBy: SortByFilter): (() => void) => (): void => {
    this.setState({
      sortBy,
      showingSortOptions1: false,
      showingSortOptions2: false,
    }, this.loadPosts)
  }

  setDateRange = (sortByDateRange: SortByDateRange): (() => void) => (): void => {
    this.setState({
      sortByDateRange,
      showingSortOptions1: false,
      showingSortOptions2: false,
    }, this.loadPosts)
  }

  toggle = (name: keyof PostsState): (() => void) => (): void => {
    this.setState({
      showingSortOptions1: false,
      showingSortOptions2: false,
      [name]: !this.state[name],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
  }

  serializeSortSettings = (): string => {
    const {
      sortBy,
      sortByDateRange,
    } = this.state
    return this.needsSortByDateRange()
      ? `${sortBy} (${sortByDateRange})`
      : `${sortBy}`
  }

  needsSortByDateRange = (): boolean => {
    const { sortBy } = this.state
    return sortBy === SortByFilter.TOP
      || sortBy === SortByFilter.CONTROVERSIAL
  }

  renderTimestamp = (secondsFromEpoch: number): string => {
    let result = ''
    const now = new Date()
    const yesterday = new Date(now.valueOf() - (1000 * 60 * 60 * 24))
    const date = new Date(secondsFromEpoch * 1000)
    if (
      now.getDay() === date.getDay()
      && now.getMonth() === date.getMonth()
      && now.getFullYear() === date.getFullYear()
    ) {
      // current day, show the time
      const hours = date.getHours() % 12
      const minutes = `0${date.getMinutes()}`.substr(-2)
      const ampm = hours >= 12 ? 'PM' : 'AM'
      result = `${hours === 0 ? '12' : hours}:${minutes} ${ampm}`
    } else if (
      // previous day, show 'yesterday'
      yesterday.getDay() === date.getDay()
      && yesterday.getMonth() === date.getMonth()
      && yesterday.getFullYear() === date.getFullYear()
    ) {
      result = 'Yesterday'
    } else {
      // older, show day
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = `${date.getFullYear()}`.substr(-2)
      result = `${month}/${day}/${year}`
    }
    return result
  }

  render(): JSX.Element {
    const {
      setSelectedPost,
      setFilter,
      setDateRange,
      toggle,
      needsSortByDateRange,
      renderTimestamp,
    } = this
    const {
      className,
    } = this.props
    const {
      posts,
      selectedPost,
      showingSortOptions1,
      showingSortOptions2,
    } = this.state
    return (
      <div className={classNames(styles.posts, className)}>
        <div className={styles.posts__sortBy}>
          <div className={styles.posts__sortBy__sortOptions1}>
            <a
              onClick={toggle('showingSortOptions1')}
              className={styles.posts__sortBy__sortOptions1Trigger}>
              By: Conversations
              <OutlookIcon
                iconName={OutlookIconName.DOWN_CHEVRON}
                className={styles.posts__sortBy__downChevronIcon} />
            </a>
            {showingSortOptions1 && (
              <div className={styles.posts__sortBy__sortOptions1List}>
                <button
                  onClick={setFilter(SortByFilter.HOT)}
                  className={styles.posts__sortBy__sortOptions1List__option}>
                  {SortByFilter.HOT}
                </button>
                <button
                  onClick={setFilter(SortByFilter.NEW)}
                  className={styles.posts__sortBy__sortOptions1List__option}>
                  {SortByFilter.NEW}
                </button>
                <button
                  onClick={setFilter(SortByFilter.CONTROVERSIAL)}
                  className={styles.posts__sortBy__sortOptions1List__option}>
                  {SortByFilter.CONTROVERSIAL}
                </button>
                <button
                  onClick={setFilter(SortByFilter.TOP)}
                  className={styles.posts__sortBy__sortOptions1List__option}>
                  {SortByFilter.TOP}
                </button>
                <button
                  onClick={setFilter(SortByFilter.RISING)}
                  className={styles.posts__sortBy__sortOptions1List__option}>
                  {SortByFilter.RISING}
                </button>
              </div>
            )}
          </div>
          <div className={styles.posts__sortBy__sortOptions2}>
            <a
              onClick={toggle('showingSortOptions2')}
              className={styles.posts__sortBy__sortOptions2Trigger}>
              <OutlookIcon
                iconName={OutlookIconName.DOWN_ARROW}
                className={styles.posts__sortBy__downArrowIcon} />
            </a>
            {(showingSortOptions2 && needsSortByDateRange()) && (
              <div className={styles.posts__sortBy__sortOptions2List}>
                <button
                  onClick={setDateRange(SortByDateRange.NOW)}
                  className={styles.posts__sortBy__sortOptions2List__option}>
                  {SortByDateRange.NOW}
                </button>
                <button
                  onClick={setDateRange(SortByDateRange.TODAY)}
                  className={styles.posts__sortBy__sortOptions2List__option}>
                  {SortByDateRange.TODAY}
                </button>
                <button
                  onClick={setDateRange(SortByDateRange.THIS_WEEK)}
                  className={styles.posts__sortBy__sortOptions2List__option}>
                  {SortByDateRange.THIS_WEEK}
                </button>
                <button
                  onClick={setDateRange(SortByDateRange.THIS_MONTH)}
                  className={styles.posts__sortBy__sortOptions2List__option}>
                  {SortByDateRange.THIS_MONTH}
                </button>
                <button
                  onClick={setDateRange(SortByDateRange.THIS_YEAR)}
                  className={styles.posts__sortBy__sortOptions2List__option}>
                  {SortByDateRange.THIS_YEAR}
                </button>
                <button
                  onClick={setDateRange(SortByDateRange.ALL_TIME)}
                  className={styles.posts__sortBy__sortOptions2List__option}>
                  {SortByDateRange.ALL_TIME}
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          ref={this.containerElement}
          onScroll={(e: React.UIEvent): void => {
            // console.log('[SCROLL]', e)
            // TODO have to know what direction user is scrolling
            const currentScrollHeight = (e.target as HTMLElement).scrollTop
            + (e.target as HTMLElement).getBoundingClientRect().height
            const totalScrollHeight = (e.target as HTMLElement).scrollHeight
            if (currentScrollHeight + PRELOAD_THRESHOLD_PX >= totalScrollHeight) {
              console.log('PRELOAD')
            }
          }}
          className={styles.posts__scrollPane}>
          <div className={styles.posts__todayHeader}>
            <OutlookIcon
              iconName={OutlookIconName.DOWN_CHEVRON}
              className={styles.posts__todayHeader__downChevronIcon} />
            Today
          </div>
          {posts.map((post: Post, i: number) => (
            <div
              key={post.id}
              onClick={setSelectedPost(i)}
              className={classNames(
                styles.posts__post,
                { [styles['posts__post--selected']]: selectedPost && post.id === selectedPost.id })}>
              <div className={styles.posts__post__from}>
                <div className={styles.posts__post__from__name}>
                  {post.author}
                </div>
                <div className={styles.posts__post__from__actions}>
                  <OutlookIcon
                    iconName={OutlookIconName.TRASH_CAN}
                    className={styles.posts__post__from__actions__trashCanIcon} />
                  <OutlookIcon
                    iconName={OutlookIconName.FLAG}
                    className={styles.posts__post__from__actions__flagIcon} />
                </div>
              </div>
              <div className={styles.posts__post__title}>
                <div className={styles.posts__post__title__name}>
                  {post.title}
                </div>
                <div className={styles.posts__post__title__time}>
                  {renderTimestamp(post.created_utc)}
                </div>
              </div>
              <div className={styles.posts__post__preview}>
                {post.selftext || 'This post has no text.'}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  private extractPosts = (n: { data: Post }): Post => n.data
}
