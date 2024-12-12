import React, { useContext, useState } from "react";

import { AppContext as AppContextT } from "../entities/entities";

export const AppContext = React.createContext<AppContextT | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [mobileNavbar, setMobileNavbar] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>("");

  const manageNavbar = (): void => {
    setMobileNavbar(!mobileNavbar);
  };

  return (
    <AppContext.Provider
      value={{ mobileNavbar, inputSearch, manageNavbar, setInputSearch }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextT => {
  return useContext(AppContext)!;
};
