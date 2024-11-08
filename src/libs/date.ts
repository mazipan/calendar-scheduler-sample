import type { TimeConfig } from '@/types/TimeSlot'
import dayjs from 'dayjs'

import localeData from 'dayjs/plugin/localeData'

dayjs.extend(localeData)

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
    result.push({
      time: instanceStart.format('h:mm'),
      meridium: instanceStart.format('a') as 'am' | 'pm',
    })

    instanceStart = instanceStart.add(15, 'minutes')
  }

  return result
}
