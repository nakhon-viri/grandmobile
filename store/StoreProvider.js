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
    upDateSomeOrder: newSomeOrder => setOrder(preOrder => preOrder.map(item=>{
      if(newSomeOrder._id == item._id){
        return newSomeOrder
      }
      return item
    }))
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
