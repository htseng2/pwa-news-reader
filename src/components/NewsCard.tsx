import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { NewsArticle } from "../App";
import { ImageWithFallback } from "./ImageWithFallback";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useBookmarks } from "../hooks/useBookmarks";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => window.open(article.url, "_blank")}
      >
        <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(article);
            }}
            color="primary"
          >
            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
        <ImageWithFallback src={article.image_url} alt={article.title} />
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
  );
}
