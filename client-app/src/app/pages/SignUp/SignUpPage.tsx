import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Homepage/Navbar";
import SignUp from "../../components/Register/Register";
import { Box, Container } from "@mui/material";

const SignUpPage = () => {
    return (
        <>
            <Navbar />
            <Fragment>
                <Container maxWidth="xs">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            minHeight: "calc(150vh - 100px)",
                        }}
                    >
                        <Box component="div" sx={{ mt: 1 }}>
                            <SignUp />
                        </Box>
                    </Box>
                </Container>
            </Fragment>
            <Footer />
        </>
    );
};

export default SignUpPage;
