import { useState } from "react";
import API from "../api/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { title: string; authors: string[] }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    event?.preventDefault();
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/books/search", {
        params: { q: query },
      });
      setResults(res.data.data); // Use merged results
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-[var(--primary-color)]">
        Search Books
      </h2>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-[var(--tertiary-color)] text-[var(--primary-color)] rounded px-4 py-2 w-72"
        />
        <button
          onClick={handleSearch}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Results */}
      <ul className="space-y-2 w-full max-w-2/3">
        {loading ? (
          <p className="text-[var(--primary-color)] flex flex-col items-center">
            Loading...
          </p>
        ) : results && results.length > 0 ? (
          results.map((book, idx) => (
            <li
              key={idx}
              className="border-b pb-2 flex space-x-2  items-center"
            >
              <span className="font-semibold text-[var(--primary-color)]">
                {book.title}
              </span>
              <br />
              <span className="text-sm text-[var(--tertiary-color)]">
                by {book.authors?.join(", ") || "Unknown Author"}
              </span>
            </li>
          ))
        ) : (
          <p className="text-[var(--primary-color)] flex flex-col items-center">
            No results found
          </p>
        )}
      </ul>
    </div>
  );
}
