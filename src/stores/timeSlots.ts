import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useTimeslotStore = defineStore('timeSlot', () => {
  const allTimeSlots = ref({
    '1': {
      active: false,
      slots: [nanoid()],
    },
    '2': {
      active: false,
      slots: [nanoid()],
    },
    '3': {
      active: false,
      slots: [nanoid()],
    },
    '4': {
      active: false,
      slots: [nanoid()],
    },
    '5': {
      active: false,
      slots: [nanoid()],
    },
    '6': {
      active: false,
      slots: [nanoid()],
    },
    '7': {
      active: false,
      slots: [nanoid()],
    },
  })

  return { allTimeSlots }
})
