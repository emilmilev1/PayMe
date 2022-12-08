import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import React, { Fragment } from "react";
import getDesignTokens from "./app/layout/customPalette";

//import Dashboard from "./app/components/Dashboard/Dashboard";
//import Footer from "./app/components/Footer/Footer";
import Homepage from "./app/components/Homepage/Homepage";
//import Blog from "./app/components/Blog/Blog";

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
                        <Homepage />
                        {/* <Dashboard /> */}
                        {/* <Footer /> */}
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </Fragment>
        </div>
    );
}

export default App;
