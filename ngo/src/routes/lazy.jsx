import { lazy } from "react";

export const HomePage = lazy(() =>
  import("../component/layout_1/examples/HomePage")
);
export const ContactPage = lazy(() =>
  import("../component/layout_1/examples/ContactPage")
);
