import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Layout from "../component/layout_1/layout/Layout";
import ErrorPage from "../ErrorPage";
import { getNavList } from "../store/auth/AuthService";
import { componentMapping } from "./ComponentMapping";

const generateRoutes = async (dispatch) => {
  try {
    const data = await dispatch(getNavList({}));
    console.log("ppppppppppppppppppppppppppppppppppppp",data)
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
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmm",dynamicRoutes)
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

export const router = async (dispatch) => {
  const routes = await generateRoutes(dispatch);
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4",dispatch)
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@22",routes)

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
