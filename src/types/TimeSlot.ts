import type dayjs from 'dayjs'

export type DayKey = '1' | '2' | '3' | '4' | '5' | '6' | '7'

export type TimeConfig = {
  dayjs: dayjs.Dayjs
  time: string
  meridium: 'am' | 'pm'
}
