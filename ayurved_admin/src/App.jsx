import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/Products';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import Category from './pages/Dashboard/Category';
import UpdateProduct from './pages/Form/UpdateProduct';
import UpdateCategory from './pages/Form/UpdateCategory';
import Orders from './pages/Dashboard/Orders';
import Banner from './pages/Dashboard/Banner';
import Combos from './pages/Dashboard/Combos';
import CreateCombos from './pages/Form/CreateCombos';
import PopupData from './pages/Dashboard/PopupData';
import Newsletters from './pages/Dashboard/Newsletters';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const login = false;

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </>
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          <Route path="/category" element={<Category />} />
          <Route
            path="/update-product/:id"
            element={
              <IsAdmin>
                <UpdateProduct />
              </IsAdmin>
            }
          />
          <Route
            path="/update-category/:id"
            element={
              <IsAdmin>
                <UpdateCategory />
              </IsAdmin>
            }
          />
          <Route
            path="/orders"
            element={
              <IsAdmin>
                <Orders />
              </IsAdmin>
            }
          />
          <Route
            path="/banner"
            element={
              <IsAdmin>
                <Banner />
              </IsAdmin>
            }
          />
          <Route
            path="/combos"
            element={
              <IsAdmin>
                <Combos />
              </IsAdmin>
            }
          />
          <Route
            path="/popup"
            element={
              <IsAdmin>
                <PopupData />
              </IsAdmin>
            }
          />
          <Route
            path="/newsletters"
            element={
              <IsAdmin>
                <Newsletters />
              </IsAdmin>
            }
          />
          {/* <Route path="/create-combo" element={<CreateCombos />} /> */}
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <IsAdmin>
                      <Component />
                    </IsAdmin>
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export function IsAdmin(props) {
  if (localStorage.getItem('isAdmin')) {
    return props.children;
  } else {
    return <Navigate to={'/auth/signin'} />;
  }
}

export default App;
