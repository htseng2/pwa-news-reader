import { useState, useEffect } from "react";
import { NewsArticle } from "../App";

const API_KEY = "vP9wOFQL8xVt541veHr0K23h1SHcyP8vJl8EOwJ3";

export function useNewsApi() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&language=en&limit=3&page=${page}`
        );
        const data = await response.json();

        if (data.error) {
          console.error("API Error:", data.error.message);
          return;
        }

        if (data.data?.length === 0) {
          setHasMore(false);
        } else {
          const articles = data.data || [];
          setArticles((prev) =>
            page === 1 ? articles : [...prev, ...articles]
          );
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  return {
    articles,
    loading,
    hasMore,
    setPage,
  };
}
