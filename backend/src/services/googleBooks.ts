// backend/src/services/googleBooks.ts
import axios from "axios";

interface GoogleBook {
  id: string;
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  thumbnail?: string;
  infoLink?: string;
}

export async function searchGoogleBooks(
  query: string,
  maxResults = 10
): Promise<GoogleBook[]> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Missing GOOGLE_API_KEY in environment variables");
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=${maxResults}&key=${process.env.GOOGLE_API_KEY}`;

  const response = await axios.get(url);

  const items = response.data.items || [];

  // Map and normalize the data
  return items.map((item: any) => {
    const volumeInfo = item.volumeInfo || {};
    return {
      id: item.id,
      title: volumeInfo.title,
      authors: volumeInfo.authors,
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      thumbnail: volumeInfo.imageLinks?.thumbnail,
      infoLink: volumeInfo.infoLink,
    };
  });
}
