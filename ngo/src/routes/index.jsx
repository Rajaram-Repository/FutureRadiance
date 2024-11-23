import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Layout from "../component/layout_1/layout/Layout";
import ErrorPage from "../ErrorPage";
import { getNavList } from "../store/auth/AuthService";

import { HomePage, ContactPage } from "./lazy";

const componentMapping = {
  home: {
    path: "/home",
    component: <HomePage />,
  },
  contact: {
    path: "/contact",
    component: <ContactPage />,
  },
};

const generateRoutes = async () => {
  try {
    const data = await getNavList({});

    const dynamicRoutes = data
      .map((routeName) => {
        const routeInfo = componentMapping[routeName];
        if (!routeInfo) {
          console.error(`No component found for route: ${routeName}`);
          return null;
        }
        return {
          path: routeInfo.path,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              {routeInfo.component}
            </Suspense>
          ),
        };
      })
      .filter(Boolean);
    // return dynamicRoutes;  //if Home page not for all means uncomment and use this.
    return [
      ...dynamicRoutes,
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {componentMapping?.home?.component}
          </Suspense>
        ),
      },
    ];
  } catch (err) {
    console.error("Error fetching routes:", err);
    return [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <div>Not Found</div>
          </Suspense>
        ),
      },
    ];
  }
};

export const router = async () => {
  const routes = await generateRoutes();

  return createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading Layout...</div>}>
          <Layout />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<div>Loading Error Page...</div>}>
          <ErrorPage />
        </Suspense>
      ),
      children: routes,
    },
  ]);
};
