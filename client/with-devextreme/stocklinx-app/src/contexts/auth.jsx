import React, { useState, useEffect, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  getUserWithToken,
  clearUser,
  register,
} from "../redux/userReducer";

function AuthProvider(props) {
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.user.user);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      dispatch(getUserWithToken());
      if (userRedux) {
        setUser(userRedux);
      }
      setLoading(false);
    })();
  }, []);

  const signIn = async (formData) => {
    const res = await dispatch(login(formData));
    await dispatch(getUserWithToken());
    setUser(userRedux);
    if (res?.payload) {
      return {
        isOk: false,
        err: res.payload,
      };
    } else {
      return { isOk: true };
    }
  };
  const signUp = async (formData) => {
    const res = await dispatch(register(formData));
    await dispatch(getUserWithToken());
    setUser(userRedux);
    if (res?.payload) {
      return {
        isOk: false,
        err: res,
      };
    } else {
      return { isOk: true };
    }
  };

  const signOut = () => {
    dispatch(clearUser());
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, loading, setLoading }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
