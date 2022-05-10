import React, { useEffect, useState } from "react";
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from "react-redux";
import classNames from "classnames";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import LanguageContext from "./languageContext";
import PageContent from "./pageContent";

export const ContextLoad = React.createContext();
const ProviderLoad = ContextLoad.Provider;

const CheckLoggedIn = (props) => {
  if (!props.isLoggedIn) {
    window.location.href = "/#/login";
  }
  return "";
};

const TheLayout = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );

  const [currLanguage, setCurrLanguage] = useState("ID");
  const [currFlag, setCurrFlag] = useState("cif-Id");
  const [loading, setLoading] = useState(false);

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

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  return (
    <>
      <LanguageContext.Provider
        value={{
          pageLanguage: currLanguage,
          pageContent: PageContent,
        }}
      >
        <CheckLoggedIn isLoggedIn={isLoggedIn} />
        <div className={classes}>
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader
              currFlag={currFlag}
              currLanguage={currLanguage}
              languageChange={languageChange}
            />

            <div className="c-body">
              <ProviderLoad
                value={{setLoading}}
              > 
                <LoadingOverlay
                  active={loading}
                  spinner
                  text= "loading in progress"
                  //text= {language.pageContent[language.pageLanguage].loadingMessage}
                >
                  <TheContent />
                </LoadingOverlay>
             </ProviderLoad>
            </div>
            <TheFooter />
          </div>
        </div>
      </LanguageContext.Provider>
    </>
  );
};

export default TheLayout;
