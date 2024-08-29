import React, { useEffect } from "react";
import navLogo from "../assets/navbarimg.png";
import { Link, useLocation } from "react-router-dom";
import face from "../assets/face.png";

const NavBar = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  const allNavLinks = () => {
    return location.pathname === "/" ? (
      <>
        <Link to={"/new"}>New Task</Link>
        <Link to={"/tasks"}>All Task</Link>
      </>
    ) : location.pathname === "/tasks" ? (
      <Link to={"/new"}>New Task</Link>
    ) : location.pathname === "/new" ? (
      <Link to={"/tasks"}>All Task</Link>
    ) : location.pathname === "/new" || location.pathname === "/edit" ? (
      <Link to={"/tasks"}>All Task</Link>
    ) : null;
  };

  return (
    <div className="nav-con">
      <nav className="d-flex justify-content-between  align-items-center">
        <Link to={"/"}>
          <img src={navLogo} alt="logo" />
        </Link>{" "}
        <div className="inner-nav d-flex  align-items-center">
          {allNavLinks()}
          <Link to={"/"}>
            {" "}
            <img style={{ cursor: "pointer" }} src={face} alt="face" />
          </Link>
        </div>{" "}
      </nav>
    </div>
  );
};

export default NavBar;
