import axios, { AxiosResponse } from 'axios'
import * as React from 'react'
import Detail, { PostComment } from './Detail'
import Folders from './Folders'
import Footer from './Footer'
import Header from './Header'
import Posts, { Post } from './Posts'
import { EmptyObject } from '../types'
import styles from './scss/Outlook.scss'

interface State {
  fakeEmail: string
  subredditName: string
  postDetails: Post
  // TODO better type
  postComments: { data: PostComment }[]
  sortSettingsString: string
}

const NEW_SUBREDDIT_MESSAGE = 'Enter a subreddit name (leave blank for the default)'
const FAKE_EMAIL_MESSAGE = 'Enter a fake email (leave blank for the default)'
const DEFAULT_SUBREDDIT =  'cars'
const DEFAULT_EMAIL = 'johnsmith23@gmail.com'

export default class Outlook extends React.Component<EmptyObject, State> {
  postsRef: React.Ref<Posts>

  constructor(props: EmptyObject) {
    super(props)
    this.postsRef = React.createRef()

    const subredditName = localStorage.getItem('OUTLOOK_REDDIT_DEFAULT_SUBREDDIT')
      || prompt(NEW_SUBREDDIT_MESSAGE)
      || DEFAULT_SUBREDDIT
    const fakeEmail =
      localStorage.getItem('OUTLOOK_REDDIT_DEFAULT_EMAIL')
      || prompt(FAKE_EMAIL_MESSAGE)
      || DEFAULT_EMAIL

    this.state = {
      fakeEmail,
      subredditName,
      postDetails: null,
      postComments: null,
      sortSettingsString: '',
    }

    // save email/sub from state to local storage
    this.saveSettings()
  }

  getPostDetails = (postUrl: string): void => {
    axios.get(postUrl)
      .then((response: AxiosResponse) => {
        this.setState({
          postDetails: response.data[0].data.children[0].data,
          postComments: response.data[1].data.children,
        })
      })
      .catch((error: Error) => {
        console.error(error) // tslint:disable-line:no-console
      })
  }

  saveSettings = (): void => {
    const {
      subredditName,
      fakeEmail,
    } = this.state
    localStorage.setItem('OUTLOOK_REDDIT_DEFAULT_SUBREDDIT', subredditName)
    localStorage.setItem('OUTLOOK_REDDIT_DEFAULT_EMAIL', fakeEmail)
  }

  setSubredditName = (): void => {
    const { subredditName } = this.state
    const newSubredditName = prompt(NEW_SUBREDDIT_MESSAGE)
      || (subredditName ? subredditName : DEFAULT_SUBREDDIT)
    const subredditNameChanged = subredditName !== newSubredditName
    if (subredditNameChanged) {
      this.setState({
        subredditName: newSubredditName,
        postDetails: null,
        postComments: null,
      }, () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.postsRef as any).current.loadPosts()
        this.saveSettings()
      })
    }
  }

  setSortSettingsString = (sortSettingsString: string): void => {
    this.setState({ sortSettingsString })
  }

  render(): JSX.Element {
    document.title = 'Outlook'

    const {
      getPostDetails,
      setSubredditName,
      setSortSettingsString,
    } = this
    const {
      fakeEmail,
      subredditName,
      postDetails,
      postComments,
      sortSettingsString,
    } = this.state
    const detailedSubredditName = sortSettingsString
      ? `${subredditName} - ${sortSettingsString}`
      : subredditName
    return (
      <div className={styles.outlook}>
        <Header
          subredditName={detailedSubredditName}
          fakeEmail={fakeEmail}
          className={styles.outlook__header} />
        <Folders
          subredditName={subredditName}
          fakeEmail={fakeEmail}
          setSubredditName={setSubredditName}
          className={styles.outlook__folders} />
        <Posts
          ref={this.postsRef}
          subredditName={subredditName}
          getPostDetails={getPostDetails}
          setSortSettingsString={setSortSettingsString}
          className={styles.outlook__posts} />
        <Detail
          post={postDetails}
          comments={postComments}
          className={styles.outlook__detail} />
        <Footer
          fakeEmail={fakeEmail}
          className={styles.outlook__footer} />
      </div>
    )
  }
}
