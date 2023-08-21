import { Box, Container, CssBaseline } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import Navbar from "../../components/Homepage/Navbar";
import { Fragment } from "react";

const ResetPassPage = () => {
    return (
        <>
            <Navbar />
            <Fragment>
                <Container maxWidth="xs">
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
            </Fragment>
            <Footer />
        </>
    );
};

export default ResetPassPage;
