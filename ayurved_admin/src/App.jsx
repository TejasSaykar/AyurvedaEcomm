import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/Products';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import EditNews from './pages/Dashboard/Category';
import UpdateProduct from './pages/Form/UpdateProduct';
import UpdateCategory from './pages/Form/UpdateCategory';
import Orders from './pages/Dashboard/Orders';
import Banner from './pages/Dashboard/Banner';
import Combos from './pages/Dashboard/Combos';
import CreateCombos from './pages/Form/CreateCombos';
import PopupData from './pages/Dashboard/PopupData';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          <Route path="/category" element={<EditNews />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/combos" element={<Combos />} />
          <Route path="/popup" element={<PopupData />} />
          {/* <Route path="/create-combo" element={<CreateCombos />} /> */}
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
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

export default App;
