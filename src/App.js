import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Admin from "./pages/admin/screens/Admin";
import AdminLayout from "./pages/admin/AdminLayout";
import ArticleDetailsPage from "./pages/article/ArticleDetailsPage";
import Categories from "./pages/admin/screens/categories/Categories";
import Comments from "./pages/admin/screens/comments/Comments";
import EditCategory from "./pages/admin/screens/categories/EditCategory";
import EditPost from "./pages/admin/screens/posts/EditPost";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import ProfilePage from "./pages/profile/ProfilePage";
import RegisterPage from "./pages/register/RegisterPage";
import Users from "./pages/admin/screens/users/Users";

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailsPage />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="commentaires" element={<Comments />} />
          <Route path="articles/gestion" element={<ManagePosts />} />
          <Route
            path="articles/gestion/modifier/:slug"
            element={<EditPost />}
          />
          <Route path="categories/gestion" element={<Categories />} />
          <Route
            path="categories/gestion/modifier/:slug"
            element={<EditCategory />}
          />
          <Route path="utilisateurs/gestion" element={<Users />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
