import type { TimeConfig } from '@/types/TimeSlot'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const getDayjs = () => {
  return dayjs()
}

export const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format)
}

export const timeToDayJs = (timeStr: string, dateJs: dayjs.Dayjs) => {
  const newCompared = `${dateJs.format('YYYY-MM-DD')} ${timeStr.replace('.', ' ')}`
  return dayjs(newCompared, 'YYYY-MM-DD h:mm a')
}

export const isInTimeRange = (time: dayjs.Dayjs, start: string, end: string) => {
  const startDayjs = timeToDayJs(start, time)
  const endDayjs = timeToDayJs(end, time)

  const isSameOrAfterStart = time.isSameOrAfter(startDayjs.format('YYYY-MM-DD HH:mm:ss'), 'minutes')
  const isSameOrBeforeEnd = time.isSameOrBefore(endDayjs.format('YYYY-MM-DD HH:mm:ss'), 'minutes')

  return isSameOrAfterStart && isSameOrBeforeEnd
}

export const generateTimes = () => {
  const dStart = new Date()
  dStart.setHours(7, 0, 0, 0)

  const dEnd = new Date()
  dEnd.setHours(19, 1, 0, 0)

  let instanceStart = dayjs(dStart)
  const instanceEnd = dayjs(dEnd)
  const result: TimeConfig[] = []

  while (instanceStart < instanceEnd) {
    const dayjs = instanceStart

    result.push({
      dayjs: dayjs,
      time: dayjs.format('h:mm'),
      meridium: dayjs.format('a') as 'am' | 'pm',
    })

    instanceStart = dayjs.add(15, 'minutes')
  }

  return result
}
