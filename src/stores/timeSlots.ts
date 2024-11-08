import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

export const useTimeslotStore = defineStore('timeSlot', () => {
  const dStart = new Date()
  dStart.setHours(7, 0, 0, 0)
  const instanceStart = dayjs(dStart)

  const timeslots = ref({
    '1': {
      active: false,
      slots: [
        {
          id: nanoid,
          start: instanceStart,
          end: instanceStart,
        },
      ],
    },
    '2': {
      active: false,
      slots: [
        {
          id: nanoid,
          start: instanceStart,
          end: instanceStart,
        },
      ],
    },
    '3': {
      active: false,
      slots: [
        {
          id: nanoid,
          start: instanceStart,
          end: instanceStart,
        },
      ],
    },
    '4': {
      active: false,
      slots: [
        {
          id: nanoid,
          start: instanceStart,
          end: instanceStart,
        },
      ],
    },
    '5': {
      active: false,
      slots: [
        {
          id: nanoid,
          start: instanceStart,
          end: instanceStart,
        },
      ],
    },
    '6': {
      active: false,
      slots: [
        {
          id: nanoid,
          start: instanceStart,
          end: instanceStart,
        },
      ],
    },
    '7': {
      active: false,
      slots: [
        {
          id: nanoid,
          start: instanceStart,
          end: instanceStart,
        },
      ],
    },
  })

  return { timeslots }
})
