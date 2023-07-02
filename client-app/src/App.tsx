import {
    createTheme,
    PaletteMode,
    ThemeProvider,
    CssBaseline,
} from "@mui/material";
import React, { Fragment, lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import guardRoutes from "./app/components/common/GuardRoutes";
import NotFound from "./app/pages/NotFound/NotFound";
import getDesignTokens from "./app/layout/customPalette";
import LoadingComponent from "./app/components/Loading/Loading";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { useStore } from "./app/stores/store";
import RegisterSuccess from "./app/components/Confirm/RegisterSuccess";
import ConfirmEmail from "./app/components/Confirm/ConfirmEmail";
import ModalContainer from "./app/components/ModalContainer/ModalContainer";

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
    const { commonStore, userStore } = useStore();
    const [mode, setMode] = React.useState<PaletteMode>("light");
    const { GuardedRoutesAuthUserOptions, GuardedRoutesAuthorization } =
        guardRoutes;

    // persist the selected mode in the local storage
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                const updatedMode = mode === "light" ? "dark" : "light";
                localStorage.setItem("colorMode", updatedMode);
                setMode(updatedMode);
            },
        }),
        [mode]
    );

    useEffect(() => {
        userStore.getUser().finally(() => commonStore.setAppLoaded());
    }, [userStore, commonStore]);

    const savedMode = localStorage.getItem("colorMode");
    const initialMode = savedMode ? (savedMode as PaletteMode) : "light";
    const theme = React.useMemo(
        () => createTheme(getDesignTokens(initialMode)),
        [initialMode]
    );

    return (
        <div className="app">
            <Fragment>
                <ToastContainer position="bottom-right" hideProgressBar />
                <ModalContainer />
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Suspense fallback={<LoadingComponent />}>
                            <Route exact path="/" component={Homepage} />
                            <Route
                                path={"/(.+)"}
                                render={() => (
                                    <Switch>
                                        <Route path="/blog" component={Blog} />
                                        <Route
                                            path="/pricing"
                                            component={Pricing}
                                        />
                                        //GuardedRoutesAuthUserOptions
                                        <Route
                                            exact
                                            path="/dashboard"
                                            component={Dashboard}
                                        />
                                        <GuardedRoutesAuthUserOptions
                                            path="/profile"
                                            component={Profile}
                                        />
                                        <GuardedRoutesAuthUserOptions
                                            key={location.key}
                                            path={"/create-payment"}
                                            component={CreateCheckPage}
                                        />
                                        <GuardedRoutesAuthorization
                                            path="/login"
                                            component={SignIn}
                                        />
                                        <GuardedRoutesAuthorization
                                            path="/register"
                                            component={SignUp}
                                        />
                                        <GuardedRoutesAuthorization
                                            path="/reset-password"
                                            component={ForgotPassword}
                                        />
                                        <Route
                                            path="/account/registerSuccess"
                                            component={RegisterSuccess}
                                        />
                                        <Route
                                            path="/account/verifyEmail"
                                            component={ConfirmEmail}
                                        />
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
