import ProductDetailPage from '@/pages/client/ProductDetailPage/ProductDetailPage';
import AuthContainer from '@/pages/panel/Auth/Auth';
import MyProfile from '@/pages/panel/Profile/MyProfile/MyProfile';
import ProfileUsers from '@/pages/panel/Profile/Users/ProfileUsers';
import { Route, Routes } from 'react-router-dom';
import './index.css';

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
