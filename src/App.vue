<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Logo from './assets/logo.svg'
</script>

<template>
  <header
    class="fixed left-0 top-0 z-30 h-[65px] w-full transform border-b transition-all duration-500 flex items-center bg-white"
  >
    <div class="container mx-auto">
      <nav class="flex items-end justify-between gap-4">
        <img :src="Logo" alt="Logo" height="50" width="auto" class="h-[40px]" />
        <div class="flex items-center gap-4">
          <RouterLink
            to="/"
            class="py-2 px-4 hover:bg-green-100 border-b-4 border-white"
            activeClass="!border-green-400 text-green-400"
            >Home</RouterLink
          >
          <RouterLink
            to="/settings"
            class="py-2 px-4 hover:bg-green-100 border-b-4 border-white"
            activeClass="!border-green-400 text-green-400"
            >Settings</RouterLink
          >
        </div>
      </nav>
    </div>
  </header>
  <main class="mt-[65px] container mx-auto min-h-[calc(100vh-100px)]">
    <RouterView />
  </main>
  <footer class="container mx-auto py-8 text-center">
    <small class="text-gray-600">
      © 2024, All rights reserved. By
      <a href="https://mazipan.space" class="hover:underline text-green-400">Irfan Maulana</a>
    </small>
  </footer>
</template>
