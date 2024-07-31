import { Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import ArticleDetails from "./pages/article/ArticleDetails";

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<ArticleDetails />} />
      </Routes>
    </div>
  );
}

export default App;
