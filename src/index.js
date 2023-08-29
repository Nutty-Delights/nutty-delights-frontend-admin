import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Categories from './Pages/Categories';
import Orders from './Pages/Orders';
import Payments from './Pages/Payments';
import Products from './Pages/Products';
import APIs from './Pages/APIs';

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'payments',
        element: <Payments />,
      },
      {
        path: 'Products',
        element: <Products />,
      },
      {
        path: 'apis',
        element: <APIs />,
      }
    ]
  },


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}

    <RouterProvider router={router} />

    {/* </Provider> */}
  </React.StrictMode>
);

