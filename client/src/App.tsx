import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";

import { useDispatch } from "react-redux";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import SetupProfile from "./pages/Auth/SetupProfile";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

import "react-toastify/dist/ReactToastify.css";
import { AUTH } from "./constants";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");

    if (profile.user) {
      dispatch({ type: AUTH, payload: profile });
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <PrivateRoute path="/" exact>
              <Feed />
            </PrivateRoute>
            <Route path="/auth/signin">
              <SignIn />
            </Route>
            <Route path="/auth/signup">
              <SignUp />
            </Route>
            <Route path="/auth/setup-profile">
              <SetupProfile />
            </Route>
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
