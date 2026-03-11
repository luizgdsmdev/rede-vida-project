import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/i18n.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import About from './components/pages/about/About.jsx';
import Location from './components/pages/location/Location.jsx';
import Requirements from './components/pages/requirements/Requirements.jsx';
import Contact from './components/pages/contact/Contact.jsx';
import Login from './components/pages/login/Login.jsx';
import DonateNow from './components/pages/donateNow/DonateNow.jsx';
import Home from './components/pages/home/Home.jsx';
import PageNotFund from './components/pages/pageNotFund/PageNotFund.jsx';

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFund />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/requirements",
        element: <Requirements />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/donate-now",
        element: <DonateNow />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={reactRouter} />
  </StrictMode>,
)