<script setup lang="ts">
import AvailabilityItem from '@/components/AvailabilityItem.vue'
import { STORAGE_KEY, useTimeslotStore } from '@/stores/timeSlots'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/16/solid'
import { onMounted } from 'vue'

const store = useTimeslotStore()
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
    value: `${index + 1}`,
    label: i,
  }
})

const handleSave = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.timeslots))
}
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
          <input type="number" placeholder="Type here" class="input w-full max-w-xs" />
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

      <div class="border rounded-lg my-4 p-4">
        <h2 class="text-lg font-bold flex gap-2 items-center">Availability</h2>
        <span class="text-gray-500">Set your weekly recurring schedule</span>
        <div>
          <AvailabilityItem
            v-for="day in DAYS"
            :key="`${day.value.toString()}`"
            :text="day.label"
            :value="day.value.toString()"
            :isLeaf="day.label === 'Sun'"
          />
        </div>
      </div>

      <button class="btn btn-neutral" v-on:click="handleSave">Save</button>
    </div>
  </div>
</template>
