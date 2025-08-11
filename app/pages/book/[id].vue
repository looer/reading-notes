<!-- pages/book/[id].vue -->
<template>
  <div v-if="book" class="max-w-4xl mx-auto">
    <header class="mb-20">
      <h1 class="text-3xl font-bold mb-2 text-center font-serif">
        {{ book.title }}
      </h1>
      <p class="text-xl opacity-75 text-center">by {{ book.author }}</p>
    </header>

    <div class="space-y-12">
      <div
        v-for="annotation in book.annotations"
        :key="annotation.identifier"
        :id="annotation.identifier"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all group"
        :class="{
          'ring-2 ring-primary': route.hash === `#${annotation.identifier}`,
        }">
        <div class="card-body">
          <blockquote class="text-2xl font-serif leading-relaxed">
            <IconsQuote class="w-8 h-8 opacity-50 sm:m-6" />
            <p class="mx-auto py-6 sm:px-12 whitespace-pre-line text-pretty">
              {{ annotation.text }}
            </p>
            <IconsQuote
              class="w-8 h-8 opacity-50 ml-auto sm:mr-6 sm:mb-6 rotate-180" />
          </blockquote>

          <div class="card-actions justify-between items-center opacity-50">
            <div class="pl-12">
              {{ new Date(annotation.date).toLocaleString() }}
            </div>

            <div class="">
              <button
                class="btn btn-ghost sm:opacity-0 group-hover:opacity-100 transition-opacity"
                @click="copyAnnotation(annotation, book)">
                <div class="tooltip" data-tip="Copy">
                  <span class="sr-only">Copy</span>
                  <IconsCopy class="w-6 h-6" />
                </div>
              </button>
              <button
                class="btn btn-ghost sm:opacity-0 group-hover:opacity-100 transition-opacity"
                @click="tweetAnnotation(annotation, book)">
                <div class="tooltip" data-tip="Tweet">
                  <span class="sr-only">Tweet</span>
                  <IconsXLogo class="w-6 h-6" />
                </div>
              </button>
              <button
                class="btn btn-ghost"
                @click="favoriteAnnotation(annotation, book)">
                <div
                  v-if="isFavorite"
                  class="tooltip"
                  data-tip="Mark as favorite">
                  <span class="sr-only">Mark as favorite</span>
                  <IconsStarFavorite
                    class="w-6 h-6 sm:opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div v-else class="tooltip" data-tip="Unmark as favorite">
                  <span class="sr-only">Unmark as favorite</span>
                  <IconsStar class="w-6 h-6 opacity-100" />
                </div>
              </button>
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
      viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Book not found</span>
  </div>
</template>

<script setup lang="ts">
import type { Book, Annotation } from "~/utils/parser"

const route = useRoute()
const { data: books, pending: isPending } = await useFetch<Book[]>("/api/books")

const book = computed(() =>
  books.value?.find((b) => b.slug === route.params.id)
)

const isFavorite = ref(false) // TODO: get from local storage

const tweetAnnotation = (annotation: Annotation, book: Book) => {
  const url = new URL("https://twitter.com/intent/tweet")
  const tweetText = formatAnnotation(annotation, book)
  url.searchParams.set("text", tweetText)
  window.open(url.toString(), "_blank")
}

const copyAnnotation = (annotation: Annotation, book: Book) => {
  navigator.clipboard.writeText(formatAnnotation(annotation, book))
}

const favoriteAnnotation = (annotation: Annotation, book: Book) => {
  isFavorite.value = !isFavorite.value
}

const formatAnnotation = (annotation: Annotation, book: Book) => {
  return `${annotation.text}\n\n- ${book.author}, ${book.title}`
}

// Scroll to annotation if hash is present
onMounted(() => {
  if (route.hash) {
    nextTick(() => {
      const element = document.querySelector(route.hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    })
  }
})
</script>
