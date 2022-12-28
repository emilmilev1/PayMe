import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import React, { Fragment, lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import NotFound from "./app/pages/NotFound/NotFound";
import getDesignTokens from "./app/layout/customPalette";
import LoadingComponent from "./app/components/Loading/Loading";
import GuardedRoutesAuth from "./app/components/common/GuardedRouteUser";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { useStore } from "./app/stores/store";
import RegisterSuccess from "./app/components/Confirm/RegisterSuccess";
import ConfirmEmail from "./app/components/Confirm/ConfirmEmail";
import GuardedRouteUser from "./app/components/common/GuardedRouteUser";

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
    const location = useLocation();
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
                <ToastContainer position="bottom-right" hideProgressBar />
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <Suspense fallback={<LoadingComponent />}>
                            <Route exact path="/" component={Homepage} />
                            <Route
                                path={"/(.+)"}
                                render={() => (
                                    <Switch>
                                        <Route
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
                                        <GuardedRoutesAuth
                                            key={location.key}
                                            path={[
                                                "/create-payment",
                                                "/manage/:id",
                                            ]}
                                            component={CreateCheckPage}
                                        />
                                        <Route component={GuardedRoutesAuth}>
                                            <Route
                                                path="/login"
                                                component={SignIn}
                                            />
                                            <Route
                                                path="/reset-password"
                                                component={ForgotPassword}
                                            />
                                            <Route
                                                path="/register"
                                                component={SignUp}
                                            />
                                            <Route
                                                path="/account/registerSuccess"
                                                component={RegisterSuccess}
                                            />
                                            <Route
                                                path="/account/verifyEmail"
                                                component={ConfirmEmail}
                                            />
                                        </Route>
                                        <Route path="*" component={NotFound} />
                                    </Switch>
                                )}
                            />
                        </Suspense>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </Fragment>
        </div>
    );
}

export default observer(App);
