import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout_1/layout/Layout.jsx";
import ErrorPage from "../ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <div>Home Page</div> },
      {
        path: "/add",
        element: <div>Add Page</div>,
      },
    ],
  },
]);

export default router;
