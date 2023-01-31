<script setup lang="ts">
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="flex justify-center content-center">
    <div class="border border-gray-300 rounded-md shadow-lg py-10 px-10 w-4/5 mt-10 mb-10">
      <Header />
      <Main />
      <Footer />
    </div>
  </div>
</template>