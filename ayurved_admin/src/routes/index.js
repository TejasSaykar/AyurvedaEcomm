import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const CreateCategory = lazy(() => import('../pages/Form/CreateCategory'));

const CreateProduct = lazy(() => import('../pages/Form/CreateProduct'));

const CreateCombo = lazy(() => import('../pages/Form/CreateCombos'));
const UploadBanner = lazy(() => import('../pages/Form/UploadBanner'));
const CreateOffer = lazy(() => import('../pages/Form/CreateOffer'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/create/create-category',
    title: 'Create Category',
    component: CreateCategory,
  },
  {
    path: '/create/create-product',
    title: 'Create Produt',
    component: CreateProduct,
  },
  {
    path: '/upload-banner',
    title: 'Upload Banner',
    component: UploadBanner,
  },
  {
    path: '/create-combo',
    title: 'Create Combo',
    component: CreateCombo,
  },
  {
    path: '/create-offer',
    title: 'Create Offer',
    component: CreateOffer,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
