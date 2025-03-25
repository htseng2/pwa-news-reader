import { Card, CardContent, Grid, Typography } from "@mui/material";
import { NewsArticle } from "../App";
import { ImageWithFallback } from "./ImageWithFallback";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() => window.open(article.url, "_blank")}
      >
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
