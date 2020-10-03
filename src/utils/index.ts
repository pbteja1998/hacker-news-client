import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)

const timeAgo = new TimeAgo('en-US')
export const timeOffset = (unixTimestamp: number) =>
  timeAgo.format(new Date(unixTimestamp * 1000), 'twitter')

export const dateTimeString = (unixTimestamp: number) =>
  new Date(unixTimestamp * 1000).toISOString().slice(0, 10)

export const toTitleCase = (title: string) =>
  title[0].toUpperCase() + title.slice(1)

export const getDomain = (url: string) => url.split('/')[2]
