import { useState, useContext, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const loginAPIUrl =
  "https://u4mk83b0qk.execute-api.us-east-2.amazonaws.com/prod/login";

const verifyAPIUrl =
  "https://u4mk83b0qk.execute-api.us-east-2.amazonaws.com/prod/verify";

const initialContextValue = {
  checkLogin: () => {
    /* noop */
  },
  isChecked: false,
  login: (credentials) => {
    /* noop */
  },
  logout: () => {
    /* noop */
  },
  user: null,
};

const AuthContext = createContext(initialContextValue);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [isChecked, setIsChecked] = useState(initialContextValue.isChecked);
  const [user, setUser] = useState(initialContextValue.user);
  const location = useLocation();
  const navigate = useNavigate();

  const apiToken = {
    headers: {
      "x-api-key": "",
    },
  };

  function setUserSession(user, token) {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
  }

  function getToken() {
    return sessionStorage.getItem("token");
  }

  function getUser() {
    const user = sessionStorage.getItem("user");
    if (user === "undefined" || !user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  function resetUserSession() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }

  const checkLogin = () => {
    const token = getToken();
    // if (
    //   !token ||
    //   token === undefined ||
    //   token === "undefined" ||
    //   token === null
    // ) {
    //   return;
    // }

    const payload = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyAPIUrl, payload, apiToken)
      .then((res) => {
        setUserSession(res.data.user, res.data.token);
        const { user } = res.data;
        const redirectionPath =
          location.pathname !== "/login" ? location.pathname : "/remainder";

        setUser(user);

        navigate(redirectionPath);
      })
      .catch((err) => {
        setUser(initialContextValue.user);
        resetUserSession();
      })
      .finally(() => setIsChecked(true));
  };

  const login = (credentials) =>
    axios
      .post(loginAPIUrl, credentials, apiToken)
      .then((res) => {
        setUserSession(res.data.user, res.data.token);
        const { user } = res.data;
        setUser(user);
        navigate("/remainder");
      })
      .catch((err) => {
        setUser(initialContextValue.user);
        localStorage.clear();
      })
      .finally(() => setIsChecked(true));

  const logout = () =>
    axios.delete("/api/auth/logout").then((res) => {
      setUser(initialContextValue.user);
      localStorage.clear();
      navigate("/");
    });

  return {
    checkLogin,
    isChecked,
    login,
    logout,
    user,
  };
};
