import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import React, { Fragment, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./app/pages/NotFound/NotFound";
import getDesignTokens from "./app/layout/customPalette";
import LoadingComponent from "./app/components/Loading/Loading";
import GuardedRouteAuth from "./app/components/common/GuardedRouteAuth";
import GuardedRoutesAuth from "./app/components/common/GuardedRouteAuth";

const Homepage = lazy(() => import("./app/pages/Homepage/Homepage"));
const Blog = lazy(() => import("./app/pages/Blog/Blog"));
const Dashboard = lazy(() => import("./app/components/Dashboard/Dashboard"));
const ForgotPassword = lazy(() => import("./app/pages/ResetPass/ResetPass"));
const SignIn = lazy(() => import("./app/pages/SignIn/SignInPage"));
const Pricing = lazy(() => import("./app/pages/Pricing/Pricing"));
const Profile = lazy(() => import("./app/pages/Profile/Profile"));
const SignUp = lazy(() => import("./app/pages/SignUp/SignUpPage"));
const CreateCheckPage = lazy(
    () => import("./app/pages/CreateCheck/CreateCheck")
);

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
});

function App() {
    const [mode, setMode] = React.useState<PaletteMode>("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = React.useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    return (
        <div className="app">
            <Fragment>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <Suspense fallback={<LoadingComponent />}>
                            <Route>
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={Homepage}
                                    />
                                    <GuardedRoutesAuth
                                        path="/dashboard"
                                        component={Dashboard}
                                    />
                                    <Route path="/blog" component={Blog} />
                                    <Route
                                        path="/profile"
                                        component={Profile}
                                    />
                                    <Route
                                        path="/pricing"
                                        component={Pricing}
                                    />
                                    <Route
                                        path="/create-payment"
                                        component={CreateCheckPage}
                                    />
                                    <Route path="/login" component={SignIn} />
                                    <Route
                                        path="/reset-password"
                                        component={ForgotPassword}
                                    />
                                    <Route
                                        path="/register"
                                        component={SignUp}
                                    />
                                    <Route path="*" component={NotFound} />
                                </Switch>
                            </Route>
                        </Suspense>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </Fragment>
        </div>
    );
}

export default App;
