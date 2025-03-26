import { useState, useEffect } from "react";
import { NewsArticle } from "../App";

const STORAGE_KEY = "bookmarkedArticles";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);

  // Load bookmarks from localStorage when the hook mounts
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBookmarks(parsed);
      } catch (error) {
        console.error("Failed to parse bookmarks from localStorage", error);
      }
    }
  }, []);

  // Update localStorage whenever the bookmarks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (article: NewsArticle) => {
    if (!bookmarks.some((bm) => bm.uuid === article.uuid)) {
      setBookmarks((prev) => [...prev, article]);
    }
  };

  const removeBookmark = (article: NewsArticle) => {
    setBookmarks((prev) => prev.filter((bm) => bm.uuid !== article.uuid));
  };

  const toggleBookmark = (article: NewsArticle) => {
    if (bookmarks.some((bm) => bm.uuid === article.uuid)) {
      removeBookmark(article);
    } else {
      addBookmark(article);
    }
  };

  const isBookmarked = (article: NewsArticle) => {
    return bookmarks.some((bm) => bm.uuid === article.uuid);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
  };
}
