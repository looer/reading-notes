<!-- pages/index.vue -->
<template>
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
      Welcome to Your Reading Notes
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-400">
      Select a book from the sidebar to view your annotations
    </p>
    <div class="mt-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Quick Stats
      </h2>
      <div v-if="books" class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ books.length }}
          </p>
          <p class="text-gray-600 dark:text-gray-400">Books with Notes</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ totalAnnotations }}
          </p>
          <p class="text-gray-600 dark:text-gray-400">Total Annotations</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book } from "~/utils/parser"

const { data: books } = await useFetch<Book[]>("/api/books")

const totalAnnotations = computed(
  () =>
    books.value?.reduce((total, book) => total + book.annotations.length, 0) ??
    0
)
</script>
