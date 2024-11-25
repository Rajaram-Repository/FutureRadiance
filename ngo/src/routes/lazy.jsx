import { lazy } from "react";

export const HomePage = lazy(() =>
  import("../component/layout_1/examples/HomePage.jsx")
);
export const ContactPage = lazy(() =>
  import("../component/layout_1/examples/ContactPage.jsx")
);
export const Org = lazy(() =>
  import("../component/layout_1/org/viewOrg/Org.jsx")
);
export const AddOrg = lazy(() =>
  import("../component/layout_1/org/addOrg/AddOrg.jsx")
);
