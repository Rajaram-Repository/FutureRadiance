import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import cx from "classnames";
import s from "./Header.module.scss";
import { navigationBarList } from "../../utils/constant";

function Header() {
  const navBarList = useSelector((state) => state?.userData?.navBarList);
  const location = useLocation();
  console.log("1");
  const navBarListCheck = useSelector((state) => state?.userData);
  console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrr",navBarListCheck)


  return (
    <div className={cx(s.headerContainer)}>
      <div className={cx(s.navContainer)}>
        {navBarList &&
          navBarList.map((key) => {
            const navItem = navigationBarList[key];
            if (navItem) {
              const isActive = location.pathname === navItem.path;
              return (
                <Link
                  key={key}
                  to={navItem.path}
                  className={cx(s.navItem, { [s.activeNavItem]: isActive })}
                >
                  {navItem.name}
                </Link>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}

export default Header;
