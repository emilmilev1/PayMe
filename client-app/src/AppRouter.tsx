import React, { Fragment, lazy, Suspense, useEffect } from "react";
import {
    createTheme,
    PaletteMode,
    ThemeProvider,
    CssBaseline,
} from "@mui/material";
import { Route, Switch, useLocation } from "react-router-dom";
import NotFound from "./app/pages/NotFound/NotFound";
import getDesignTokens from "./app/layout/customPalette";
import LoadingComponent from "./app/components/Loading/Loading";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { useStore } from "./app/stores/store";
import RegisterSuccess from "./app/components/Confirm/RegisterSuccess";
import ConfirmEmail from "./app/components/Confirm/ConfirmEmail";
import ModalContainer from "./app/components/ModalContainer/ModalContainer";
import {
    GuardedRoutesAuthorization,
    GuardedRoutesAuthUserOptions,
} from "./app/components/common/GuardRoutes";

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

function AppRouter() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        userStore.getUser();
    }, [userStore]);

    useEffect(() => {
        commonStore.setAppLoaded();
    }, [commonStore]);

    return (
        <div className="app">
            <Fragment>
                <ToastContainer position="bottom-right" hideProgressBar />
                <ModalContainer />
                <CssBaseline />
                <Suspense fallback={<LoadingComponent />}>
                    <Route
                        render={() => (
                            <Switch>
                                <Route exact path="/" component={Homepage} />
                                <Route path="/blog" component={Blog} />
                                <Route path="/pricing" component={Pricing} />
                                <GuardedRoutesAuthorization
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                                <GuardedRoutesAuthorization
                                    path="/profile"
                                    component={Profile}
                                />
                                <GuardedRoutesAuthorization
                                    key={location.key}
                                    path={"/create-payment"}
                                    component={CreateCheckPage}
                                />
                                <GuardedRoutesAuthorization
                                    path="/profiles/:username"
                                    component={Profile}
                                />
                                <GuardedRoutesAuthUserOptions
                                    path="/login"
                                    component={SignIn}
                                />
                                <GuardedRoutesAuthUserOptions
                                    path="/register"
                                    component={SignUp}
                                />
                                <GuardedRoutesAuthUserOptions
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
            </Fragment>
        </div>
    );
}

export default observer(AppRouter);
