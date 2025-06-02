// utils/mergeBookResults.ts

export function mergeResults(openLibResults: any[], googleResults: any[]) {
  const normalized = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .trim();

  const mergedMap = new Map<string, any>();

  // Helper to create a key for each book
  const createKey = (title: string, author: string) =>
    `${normalized(title)}::${normalized(author)}`;

  // First, add all Open Library books to the map
  for (const olBook of openLibResults) {
    const title = olBook.title;
    const author = olBook.author_name?.[0] || "";
    const key = createKey(title, author);

    mergedMap.set(key, {
      title,
      authors: olBook.author_name,
      description: null,
      thumbnail: olBook.cover_i
        ? `https://covers.openlibrary.org/b/id/${olBook.cover_i}-M.jpg`
        : null,
      publishedDate: olBook.first_publish_year,
      infoLink: `https://openlibrary.org${olBook.key}`,
      source: "openlibrary",
    });
  }

  // Then, merge or add Google Books results
  for (const gbBook of googleResults) {
    const title = gbBook.title;
    const author = gbBook.authors?.[0] || "";
    const key = createKey(title, author);

    if (mergedMap.has(key)) {
      // Merge with existing Open Library book info
      const existing = mergedMap.get(key);
      mergedMap.set(key, {
        title: gbBook.title || existing.title,
        authors: gbBook.authors || existing.authors,
        description: gbBook.description || existing.description,
        thumbnail: gbBook.thumbnail || existing.thumbnail,
        publishedDate: gbBook.publishedDate || existing.publishedDate,
        infoLink: gbBook.infoLink || existing.infoLink,
        source: "merged",
      });
    } else {
      // Add Google Books-only book
      mergedMap.set(key, {
        title: gbBook.title,
        authors: gbBook.authors,
        description: gbBook.description || null,
        thumbnail: gbBook.thumbnail || null,
        publishedDate: gbBook.publishedDate || null,
        infoLink: gbBook.infoLink || null,
        source: "googlebooks",
      });
    }
  }

  // Return the merged and deduplicated books as an array
  return Array.from(mergedMap.values());
}
