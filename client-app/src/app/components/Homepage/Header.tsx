import * as React from "react";
import { Typography, Stack, Button } from "@mui/material";
import { Container } from "@mui/material";
import { useStore } from "../../stores/store";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import CarouselComponent from "./Carousel";

const Header = () => {
    const { userStore } = useStore();

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 0",
                minHeight: "100vh",
            }}
        >
            <Box
                style={{
                    flex: 1,
                    paddingRight: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" align="center" mb={8} color="white">
                    A service to create your checks and save all your payments
                </Typography>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    mb={5}
                >
                    {userStore.isLoggedIn && (
                        <Button
                            variant="contained"
                            component="a"
                            href="/dashboard"
                            color="warning"
                            sx={{
                                minWidth: 200,
                                minHeight: 70,
                                borderRadius: "40px",
                                fontSize: "1.5rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#FFA500",
                                    color: "white",
                                },
                            }}
                        >
                            Get Started
                        </Button>
                    )}
                </Stack>
            </Box>
            <CarouselComponent />
        </Container>
    );
};

export default Header;
