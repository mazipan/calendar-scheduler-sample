<script setup lang="ts">
import { generateTimes, isInTimeRange } from '@/libs/date'
import { useTimeslotStore } from '@/stores/timeSlots'
import type { DayKey, TimeConfig } from '@/types/TimeSlot'
import { CalendarIcon } from '@heroicons/vue/16/solid'
import dayjs from 'dayjs'
const start = dayjs().day(1)
const weekDays = new Array(7).fill(start).map((d, i) => {
  const r = d.add(i, 'day')
  return {
    instance: r,
    day: r.format('ddd'),
    date: r.format('D MMM'),
    dayKey: `${i + 1}` as DayKey,
  }
})

const TIMES: TimeConfig[] = generateTimes()
const store = useTimeslotStore()
</script>

<template>
  <div class="home py-8">
    <div class="border-b py-2 w-full">
      <h1 class="text-2xl font-bold flex gap-2 items-center">
        <CalendarIcon class="size-6" /> Calendar View
      </h1>
    </div>
    <div class="border rounded-lg mt-4 p-4">
      <h2 class="text-xl font-bold">{{ dayjs().format('MMM YYYY') }}</h2>
      <div class="mt-6 relative overflow-x-auto">
        <table
          class="w-full [&_tr_td]:p-2 [&_tr_td]:border [&_tr_th]:p-2 [&_tr_th]:border [&_tr_th]:border-black"
        >
          <thead>
            <tr>
              <td class="w-[70px] bg-gray-200">&nbsp;</td>
              <td v-for="d in weekDays" :key="d.day" class="bg-gray-200">
                <p class="font-semibold">{{ d.day }}</p>
                <span>{{ d.date }}</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in TIMES" :key="`${t.time}.${t.meridium}`">
              <td class="bg-gray-200">{{ t.dayjs.format('H:mm') }}</td>
              <template v-for="d in weekDays" :key="d.day">
                <template
                  v-if="
                    store.timeslots[d.dayKey as DayKey].active &&
                    store.timeslots[d.dayKey as DayKey].slots.find((s) =>
                      isInTimeRange(t.dayjs, s.start, s.end),
                    )
                  "
                >
                  <td>
                    <span> Available </span>
                  </td>
                </template>
                <template v-else>
                  <td class="bg-red-200"></td>
                </template>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
