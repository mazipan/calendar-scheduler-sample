<script setup lang="ts">
import AvailabilityItem from '@/components/AvailabilityItem.vue'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/16/solid'

const checks = defineModel<Record<string, boolean>>({
  default: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
  },
})

const isAllow = defineModel<boolean>('isAllow')
const duration = defineModel<string>('duration')
const OPTIONS = ['15', '30', '45', '60', '90'].map((i) => {
  return {
    value: i,
    label: `${i} min`,
  }
})

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((i, index) => {
  return {
    value: `${index}`,
    label: i,
  }
})
</script>

<template>
  <div class="settings py-8">
    <div class="border-b py-2 w-full">
      <h1 class="text-2xl font-bold flex gap-2 items-center">
        <AdjustmentsHorizontalIcon class="size-6" /> Manage Booking Slot
      </h1>
    </div>

    <div class="border rounded-lg mt-4 p-4">
      <form class="space-y-4">
        <div class="grid gap-2">
          <span class="text-sm font-semibold">Visit Duration</span>
          <select className="select w-full max-w-xs" :model="duration">
            <option v-for="option in OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="grid gap-2">
          <span class="text-sm font-semibold">No. of Booking/Session</span>
          <input type="text" placeholder="Type here" class="input w-full max-w-xs" />
        </div>

        <div>
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" :checked="isAllow" class="checkbox" />
              <span class="label-text">Allow video tour call</span>
            </label>
          </div>
        </div>
      </form>

      <div class="border rounded-lg mt-4 p-4">
        <h2 class="text-lg font-bold flex gap-2 items-center">Availability</h2>
        <span>Set your weekly recurring schedule</span>
        <div>
          <AvailabilityItem
            v-for="day in DAYS"
            :key="`${day.value}${checks[day.value]}`"
            :text="day.label"
            :value="day.value"
            :checked="checks[day.value]"
            :isLeaf="day.label === 'Sun'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
