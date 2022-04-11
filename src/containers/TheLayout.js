import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const CheckLoggedIn = (props) => {
  if (!props.isLoggedIn) {
    return <Redirect from="/" to="/login" />;
  }
  return '';
};

const TheLayout = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );

  return (
    <>
      <CheckLoggedIn isLoggedIn={true} />
      <div className={classes}>
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default TheLayout;
