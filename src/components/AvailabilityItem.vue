<script setup lang="ts">
import { DocumentDuplicateIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const timeSlots = ref<string[]>([nanoid()])

const checked = defineModel<boolean>('checked')
const { text, value, isLeaf } = defineProps<{ text: string; value: string; isLeaf: boolean }>()
type Time = {
  time: string
  meridium: 'am' | 'pm'
}
const TIMES: Time[] = [
  { time: '7', meridium: 'am' },
  { time: '8', meridium: 'am' },
  { time: '9', meridium: 'am' },
  { time: '10', meridium: 'am' },
  { time: '11', meridium: 'am' },
  { time: '12', meridium: 'am' },
  { time: '1', meridium: 'pm' },
  { time: '2', meridium: 'pm' },
  { time: '3', meridium: 'pm' },
  { time: '4', meridium: 'pm' },
  { time: '5', meridium: 'pm' },
  { time: '6', meridium: 'pm' },
  { time: '7', meridium: 'pm' },
].reduce((acc, curr) => {
  if (curr) {
    const minutes = ['00', '15', '30', '45']
    if (curr.meridium === 'pm' && curr.time === '7') {
      const t = {
        time: `${curr.time}:00`,
        meridium: curr.meridium,
      } as Time

      acc = [...acc, t]
    } else {
      const withMinutes: Time[] = minutes.map((m) => {
        return {
          time: `${curr.time}:${m}`,
          meridium: curr.meridium,
        } as Time
      })
      acc = [...acc, ...withMinutes]
    }
  }

  return acc
}, [] as Time[])

const handleAddNewTimeSlot = () => {
  timeSlots.value = [...timeSlots.value, nanoid()]
}

const handleDeleteTimeSlot = (id: string) => {
  if (timeSlots.value.length > 1) {
    timeSlots.value = timeSlots.value.filter((i) => i !== id)
  }
}
</script>

<template>
  <div :class="`availability py-4 flex gap-2 items-start ${!isLeaf && 'border-b'}`">
    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-2">
        <input type="checkbox" v-model="checked" class="checkbox" :value="value" />
        <span class="label-text">{{ text }}</span>

        <template v-if="!checked">
          <span class="text-gray-400">Unavailable</span>
        </template>
      </label>
    </div>
    <template v-if="checked">
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
