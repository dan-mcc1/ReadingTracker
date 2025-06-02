// backend/src/services/openLibrary.ts
import axios from "axios";

interface OpenLibraryBook {
  key: string; // e.g. "/works/OL12345W"
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number; // cover ID for image fetching
  edition_count?: number;
  // add more fields as needed
}

export async function searchOpenLibrary(
  query: string,
  limit = 10
): Promise<OpenLibraryBook[]> {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query
  )}&limit=${limit}`;

  const response = await axios.get(url);

  // The relevant data is in `docs` array
  const docs = response.data.docs || [];

  // Map and normalize the data
  return docs.map((doc: any) => ({
    key: doc.key,
    title: doc.title,
    author_name: doc.author_name,
    first_publish_year: doc.first_publish_year,
    cover_i: doc.cover_i,
    edition_count: doc.edition_count,
  }));
}
