import type { TimeConfig } from '@/types/TimeSlot'
import dayjs from 'dayjs'

export const getDayjs = () => {
  return dayjs()
}

export const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format)
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
