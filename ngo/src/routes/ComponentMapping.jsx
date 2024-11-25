import { HomePage, ContactPage, Org, AddOrg } from "./Lazy";

export const componentMapping = {
  home: {
    name: "Home",
    path: "/home",
    component: <HomePage />,
  },
  contact: {
    name: "Contact",
    path: "/contact",
    component: <ContactPage />,
  },
  org: {
    name: "Org",
    path: "/org",
    component: <Org />,
  },
  addOrg: {
    name: "Add Org",
    path: "/addOrg",
    component: <AddOrg />,
  },
};

