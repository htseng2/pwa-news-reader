import { useState } from "react";
import { Box, CardMedia, Skeleton, Typography } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
}

export const ImageWithFallback = ({ src, alt }: ImageWithFallbackProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {!isLoaded && !hasError && (
        <Skeleton variant="rectangular" width="100%" height={200} />
      )}

      {hasError ? (
        <Box
          sx={{
            height: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.200",
            p: 2,
          }}
        >
          <ImageNotSupportedIcon color="error" fontSize="large" />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Image not available
          </Typography>
        </Box>
      ) : (
        <CardMedia
          component="img"
          height="200"
          image={src}
          alt={alt}
          sx={{
            objectFit: "cover",
            display: isLoaded ? "block" : "none",
          }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </>
  );
};
