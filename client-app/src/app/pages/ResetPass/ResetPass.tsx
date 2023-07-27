import {
    Box,
    Container,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import Footer from "../../components/Footer/Footer";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import Navbar from "../../components/Homepage/Navbar";
import { Fragment } from "react";

const theme = createTheme();

const ResetPassPage = () => {
    return (
        <>
            <Navbar />
            <Fragment>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                height: "100vh",
                            }}
                        >
                            <Box component="div" sx={{ mt: 1 }}>
                                <ForgotPassword />
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Fragment>
            <Footer />
        </>
    );
};

export default ResetPassPage;
