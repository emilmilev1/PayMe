import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import React, { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./app/pages/NotFound/NotFound";
import getDesignTokens from "./app/layout/customPalette";
import LoadingComponent from "./app/components/Loading/Loading";

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
                            <Routes>
                                <Route path="/" element={<Homepage />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/pricing" element={<Pricing />} />
                                <Route
                                    path="/create-payment"
                                    element={<CreateCheckPage />}
                                />
                                <Route path="/login" element={<SignIn />} />
                                <Route
                                    path="/reset-password"
                                    element={<ForgotPassword />}
                                />
                                <Route path="/register" element={<SignUp />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </Fragment>
        </div>
    );
}

export default App;
