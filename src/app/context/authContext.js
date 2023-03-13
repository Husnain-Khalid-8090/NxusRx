import { useState, createContext, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCookie, getCookie, setCookie } from "../helpers/common";
// import { getCurrentUserPermissions } from "../services/auth/index";
import { ToastContainer, toast } from "react-toastify";

const context = {};

export const AuthContext = createContext(context);

export function AuthContextProvider(props) {
  const { user, user_permissions } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [allowedPages, setAllowedPages] = useState(
    JSON.parse(getCookie("dash_allowed_pages")) || []
  );
  const [loading_user, setLoadingUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(user && user?.id ? true : false);
  const [loading, setLoading] = useState(false);

  const getPermissions = () => {
    setLoadingUser(true);

    try {
      // dispatch(
      //   getCurrentUserPermissions(function (res) {
      //     console.log("raaa", res);
      //     setAllowedPages([
      //       ...res?.data?.permissions
      //         .filter((p) => p.includes(".nav"))
      //         .map((p) => p.split(".")[0]),
      //     ]);
      //     setCookie(
      //       "dash_allowed_pages",
      //       JSON.stringify(
      //         res?.data?.permissions
      //           .filter((p) => p.includes(".nav"))
      //           .map((p) => p.split(".")[0])
      //       )
      //     );
      //     setLoadingUser(false);
      //   })
      // );
    } catch (err) {
      setAllowedPages(["no-permissions"]);
      setCookie("dash_allowed_pages", JSON.stringify(["no-permissions"]));
      setLoadingUser(false);
      toast(err.message);
    }
  };

  console.log("all", allowedPages);

  useEffect(() => {
    if (user && user?.token) {
      setIsLoggedIn(true);
    } else {
      clearCookie("dash_allowed_pages");
      setIsLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn) {
      getPermissions();
    }
    // listen to event
    window.addEventListener("FETCH_ADMIN_ROLE", () => {
      getPermissions();
    });
    return () => {
      window.removeEventListener("FETCH_ADMIN_ROLE", () => {
        getPermissions();
      });
    };
  }, [isLoggedIn, user]);

  const hasPermission = (perm) => user?.permissions?.includes(perm);
  const allContext = useMemo(
    () => ({
      hasPermission,
      allowedPages,
      loading_user,
      isLoggedIn,
    }),
    [isLoggedIn, hasPermission, user, allowedPages]
  );
  return (
    <AuthContext.Provider value={allContext}>
      {props.children}
    </AuthContext.Provider>
  );
}
