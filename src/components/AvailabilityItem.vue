<script setup lang="ts">
import { generateTimes } from '@/libs/date'
import { useTimeslotStore } from '@/stores/timeSlots'
import type { DayKey, TimeConfig } from '@/types/TimeSlot'
import { DocumentDuplicateIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'

const store = useTimeslotStore()
const timeSlots = ref<string[]>([nanoid()])
const { text, value, isLeaf } = defineProps<{ text: string; value: string; isLeaf: boolean }>()

const TIMES: TimeConfig[] = generateTimes()

const currentTimeSlot = computed(() => store.timeslots[value?.toString() as DayKey])

const handleAddNewTimeSlot = () => {
  timeSlots.value = [...timeSlots.value, nanoid()]
}

const handleDeleteTimeSlot = (id: string) => {
  if (timeSlots.value.length > 1) {
    timeSlots.value = timeSlots.value.filter((i) => i !== id)
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
        <div class="flex gap-2 items-center" v-for="id in timeSlots" :key="id">
          <select className="select max-w-[150px]">
            <option
              v-for="t in TIMES"
              :key="`${t.time}.${t.meridium}`"
              :value="`${t.time}.${t.meridium}`"
            >
              {{ t.time }} {{ t.meridium }}
            </option>
          </select>
          <span>-</span>
          <select className="select max-w-[150px]">
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
                handleDeleteTimeSlot(id)
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
