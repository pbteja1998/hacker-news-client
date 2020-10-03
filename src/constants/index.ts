import { ListBoxOption } from '../components/ListBox'

export const NUMBER_OF_COMMENTS: ListBoxOption = {
  value: 'NUMBER_OF_COMMENTS',
  text: 'Comments',
}

export const POPULARITY: ListBoxOption = {
  value: 'POPULARITY',
  text: 'Popularity',
}
export const DATE: ListBoxOption = {
  value: 'DATE',
  text: 'Date',
}

export const ASCENDING: ListBoxOption = {
  value: 'ASCENDING',
  text: 'Ascending',
}

export const DESCENDING: ListBoxOption = {
  value: 'DESCENDING',
  text: 'Descending',
}

export const ALL_TIME: ListBoxOption = {
  value: 'ALL_TIME',
  text: 'All Time',
}
export const LAST_24H: ListBoxOption = {
  value: 'LAST_24H',
  text: 'Last 24 Hours',
}
export const PAST_WEEK: ListBoxOption = {
  value: 'PAST_WEEK',
  text: 'Past Week',
}
export const PAST_MONTH: ListBoxOption = {
  value: 'PAST_MONTH',
  text: 'Past Month',
}
export const PAST_YEAR: ListBoxOption = {
  value: 'PAST_YEAR',
  text: 'Past Year',
}

export const SORT_BY_OPTIONS: ListBoxOption[] = [
  POPULARITY,
  DATE,
  NUMBER_OF_COMMENTS,
]
export const FILTER_OPTIONS: ListBoxOption[] = [
  ALL_TIME,
  LAST_24H,
  PAST_WEEK,
  PAST_MONTH,
  PAST_YEAR,
]
export const ORDER_IN_OPTIONS: ListBoxOption[] = [ASCENDING, DESCENDING]
