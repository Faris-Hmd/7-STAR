/** @format */

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  function hasAccess(route) {
    // console.log(user);
    if (user.premessions.includes(route)) return true;
    else return false;
  }
  //----------------------- SIGNOUT -----------------------
  const handleSignOut = async () => {
    const { auth } = await import("../firebase/firebase");
    console.log("from out");
    setUser(null);
    toast.success("تم تسجيل الخروج بنجاح");
    // auth
    //   .signOut()
    //   .then(() => {
    //     setUser(null);
    //     sessionStorage.removeItem("session");
    //   })
    //   .catch((e) => console.log(e));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleSignOut,
        hasAccess,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
