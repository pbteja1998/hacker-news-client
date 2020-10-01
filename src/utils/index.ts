export const classNames = (...classes: any) => classes.filter(Boolean).join(' ')

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Story } from '../types'
TimeAgo.addLocale(en)

const timeAgo = new TimeAgo('en-US')
export const timeOffset = (unixTimestamp: number) =>
  timeAgo.format(new Date(unixTimestamp * 1000))

export const dateTimeString = (unixTimestamp: number) =>
  new Date(unixTimestamp * 1000).toISOString().slice(0, 10)
