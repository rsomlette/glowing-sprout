import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Box, Footer, Header } from "../components";

import { Home } from "../containers/home/Home";
import { Four0Four } from "../containers/404/FourOFour";
import { Login } from "../containers/login/Login";
import { Signup } from "../containers/signup/Signup";

import { lightTheme, darkTheme, THEME } from "../theme";
import { useQuery } from "@apollo/client";
import { GET_VIEWER } from "../graphql/queries";
import { userSession } from "../helpers/auth";

function App() {
  const { data, error, refetch, loading } = useQuery(GET_VIEWER);
  const [currentTheme, setCurrentTheme] = useState(THEME.DARK); // TODO:

  const handleLogout = () => {
    userSession.deleteUser();
    refetch();
  };

  console.log("data", data);
  console.log("error", error);
  return (
    <ThemeProvider
      theme={currentTheme === THEME.LIGHT ? lightTheme : darkTheme}
    >
      <Box
        display="flex"
        bg="primary"
        color="text"
        flexDirection="column"
        height="100vh"
      >
        <BrowserRouter>
          <Header
            theme={currentTheme}
            onLogout={handleLogout}
            toggleTheme={() =>
              setCurrentTheme(
                currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
              )
            }
          />
          <Box flex={1}>
            {data?.viewer || loading ? (
              <Switch>
                <Route path="/" component={Home} />
                <Route component={Four0Four} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/login">
                  <Login refetch={refetch} />
                </Route>
                <Route path="/signup" component={Signup} />
                <Redirect to="/login" />
              </Switch>
            )}
          </Box>
          <Footer />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
