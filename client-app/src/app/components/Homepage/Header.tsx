import { Typography, Button, Stack } from "@mui/material";
import React from "react";
import { Container, Divider } from "semantic-ui-react";
import Footer from "../Footer/Footer";
import Carousel from "./Carousel";

const Header = () => {
    return (
        <Container style={{ paddingBottom: "5rem" }}>
            <Typography
                component="h1"
                variant="h4"
                align="center"
                sx={{ flexGrow: 1, pt: 5 }}
            >
                PayMe is a service to create your checks and save all your
                payments
            </Typography>
            <Stack
                direction="row"
                justifyContent="center"
                sx={{ flexGrow: 1, pt: 5 }}
            >
                <Button
                    variant="contained"
                    color="success"
                    style={{
                        maxWidth: "100px",
                        maxHeight: "50px",
                        minWidth: "100px",
                        minHeight: "40px",
                    }}
                >
                    Continue
                </Button>
            </Stack>
            <Carousel />
        </Container>
    );
};

export default Header;
