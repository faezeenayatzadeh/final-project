import { Route, Routes } from 'react-router-dom';
import './index.css';
import AuthContainer from './pages/Auth/Auth';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import MyProfile from './pages/Profile/MyProfile/MyProfile';
import ProfileUsers from './pages/Profile/Users/ProfileUsers';

const App = () =>  {
  const isAuth = localStorage.getItem('token') ? true : false;

    return (
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/auth" element={<AuthContainer />} />
            {isAuth && (
              <Route path="/panel">
                <Route index element={<div>panel</div>} />
                <Route path="profile" element={<MyProfile />} />
                <Route path="users" element={<ProfileUsers />} />
              </Route>
            )}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
    )
}

export default App
