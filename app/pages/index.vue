<!-- pages/index.vue -->
<template>
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl font-bold mb-4 font-serif">
      Welcome to Your Reading Notes
    </h1>
    <p class="text-xl">
      Select a book from the sidebar to view your annotations
    </p>
    <div class="mt-8 p-8 bg-base-100 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">Quick Stats</h2>
      <div v-if="books" class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-base-200 rounded-lg">
          <p class="text-3xl font-bold">
            {{ books.length }}
          </p>
          <p class="text-gray-600 dark:text-gray-400">Books with Notes</p>
        </div>
        <div class="p-4 bg-base-200 rounded-lg">
          <p class="text-3xl font-bold">
            {{ totalAnnotations }}
          </p>
          <p class="text-gray-600 dark:text-gray-400">Total Annotations</p>
        </div>
      </div>
    </div>
    <div class="p-4 bg-base-200 rounded-lg">
      <div class="flex gap-4 justify-center flex-wrap">
        <button class="btn btn-primary btn-wide" @click="getRandomBook">
          Get a random book
        </button>
        <button class="btn btn-success btn-wide" @click="getRandomNote">
          Get a random note
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book } from "~/utils/parser"
const router = useRouter()
const { data: books } = await useFetch<Book[]>("/api/books")

const totalAnnotations = computed(
  () =>
    books.value?.reduce((total, book) => total + book.annotations.length, 0) ??
    0
)

const getRandomBook = () => {
  const randomBook =
    books.value?.[Math.floor(Math.random() * books.value.length)]
  if (randomBook) {
    router.push(`/book/${randomBook.slug}`)
  }
}

const getRandomNote = () => {
  const randomBook =
    books.value?.[Math.floor(Math.random() * books.value.length)]
  const randomAnnotation =
    randomBook?.annotations[
      Math.floor(Math.random() * randomBook.annotations.length)
    ]
  if (randomBook && randomAnnotation) {
    router.push(`/book/${randomBook.slug}#${randomAnnotation.identifier}`)
  }
}
</script>
