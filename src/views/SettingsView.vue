<script setup lang="ts">
import AvailabilityItem from '@/components/AvailabilityItem.vue'
import { STORAGE_KEY, useTimeslotStore } from '@/stores/timeSlots'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/16/solid'

const store = useTimeslotStore()
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

const handleToggleAllowVidCall = () => {
  store.settings = {
    ...store.settings,
    isAllowVidCall: !store.settings.isAllowVidCall,
  }
}

const handleSave = () => {
  localStorage.setItem(STORAGE_KEY.TIMESLOT, JSON.stringify(store.timeslots))
  localStorage.setItem(STORAGE_KEY.SETTINGS, JSON.stringify(store.settings))
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
          <select
            className="select select-bordered w-full max-w-xs"
            :value="store?.settings?.duration"
            v-on:change="
              (e: Event) => {
                const newVal = (e?.target as HTMLInputElement)?.value

                store.settings = {
                  ...store.settings,
                  duration: Number.parseInt(newVal, 10),
                }
              }
            "
          >
            <option v-for="option in OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="grid gap-2">
          <span class="text-sm font-semibold">No. of Booking/Session</span>
          <input
            type="number"
            placeholder="Type here"
            :value="store.settings.noOfBooking"
            v-on:change="
              (e: Event) => {
                const newVal = (e?.target as HTMLInputElement)?.value || '0'

                store.settings = {
                  ...store.settings,
                  noOfBooking: Number.parseInt(newVal, 10),
                }
              }
            "
            class="input input-bordered w-full max-w-xs"
          />
        </div>

        <div>
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                :checked="store.settings.isAllowVidCall"
                v-on:click="handleToggleAllowVidCall"
                class="checkbox"
              />
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
