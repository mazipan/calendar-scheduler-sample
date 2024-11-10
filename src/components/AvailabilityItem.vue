<script setup lang="ts">
import { generateTimes, timeToDayJs } from '@/libs/date'
import { getNewSlotItem, useTimeslotStore } from '@/stores/timeSlots'
import type { DayKey, TimeConfig } from '@/types/TimeSlot'
import { DocumentDuplicateIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

const errorMessage = ref<string>('')
const store = useTimeslotStore()
const { text, value, isLeaf } = defineProps<{ text: string; value: string; isLeaf: boolean }>()

const TIMES: TimeConfig[] = generateTimes()

const currentTimeSlot = computed(() => store.timeslots[value?.toString() as DayKey])

const handleAddNewTimeSlot = () => {
  // Make sure it doesn't overflow the number of booking setting
  if (currentTimeSlot.value.slots.length < store.settings.noOfBooking) {
    const newVal = {
      ...store.timeslots,
      [value as DayKey]: {
        active: currentTimeSlot.value.active,
        slots: [...currentTimeSlot.value.slots, getNewSlotItem(store.settings.duration)],
      },
    }

    store.timeslots = newVal
  }
}

const handleDeleteTimeSlot = (id: string) => {
  // At least it still have one slot
  if (currentTimeSlot.value.slots.length > 1) {
    const newVal = {
      ...store.timeslots,
      [value as DayKey]: {
        active: currentTimeSlot.value.active,
        slots: currentTimeSlot.value.slots.filter((i) => i.id !== id),
      },
    }

    store.timeslots = newVal
  }
}

const handleToggleActive = () => {
  const nextValue = !currentTimeSlot.value.active
  const newVal = {
    ...store.timeslots,
    [value as DayKey]: {
      active: nextValue,
      slots: !nextValue ? [] : [getNewSlotItem(store.settings.duration)],
    },
  }

  store.timeslots = newVal
}

const handleUpdateStart = ({ val, id }: { val: string; id: string }) => {
  // Auto assign dateEnd
  const dayjsStart = timeToDayJs(val, dayjs())
  const dayjsEnd = dayjsStart.add(store.settings.duration, 'minutes')

  const isContainsSame = currentTimeSlot.value.slots.find((s) => s.start === val)

  if (!isContainsSame) {
    errorMessage.value = ''
    const manipulatedSlots = currentTimeSlot.value.slots.map((s) => {
      if (s.id === id) {
        return {
          id: s.id,
          start: val,
          end: dayjsEnd.format('h:mm.a'),
        }
      }

      return {
        id: s.id,
        start: s.start,
        end: s.end,
      }
    })

    const newVal = {
      ...store.timeslots,
      [value as DayKey]: {
        active: currentTimeSlot.value.active,
        slots: manipulatedSlots,
      },
    }

    store.timeslots = newVal
  } else {
    // TODO: Send toaster
    errorMessage.value = 'You can not select the same start time within the same day.'
  }
}
</script>

<template>
  <div :class="`availability py-4 flex gap-2 items-start ${!isLeaf && 'border-b'}`">
    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          :checked="currentTimeSlot?.active"
          class="checkbox"
          :value="value"
          v-on:click="handleToggleActive"
        />
        <span class="label-text">{{ text }}</span>

        <template v-if="!currentTimeSlot?.active">
          <span class="text-gray-400">Unavailable</span>
        </template>
      </label>
    </div>
    <template v-if="currentTimeSlot?.active">
      <div class="grid gap-2">
        <div class="flex gap-2 items-center" v-for="slot in currentTimeSlot?.slots" :key="slot?.id">
          <select
            className="select select-bordered max-w-[150px]"
            :value="currentTimeSlot?.slots?.find((i) => i.id === slot.id)?.start"
            v-on:change="
              (e: Event) => {
                const newVal = (e?.target as HTMLInputElement)?.value
                handleUpdateStart({
                  val: newVal,
                  id: slot?.id,
                })
              }
            "
          >
            <option
              v-for="t in TIMES"
              :key="`${t.time}.${t.meridium}`"
              :value="`${t.time}.${t.meridium}`"
            >
              {{ t.time }} {{ t.meridium }}
            </option>
          </select>
          <span>-</span>
          <select
            className="select select-bordered max-w-[150px]"
            disabled
            :value="currentTimeSlot?.slots?.find((i) => i.id === slot.id)?.end"
          >
            <option
              disabled
              v-for="t in TIMES"
              :key="`${t.time}.${t.meridium}`"
              :value="`${t.time}.${t.meridium}`"
            >
              {{ t.time }} {{ t.meridium }}
            </option>
          </select>

          <button
            class="btn btn-sm btn-square btn-ghost"
            v-on:click="
              () => {
                handleDeleteTimeSlot(slot?.id)
              }
            "
          >
            <XCircleIcon class="size-4" />
          </button>

          <button class="btn btn-sm btn-square btn-ghost">
            <DocumentDuplicateIcon class="size-4" />
          </button>
          <button class="btn btn-sm btn-square btn-ghost ml-8" v-on:click="handleAddNewTimeSlot">
            <PlusCircleIcon class="size-4" />
          </button>
        </div>
      </div>
    </template>
  </div>

  <div class="toast toast-end toast-middle" v-if="errorMessage">
    <div role="alert" class="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>
