<script setup lang="ts">
import LeftPane from './LeftPane.vue'
import RightPane from './RightPane.vue'
</script>

<template>
        <main class="flex gap-x-10 mt-10">
            <div class="w-2/6">
                <LeftPane />
            </div>
            <!-- info -->
            <div class="w-4/6">
                <RightPane />
            </div>
        </main>
</template>