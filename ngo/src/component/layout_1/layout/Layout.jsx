import cx from "classnames";
import s from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../header/Header.jsx";

function Layout() {
  
  const loading = useSelector((state) => state?.userData?.loading);
  console.log(loading);

  return (
    <div className={cx(s.layoutContainer)}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
