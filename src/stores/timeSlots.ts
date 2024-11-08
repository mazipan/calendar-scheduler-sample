import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import { useStorage } from '@vueuse/core'

export const STORAGE_KEY = 'time-slot'
export const getNewSlotItem = () => {
  const dStart = new Date()
  dStart.setHours(7, 0, 0, 0)
  const instanceStart = dayjs(dStart)

  const defaultSlots = {
    id: nanoid(),
    start: instanceStart.format('h:mm.a'),
    end: instanceStart.format('h:mm.a'),
  }

  return defaultSlots
}

export const useTimeslotStore = defineStore('timeSlot', () => {
  const defaultSlots = getNewSlotItem()

  const initState = {
    '1': {
      active: false,
      slots: [defaultSlots],
    },
    '2': {
      active: false,
      slots: [defaultSlots],
    },
    '3': {
      active: false,
      slots: [defaultSlots],
    },
    '4': {
      active: false,
      slots: [defaultSlots],
    },
    '5': {
      active: false,
      slots: [defaultSlots],
    },
    '6': {
      active: false,
      slots: [defaultSlots],
    },
    '7': {
      active: false,
      slots: [defaultSlots],
    },
  }

  const defaultVal = useStorage(STORAGE_KEY, initState, localStorage, {
    mergeDefaults: true,
  })

  const timeslots = ref(defaultVal)

  return { timeslots }
})
