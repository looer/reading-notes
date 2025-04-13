<!-- components/BookList.vue -->
<template>
  <nav class="menu p-4">
    <div v-if="pending" class="flex justify-center p-4">
      <span class="loading loading-spinner loading-md"></span>
    </div>
    <div v-else-if="error" class="p-4 text-error">Failed to load books</div>
    <template v-else>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <label class="input">
            <svg
              class="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              class="grow"
              placeholder="Search"
              v-model="search"
            />
            <kbd class="kbd kbd-sm">⌘</kbd>
            <kbd class="kbd kbd-sm">K</kbd>
          </label>
        </div>
        <div class="flex gap-2">
          <fieldset class="fieldset w-full">
            <!-- <legend class="fieldset-legend">Sort by:</legend> -->
            <select id="sort" v-model="sortBy" class="select select-bordered">
              <option value="annotations">Sort by annotations</option>
              <option value="title">Sort by title</option>
              <option value="author">Sort by author</option>
              <option value="date">Sort by date</option>
            </select>
          </fieldset>
        </div>
      </div>

      <NuxtLink
        v-for="book in sortedBooks"
        :key="book.fileName"
        :to="`/book/${book.fileName}`"
        class="card card-compact mb-2 hover:bg-base-200 transition-all"
        :class="{ 'bg-base-200': route.params.id === book.fileName }"
      >
        <div class="card-body">
          <h3 class="card-title text-base">{{ book.title }}</h3>
          <p class="text-sm opacity-75">{{ book.author }}</p>
          <p class="text-xs opacity-60 badge badge-neutral">
            {{ book.annotations.length }} annotations
          </p>
        </div>
      </NuxtLink>
    </template>
  </nav>
</template>

<script setup lang="ts">
import type { Book } from "~/utils/parser"

const { pending, data: books, error } = await useFetch<Book[]>("/api/books")
const route = useRoute()

const search = ref("")
const sortBy = ref("annotations")

const filteredBooks = computed(() => {
  return (books.value ?? []).filter((book) => {
    return (
      book.title.toLowerCase().includes(search.value.toLowerCase()) ||
      book.author.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

const sortedBooks = computed(() => {
  return filteredBooks.value.sort((a: Book, b: Book) => {
    if (sortBy.value === "title") {
      return a.title.localeCompare(b.title)
    } else if (sortBy.value === "author") {
      return a.author.localeCompare(b.author)
    } else if (sortBy.value === "date") {
      return (
        new Date(b.annotations[0]?.date || 0).getTime() -
        new Date(a.annotations[0]?.date || 0).getTime()
      )
    } else {
      return b.annotations.length - a.annotations.length
    }
  })
})
</script>
