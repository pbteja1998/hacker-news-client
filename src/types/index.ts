/**
 * @param id - integer> - The item's unique id.
 * @param deleted - boolean - "true" if the item is deleted.
 * @param by - string - The username of the item's author.
 * @param time - integer - Creation date of the item, in Unix Time.
 * @param dead - boolean - "true" if the item is dead.
 * @param kids - array[integer] - The ids of the item's comments, in ranked display order.
 * @param score - integer - The story's score, or the votes for a pollopt.
 * @param text - string - The comment, story or poll text. HTML.
 * @param title - string - The title of the story, poll or job.
 * @param url - string - The URL of the story.
 * @param type - string - The type of item. One of "job", "story", "comment", "poll", or "pollopt".
 * @param descendants - integer - In the case of stories or polls, the total comment count.
 * @param parent - integer - The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll.
 * @param parts - array[integer] - A list of related pollopts, in display order.
 */

export interface Base {
  id: number
  deleted: boolean
  by: string
  time: number
  dead: boolean
  kids: number[]
}

export interface Job extends Base {
  score: number
  text: string
  title: string
  url: string
  type: 'job'
}

export interface Story extends Base {
  descendants: number
  score: number
  title: string
  url: string
  type: 'story'
  text: string
}

export interface Comment extends Base {
  parent: number
  text: string
  type: 'comment'
}

export interface Poll extends Base {
  descendants: number
  parts: number[]
  score: number
  text: string
  title: string
  type: 'poll'
}

export interface PollOption extends Base {
  parent: number
  score: number
  text: string
  type: 'pollopt'
}

/**
 * @param id - string - The user's unique username. Case-sensitive.
 * @param delay - integer - Delay in minutes between a comment's creation and its visibility to other users.
 * @param about - string - The user's optional self-description. HTML.
 * @param created - integer - Creation date of the user, in Unix Time.
 * @param karma - integer - The user's karma.
 * @param submitted - array[integer] - List of the user's stories, polls and comments.
 */

export interface User {
  id: string
  delay: number
  about: string
  created: number
  karma: number
  submitted: number[]
}

export enum StoryType {
  ASK,
  SHOW,
  JOB,
}
