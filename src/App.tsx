import NewsFeed from "./components/NewsFeed";

// Define TypeScript interface for news articles
export interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

function App() {
  return <NewsFeed />;
}

export default App;
