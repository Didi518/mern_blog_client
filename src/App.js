import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import BlogPage from './pages/blog/BlogPage';
import HomePage from './pages/home/HomePage';
import Admin from './pages/admin/screens/Admin';
import LoginPage from './pages/login/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import ProfilePage from './pages/profile/ProfilePage';
import Users from './pages/admin/screens/users/Users';
import RegisterPage from './pages/register/RegisterPage';
import EditPost from './pages/admin/screens/posts/EditPost';
import Comments from './pages/admin/screens/comments/Comments';
import ManagePosts from './pages/admin/screens/posts/ManagePosts';
import ArticleDetailsPage from './pages/article/ArticleDetailsPage';
import Categories from './pages/admin/screens/categories/Categories';
import EditCategory from './pages/admin/screens/categories/EditCategory';

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
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
