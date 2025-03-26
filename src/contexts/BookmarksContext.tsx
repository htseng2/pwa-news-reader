import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { NewsArticle } from "../App";

const STORAGE_KEY = "bookmarkedArticles";

interface BookmarksContextType {
  bookmarks: NewsArticle[];
  addBookmark: (article: NewsArticle) => void;
  removeBookmark: (article: NewsArticle) => void;
  toggleBookmark: (article: NewsArticle) => void;
  isBookmarked: (article: NewsArticle) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(
  undefined
);

/**
 * Loads bookmarks from localStorage
 */
const loadBookmarks = (): NewsArticle[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.every((item) => "uuid" in item)) {
      return parsed;
    } else {
      console.warn("Invalid bookmark data structure in localStorage");
      return [];
    }
  } catch (error) {
    console.error("Failed to parse bookmarks from localStorage", error);
    return [];
  }
};

/**
 * Saves bookmarks to localStorage
 */
const saveBookmarks = (bookmarks: NewsArticle[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Failed to save bookmarks to localStorage", error);
  }
};

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>(() =>
    loadBookmarks()
  );

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    saveBookmarks(bookmarks);
  }, [bookmarks]);

  /**
   * Adds a news article to bookmarks if it doesn't already exist
   */
  const addBookmark = (article: NewsArticle) => {
    if (!bookmarks.some((bm) => bm.uuid === article.uuid)) {
      setBookmarks((prev) => [...prev, article]);
    }
  };

  /**
   * Removes a news article from bookmarks by uuid
   */
  const removeBookmark = (article: NewsArticle) => {
    setBookmarks((prev) => prev.filter((bm) => bm.uuid !== article.uuid));
  };

  /**
   * Toggles bookmark status: adds if not bookmarked, removes if already bookmarked
   */
  const toggleBookmark = (article: NewsArticle) => {
    if (bookmarks.some((bm) => bm.uuid === article.uuid)) {
      removeBookmark(article);
    } else {
      addBookmark(article);
    }
  };

  /**
   * Checks if a news article is already bookmarked
   */
  const isBookmarked = (article: NewsArticle) => {
    return bookmarks.some((bm) => bm.uuid === article.uuid);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}
