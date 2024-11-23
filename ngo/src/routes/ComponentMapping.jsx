import { HomePage, ContactPage } from "./Lazy";

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
};
