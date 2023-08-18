import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Homepage/Navbar";
import SignIn from "../../components/Login/Login";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const SignInPage = () => {
    return (
        <>
            <Navbar />
            <Fragment>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            height: "100vh",
                        }}
                    >
                        <Box component="div" sx={{ mt: 1 }}>
                            <SignIn />
                        </Box>
                    </Box>
                </Container>
            </Fragment>
            <Footer />
        </>
    );
};

export default SignInPage;
