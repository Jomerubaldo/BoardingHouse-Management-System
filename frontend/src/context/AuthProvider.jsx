import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";

export const AuthProvider = ({ children }) => {
  // kunin ang value kung true or false
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") == "true";
  });

  //   e set sa localstorage ang value kung true or false mula sa useState()
  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  //   remove lang yung naka save sa localstorage na isLogin value
  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
