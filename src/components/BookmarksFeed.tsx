import { Container, Grid, Typography } from "@mui/material";
import { NewsCard } from "./NewsCard";
import { useBookmarks } from "../hooks/useBookmarks";

export default function BookmarksFeed() {
  const { bookmarks } = useBookmarks();

  return (
    <Container sx={{ pt: 12, pb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Saved Articles ({bookmarks.length})
      </Typography>
      <Grid container spacing={4}>
        {bookmarks.map((article, index) => (
          <NewsCard key={article.uuid || index} article={article} />
        ))}
      </Grid>
      {bookmarks.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No bookmarked articles yet. Start saving stories from the main feed!
        </Typography>
      )}
    </Container>
  );
}
