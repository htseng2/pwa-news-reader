import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Typography,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { NewsArticle } from "../App";

const API_KEY = "vP9wOFQL8xVt541veHr0K23h1SHcyP8vJl8EOwJ3";

export default function NewsFeed() {
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

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            News Reader
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ pt: 12, pb: 4 }}>
        {loading && articles.length === 0 ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {articles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open(article.url, "_blank")}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={article.image_url || "/fallback-news.png"}
                      alt={article.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        {article.source} •{" "}
                        {new Date(article.published_at).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
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
