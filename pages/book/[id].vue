<!-- pages/book/[id].vue -->
<template>
  <div v-if="book" class="max-w-4xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ book.title }}</h1>
      <p class="text-xl opacity-75">by {{ book.author }}</p>
    </header>

    <div class="space-y-8">
      <div
        v-for="annotation in book.annotations"
        :key="annotation.identifier"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
      >
        <div class="card-body">
          <blockquote class="text-2xl font-serif leading-relaxed">
            "{{ annotation.text }}"
          </blockquote>
          <div class="card-actions justify-end">
            <div class="badge badge-neutral">
              {{ new Date(annotation.date).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="isPending" class="flex justify-center items-center h-64">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  <div v-else class="alert alert-error">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>Book not found</span>
  </div>
</template>

<script setup lang="ts">
import type { Book } from "~/utils/parser"

const route = useRoute()
const { data: books, pending: isPending } = await useFetch<Book[]>("/api/books")

const book = computed(() =>
  books.value?.find((b) => b.fileName === route.params.id)
)

const tweetAnnotation = (annotation: Annotation, book: Book) => {
  const url = new URL("https://twitter.com/intent/tweet")
  const tweetText = `${annotation.text}\n\n- ${book.author}, ${book.title}`
  url.searchParams.set("text", tweetText)
  window.open(url.toString(), "_blank")
  //   <a class="twitter-share-button"
  //   href="https://twitter.com/intent/tweet?text=Hello%20world"
  //   data-size="large">
  // Tweet</a>
}

const copyAnnotation = (annotation: Annotation) => {
  navigator.clipboard.writeText(annotation.text)
}
</script>
