import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

export const getNewSlotItem = () => {
  const dStart = new Date()
  dStart.setHours(7, 0, 0, 0)
  const instanceStart = dayjs(dStart)

  const defaultSlots = {
    id: nanoid(),
    start: instanceStart,
    end: instanceStart,
  }

  return defaultSlots
}

export const useTimeslotStore = defineStore('timeSlot', () => {
  const defaultSlots = getNewSlotItem()

  const timeslots = ref({
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
  })

  return { timeslots }
})
