<script setup lang="ts">
import { generateTimes } from '@/libs/date'
import { getNewSlotItem, useTimeslotStore } from '@/stores/timeSlots'
import type { DayKey, TimeConfig } from '@/types/TimeSlot'
import { DocumentDuplicateIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const store = useTimeslotStore()
const { text, value, isLeaf } = defineProps<{ text: string; value: string; isLeaf: boolean }>()

const TIMES: TimeConfig[] = generateTimes()

const currentTimeSlot = computed(() => store.timeslots[value?.toString() as DayKey])

const handleAddNewTimeSlot = () => {
  const newVal = {
    ...store.timeslots,
    [value as DayKey]: {
      active: currentTimeSlot.value.active,
      slots: [...currentTimeSlot.value.slots, getNewSlotItem()],
    },
  }

  store.timeslots = newVal
}

const handleDeleteTimeSlot = (id: string) => {
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
  const newVal = {
    ...store.timeslots,
    [value as DayKey]: {
      active: !currentTimeSlot.value.active,
      slots: currentTimeSlot.value.slots,
    },
  }

  store.timeslots = newVal
}

const handleUpdateStart = ({ val, id }: { val: string; id: string }) => {
  const manipulatedSlots = currentTimeSlot.value.slots.map((s) => {
    if (s.id === id) {
      return {
        id: s.id,
        start: val,
        end: s.end,
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
}

const handleUpdateEnd = ({ val, id }: { val: string; id: string }) => {
  const manipulatedSlots = currentTimeSlot.value.slots.map((s) => {
    if (s.id === id) {
      return {
        id: s.id,
        start: s.start,
        end: val,
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
            className="select max-w-[150px]"
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
            className="select max-w-[150px]"
            :value="currentTimeSlot?.slots?.find((i) => i.id === slot.id)?.end"
            v-on:change="
              (e: Event) => {
                const newVal = (e?.target as HTMLInputElement)?.value
                handleUpdateEnd({
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
</template>
