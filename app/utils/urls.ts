import type { Book, Annotation } from './parser'

/**
 * Generate a clean URL for a book using its slug
 */
export function getBookUrl(book: Book): string {
  return `/book/${book.slug}`
}

/**
 * Generate a URL for a specific annotation within a book
 */
export function getAnnotationUrl(book: Book, annotation: Annotation): string {
  return `/book/${book.slug}#${annotation.identifier}`
}

/**
 * Get a random book from a list of books
 */
export function getRandomBook(books: Book[]): Book | null {
  if (!books.length) return null
  const randomIndex = Math.floor(Math.random() * books.length)
  const randomBook = books[randomIndex]
  return randomBook || null
}

/**
 * Get a random annotation from all books
 */
export function getRandomAnnotation(books: Book[]): { book: Book; annotation: Annotation } | null {
  const randomBook = getRandomBook(books)
  if (!randomBook) return null

  const randomAnnotationIndex = Math.floor(Math.random() * randomBook.annotations.length)
  const randomAnnotation = randomBook.annotations[randomAnnotationIndex]
  if (!randomAnnotation) return null

  return { book: randomBook, annotation: randomAnnotation }
}