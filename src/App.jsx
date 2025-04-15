import PanelLayout from '@/layout/PanelLayout/PanelLayout';
import ProductDetailPage from '@/pages/client/ProductDetailPage/ProductDetailPage';
import AuthPage from '@/pages/panel/Auth/Auth';
import MyProfile from '@/pages/panel/Profile/MyProfile/MyProfile';
import ProfileUsers from '@/pages/panel/Profile/Users/ProfileUsers';
import links from '@/routes/links';
import { Route, Routes } from 'react-router-dom';
import './index.css';

const client_pages = [
  {
    path: links.client.home,
    element: <div>Home</div>,
  },
  {
    path: links.client.auth,
    element: <AuthPage />,
  },
  {
    path: links.client.product,
    element: <ProductDetailPage />,
  },
]

const panel_pages = [
  {
    isIndex: true,
    element: <div>Home</div>,
  },
  {
    path: links.panel.profile,
    element: <MyProfile />,
  },
  {
    path: links.panel.users,
    element: <ProfileUsers />,
  }
]
 
const App = () =>  {
  const isAuth = localStorage.getItem('token') ? true : false;

    return (
        <Routes>
            {client_pages.map((page) => (
                <Route key={page.path} path={page.path} element={page.element} />
            ))}
            {isAuth && (
                <Route path="/panel" element={<PanelLayout />}>
                  {
                    panel_pages.map((page) => {
                      if (page.isIndex) {
                        return (
                          <Route key='index-panel' index element={page.element} />
                        )
                      }
                      return (
                        <Route key={page.path} path={page.path} element={page.element} />
                      )
                    })
                  }
                </Route>
            )}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
    )
}

export default App
