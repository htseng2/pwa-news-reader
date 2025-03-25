import { useEffect } from "react";

interface InfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
}: InfiniteScrollProps) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 200; // Trigger 200px before bottom
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - scrollThreshold;

      // Auto-load if screen isn't filled
      const viewportFilled =
        document.documentElement.offsetHeight > window.innerHeight * 1.5;

      if ((nearBottom || !viewportFilled) && !loading && hasMore) {
        onLoadMore();
      }
    };

    // Initial check when content loads
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, onLoadMore]);

  // Auto-load when content doesn't fill viewport
  useEffect(() => {
    if (loading || !hasMore) return;

    const checkContentHeight = () => {
      const contentHeight = document.documentElement.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (contentHeight < viewportHeight * 1.2) {
        onLoadMore();
      }
    };

    const timeoutId = setTimeout(checkContentHeight, 500);
    return () => clearTimeout(timeoutId);
  }, [loading, hasMore, onLoadMore]);
}
