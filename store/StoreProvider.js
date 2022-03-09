import React, {createContext, useState} from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [profile, setProfile] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [order, setOrder] = useState(null);

  const auth = {
    isLogin,
    upDateLogin: is => setIsLogin(is),
  };

  const orderStore = {
    order,
    upDateOrder: order => setOrder(order),
  };

  const userStore = {
    profile,
    upDateProfile: profile => setProfile(profile),
  };

  return (
    <StoreContext.Provider value={{auth, userStore, orderStore}}>
      {children}
    </StoreContext.Provider>
  );
};
