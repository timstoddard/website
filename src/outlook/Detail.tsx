import * as React from 'react'
import OutlookIcon, { OutlookIconName } from './OutlookIcon'
import { EmptyObject } from '../types'
import styles from './scss/Detail.scss'

const decodeHTML = (html: string): string => {
  // TODO better way for this? and dispose txt?
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export interface PostComment {
  id: string
  author: string
  body_html: string
  ups: number
  downs: number
  created_utc: number
}

interface Props {
  comment: PostComment
  children: JSX.Element[]
}

interface State {
  hideComment: boolean
}

// TODO move to own file
class Comment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hideComment: false,
    }
  }

  toggleHideComment = (): void => {
    this.setState({ hideComment: !this.state.hideComment })
  }

  renderDateAndTime = (secondsFromEpoch: number): string => {
    const date = new Date(secondsFromEpoch * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours() % 12
    const minutes = `0${date.getMinutes()}`.substr(-2)
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const dateString = `${month}/${day}/${year}`
    const timeString = `${hours === 0 ? '12' : hours}:${minutes} ${ampm}`
    return `${dateString} at ${timeString}`
  }

  render(): JSX.Element {
    const {
      toggleHideComment,
      renderDateAndTime,
    } = this
    const {
      comment: { author, body_html, ups, downs, created_utc },
      children,
    } = this.props
    const { hideComment } = this.state
    if (!ups && !downs && ups !== 0 && downs !== 0) {
      return null
    }
    return (
      <div className={styles.comment}>
        <a
          onClick={toggleHideComment}
          className={styles.comment__toggleButton}>
          <OutlookIcon
            iconName={OutlookIconName.DOWN_CHEVRON}
            className={styles.comment__toggleButton__downChevronIcon} />
        </a>
        <div className={styles.comment__author}>
          <span className={styles.comment__author__score}>
            {ups} • {downs}
          </span>
          <span className={styles.comment__author__name}>
            {author}
          </span>
        </div>
        <div className={styles.comment__date}>
          {renderDateAndTime(created_utc)}
        </div>
        {!hideComment && (
          <>
            <div
              dangerouslySetInnerHTML={{ __html: decodeHTML(body_html) }}
              className={styles.comment__text} />
            {children}
          </>
        )}
      </div>
    )
  }
}

interface DetailProps {
  post: any
  comments: any[]
  className: string
}

export default class Detail extends React.Component<DetailProps, EmptyObject> {
  renderDateAndTime = (secondsFromEpoch: number): string => {
    const days = 'Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday'
    const months = 'January|February|March|April|May|June|July|August|September|October|November|December'
    const date = new Date(secondsFromEpoch * 1000)
    const day = date.getDate()
    const dayName = days.split('|')[date.getDay()]
    const month = months.split('|')[date.getMonth()]
    const year = date.getFullYear()
    const hours = date.getHours() % 12
    const minutes = `0${date.getMinutes()}`.substr(-2)
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const dateString = `${dayName}, ${month} ${day}, ${year}`
    const timeString = `${hours === 0 ? '12' : hours}:${minutes} ${ampm}`
    return `${dateString} at ${timeString}`
  }

  renderComments = (comments: any[]): JSX.Element[] => {
    if (!comments) {
      return null
    }
    return comments.map((comment: any) => {
      const children = comment.data.replies
        ? this.renderComments(comment.data.replies.data.children)
        : null
      return (
      <Comment
        key={comment.data.id}
        comment={comment.data}
        children={children} />
    )})
  }

  render(): JSX.Element {
    const {
      renderDateAndTime,
      renderComments,
    } = this
    const {
      post,
      comments,
      className,
    } = this.props
    if (!post || !comments) {
      return null
    }
    const postHTML = decodeHTML(post.selftext_html)
    return (
      <div className={`detail ${className}`}>
        <div className={styles.detail__header}>
          <div className={styles.detail__header__title}>
            {post.title}
          </div>
          <hr className={styles.detail__hr} />
          <div className={styles.detail__header__details}>
            <div className={styles.detail__header__details__from__initials}>
              {post.author[0]}
            </div>
            <div className={styles.detail__header__details__from__name}>
              {post.author}
            </div>
            <div className={styles.detail__header__details__to}>
              {post.subreddit} [{post.ups} • {post.downs}]
            </div>
            <div className={styles.detail__header__details__date}>
              {renderDateAndTime(post.created_utc)}
            </div>
            <div className={styles.detail__header__details__showMore}>
              <a
                href={post.url}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.detail__header__details__showMore__link}>
                Show Details
              </a>
            </div>
          </div>
          <hr className={styles.detail__hr} />
        </div>
        <div className={styles.detail__body}>
          {(!postHTML) && post.title}
          <div
            dangerouslySetInnerHTML={{ __html: postHTML }}
            className={styles.detail__postHTML} />
          <div className={styles.detail__comments}>
            {renderComments(comments)}
          </div>
        </div>
      </div>
    )
  }
}
