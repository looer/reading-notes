import { getAllBooks } from '~/utils/parser';

export default defineEventHandler(async (event) => {
    try {
        const books = await getAllBooks();
        return books;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to load books',
        });
    }
}); 