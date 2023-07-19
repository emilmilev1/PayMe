import * as React from "react";
import { Typography, Stack, Button } from "@mui/material";
import { Container } from "@mui/material";
import { useStore } from "../../stores/store";

const Header = () => {
    const { userStore } = useStore();

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 0",
                minHeight: "100vh",
            }}
        >
            <Typography variant="h4" align="center" mb={5}>
                PayMe is a service to create your checks and save all your
                payments
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" mb={5}>
                {userStore.isLoggedIn && (
                    <Button
                        variant="contained"
                        component="a"
                        href="/dashboard"
                        color="success"
                        sx={{
                            minWidth: 100,
                            minHeight: 40,
                        }}
                    >
                        Dashboard
                    </Button>
                )}
            </Stack>
            <img
                className="d-block"
                src="/checks/check_2.png"
                alt="First slide"
                style={{ maxWidth: "100%", height: "auto" }}
            />
        </Container>
    );
};

export default Header;
