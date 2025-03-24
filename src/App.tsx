import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import NewsFeed from "./components/NewsFeed";

// Define TypeScript interface for news articles
export interface NewsArticle {
  uuid: string;
  title: string;
  description: string;
  image_url: string;
  url: string;
  published_at: string;
  source: string;
  categories: string[];
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle redirects from 404.html page
  useEffect(() => {
    // Check if coming from the 404 redirect with path param
    const query = new URLSearchParams(location.search);
    const path = query.get("path");

    if (path) {
      // Remove the query parameter and navigate to the path
      navigate(path, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<NewsFeed />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
