import { PaletteMode } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const getDesignTokens = (mode: any) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: blue,
                  divider: blue[200],
                  text: {
                      primary: grey[900],
                      secondary: grey[800],
                  },
              }
            : {
                  // palette values for dark mode
                  primary: grey,
                  divider: grey[700],
                  background: {
                      default: grey[900],
                      paper: grey[900],
                  },
                  text: {
                      primary: grey[100],
                      secondary: grey[200],
                  },
              }),
    },
});

export default getDesignTokens;
