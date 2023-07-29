import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Homepage/Navbar";
import SignUp from "../../components/Register/Register";
import {
    Box,
    Container,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";

const theme = createTheme();

const SignUpPage = () => {
    return (
        <>
            <Navbar />
            <Fragment>
                <ThemeProvider theme={theme}>
                    <Container
                        component="main"
                        maxWidth="xs"
                        style={{ height: "100vh" }}
                    >
                        <CssBaseline />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                height: "100vh",
                            }}
                        >
                            <Box component="div" sx={{ mt: 3 }}>
                                <SignUp />
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Fragment>
            <Footer />
        </>
    );
};

export default SignUpPage;
