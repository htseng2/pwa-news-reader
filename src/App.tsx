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
  return <NewsFeed />;
}

export default App;
