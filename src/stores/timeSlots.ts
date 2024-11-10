import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import { useStorage } from '@vueuse/core'

export const STORAGE_KEY = {
  TIMESLOT: 'time-slot',
  SETTINGS: 'settings',
}

export const getNewSlotItem = (duration = 0) => {
  const dStart = new Date()
  dStart.setHours(7, 0, 0, 0)
  const instanceStart = dayjs(dStart)
  let instanceEnd = instanceStart
  if (duration) {
    instanceEnd = instanceStart.add(duration, 'minutes')
  }

  const defaultSlots = {
    id: nanoid(),
    start: instanceStart.format('h:mm.a'),
    end: instanceEnd.format('h:mm.a'),
  }

  return defaultSlots
}

export const useTimeslotStore = defineStore('timeSlot', () => {
  const defaultSettingsFromStorage = useStorage(
    STORAGE_KEY.SETTINGS,
    {
      duration: 15,
      noOfBooking: 1,
      isAllowVidCall: false,
    },
    localStorage,
    {
      mergeDefaults: true,
    },
  )

  const defaultSlots = getNewSlotItem(defaultSettingsFromStorage.value.duration)

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

  const defaultSlotsFromStorage = useStorage(STORAGE_KEY.TIMESLOT, initState, localStorage, {
    mergeDefaults: true,
  })

  const timeslots = ref(defaultSlotsFromStorage)

  const settings = ref(defaultSettingsFromStorage)

  return { timeslots, settings }
})
