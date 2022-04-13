import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import LanguageContext from "./languageContext";
import PageContent from "./pageContent";

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

  const [currLanguage, setCurrLanguage] = useState("ID");
  const [currFlag, setCurrFlag] = useState("cif-Id");
  
  useEffect(() => {
    if (window.sessionStorage.getItem("language")) {
      setCurrLanguage(window.sessionStorage.getItem("language"));
      if (window.sessionStorage.getItem("language") === "ID") {
        setCurrFlag("cif-Id");
      } else {
        setCurrFlag("cif-Us");
      }
    }
  }, []);

  function languageChange(flag, language) {
    setCurrFlag(flag);
    setCurrLanguage(language);
    window.sessionStorage.setItem("language", language);
  }

  return (
    <>
      <LanguageContext.Provider
        value={{
          pageLanguage: currLanguage,
          pageContent: PageContent,
        }}
      >
      <CheckLoggedIn isLoggedIn={true} />
      <div className={classes}>
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader 
            currFlag={currFlag}
            currLanguage={currLanguage}
            languageChange={languageChange}            
          />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
      </LanguageContext.Provider>
    </>
  );
};

export default TheLayout;
