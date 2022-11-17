import React, { Fragment } from "react";
import Homepage from "./app/components/Homepage/Homepage";

import { CssBaseline } from "@mui/material";

function App() {
    return (
        <div className="App">
            <Fragment>
                <CssBaseline />
                <Homepage />
            </Fragment>
        </div>
    );
}

export default App;
