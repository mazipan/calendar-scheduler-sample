import dayjs from 'dayjs'

import localeData from 'dayjs/plugin/localeData'

dayjs.extend(localeData)

export const getDayjs = () => {
  return dayjs()
}

export const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format)
}
