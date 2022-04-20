import React, {createContext, useState} from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [order, setOrder] = useState(null);
  const [socket, setSocket] = useState(null);

  const auth = {
    isLogin,
    upDateLogin: is => setIsLogin(is),
  };

  const socketStore = {
    socket,
    upDateSocket: v => setSocket(v),
  };

  const orderStore = {
    order,
    loadingOrder,
    upDateLoadingOrder: value => setLoadingOrder(value),
    upDateOrder: order => setOrder(order),
    upDateSomeOrder: newSomeOrder =>
      setOrder(preOrder =>
        preOrder.map(item => {
          if (newSomeOrder._id == item._id) {
            return newSomeOrder;
          }
          return item;
        }),
      ),
  };

  const userStore = {
    profile,
    loadingProfile,
    upDateLoadingProfile: value => setLoadingProfile(value),
    upDateProfile: profile => setProfile(profile),
  };

  return (
    <StoreContext.Provider value={{auth, userStore, orderStore, socketStore}}>
      {children}
    </StoreContext.Provider>
  );
};
