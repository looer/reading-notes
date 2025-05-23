import { parseStringPromise } from 'xml2js';
import { promises as fs } from 'fs';
import path from 'path';

const ANNOTATIONS_DIR = process.env.ANNOTATIONS_DIR || 'annotations'
export interface Annotation {
    identifier: string;
    date: string;
    text: string;
}

export interface Book {
    title: string;
    author: string;
    language: string;
    annotations: Annotation[];
    fileName: string;
}

export async function parseAnnotationFile(filePath: string): Promise<Book> {
    const content = await fs.readFile(filePath, 'utf-8');
    const result = await parseStringPromise(content);
    const annotationSet = result.annotationSet;

    const book: Book = {
        title: annotationSet.publication[0]['dc:title'][0],
        author: annotationSet.publication[0]['dc:creator'][0],
        language: annotationSet.publication[0]['dc:language'][0],
        annotations: [],
        fileName: path.basename(filePath, '.epub.annot')
    };

    if (annotationSet.annotation) {
        book.annotations = annotationSet.annotation.map((annotation: any) => ({
            identifier: annotation['dc:identifier'][0],
            date: new Date(annotation['dc:date'][0]).toISOString(),
            text: annotation.target[0].fragment[0].text[0]
        })).sort((a: Annotation, b: Annotation) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return book;
}

export async function getAllBooks(): Promise<Book[]> {
    const annotationsDir = path.join(process.cwd(), 'data', ANNOTATIONS_DIR);
    const files = await fs.readdir(annotationsDir);
    const annotationFiles = files.filter(file => file.endsWith('.epub.annot'));

    const books = await Promise.all(
        annotationFiles.map(file =>
            parseAnnotationFile(path.join(annotationsDir, file))
        )
    );

    return books;
} 