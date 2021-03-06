import { makeStyles } from "@material-ui/core/styles";
import Link from "antd/lib/typography/Link";
import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { C } from "../../util";

const Header = () => {
  const classes = useStyles();
  const location = useLocation();

  const showTabbarBC =
    !/^.{0}$|^\/$|welcome|index/.test(location.pathname) && classes.tabbarBC;

  return (
    <div className={C(classes.headerContainer, showTabbarBC)}>
      <div className={classes.headerInnerContainer}>
        <NavLink to="/" className={classes.logoTitleBox}>
          <div>
            <img
              className={classes.logoImg}
              src={`https://k-1258976754.cos.ap-shanghai.myqcloud.com/senki/logo-${
                !showTabbarBC ? "blue" : "white"
              }.png`}
              alt=""
            />
          </div>
          <div
            className={C(classes.logoTitle, showTabbarBC)}
            style={{ fontFamily: "飞驰标题体" }}
          >
            Senki
          </div>
        </NavLink>
        <div className={classes.navItemBox}>
          <NavLink
            to="/algo-simulate"
            isActive={(match, location) => {
              if (/\/algo-simulate/.test(location.pathname)) {
                return true;
              }
              return false;
            }}
            activeStyle={{ color: "#407cc0" }}
            className={C(classes.navItem, showTabbarBC)}
          >
            算法模拟
          </NavLink>
          <NavLink
            to="/visual-editor"
            activeStyle={{ color: "#407cc0" }}
            className={C(classes.navItem, showTabbarBC)}
          >
            动手演练
          </NavLink>
          <Link
            style={{ color: !showTabbarBC ? "#1890ff" : "white" }}
            href="https://book.2084team.com"
            className={C(classes.navItem, showTabbarBC)}
          >
            Senki文档
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

const useStyles = makeStyles({
  headerContainer: {
    height: "60px",
    width: "100%",
    color: "rgb(13, 51, 128)",
    transition: "all 0.2s",
  },
  tabbarBC: {
    color: "white",
    background: "#1c334c",
  },
  tabbar: {
    color: "white",
  },
  headerInnerContainer: {
    width: "90%",
    margin: "0 auto",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoImg: {
    width: "40px",
    height: "40px",
    transition: "all 0.5s",
  },
  logoImgBox: {
    width: "40px",
    height: "40px",
  },
  logoTitle: {
    fontSize: "32px",
    marginLeft: "10px",
    paddingBottom: "5px",
    boxSizing: "border-box",
    "&:hover": {
      cursor: "pointer",
    },
  },
  logoTitleBox: {
    display: "flex",
    alignItems: "center",
  },
  navItemBox: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    height: "60px",
  },
  navItem: {
    "&:hover": {
      cursor: "pointer",
      color: "white",
      textDecoration: "1px",
    },
    "&:active": {
      color: "#407cc0",
    },
    fontWeight: 600,
    fontSize: "1rem",
    marginRight: "40px",
    height: "60px",
    lineHeight: "60px",
    position: "relative",
    "&::after": {},
  },
  // activeStyle: {
  //   color: ;
  // }
});
