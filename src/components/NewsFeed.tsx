import { useRef } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNewsApi } from "../hooks/useNewsApi";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { NewsCard } from "./NewsCard";

export default function NewsFeed() {
  const { articles, loading, hasMore, setPage } = useNewsApi();
  const containerRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  return (
    <>
      <Container sx={{ pt: 12, pb: 4 }}>
        {loading && articles.length === 0 ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={4} ref={containerRef}>
              {articles.map((article, index) => (
                <NewsCard key={article.uuid || index} article={article} />
              ))}
            </Grid>
            {loading && hasMore && (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Loading 3 new articles...
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
}
