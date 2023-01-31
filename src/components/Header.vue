<script setup lang="ts">
import { ref } from 'vue'
import Lucide from './Lucide'
import TypedText from './TypedText'

const header = ref({

});
</script>

<template>
    <header class="bg-transparent">
        <ul class="flex flex-wrap justify-end gap-2">
            <li>
                <a href="https://www.linkedin.com/" class="bg-blue-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded" target=”_blank”>
                    <Lucide icon="Linkedin" class="block mx-auto" />
                </a>
            </li>
            <li>
                <a href="https://github.com/" class="bg-gray-700 p-2 font-medium text-white inline-flex items-center space-x-2 rounded" target=”_blank”>
                    <Lucide icon="Github" class="block mx-auto" />
                </a>
            </li>
            <li>
                <a href="https://dev.to/" class="bg-blue-400 p-2 font-medium text-white inline-flex items-center space-x-2 rounded" target=”_blank”>
                    <Lucide icon="Twitter" class="block mx-auto" />
                </a>
            </li>
        </ul>
        <div class="flex justify-between items-center">
            <div>
                <div class="bg-cover bg-no-repeat rounded-full h-52 w-52" style="background-image: url(/images/pic.jpg)">
                </div>
            </div>
            <div class="grid justify-items-end">
                <h1 class="text-7xl font-extrabold">Sugito Chai</h1>
                <p class="text-xl mt-5"><TypedText /></p>
            </div>
        </div>
    </header>
</template>