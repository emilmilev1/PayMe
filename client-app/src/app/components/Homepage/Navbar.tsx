import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

const Navbar = () => {
    const { userStore } = useStore();
    const history = useHistory();

    const handleProfileClick = () => {
        if (userStore.isLoggedIn) {
            history.push(`/profiles/${userStore.user?.username}`);
        } else {
            history.push("/login");
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        color="white"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: "bold",
                            letterSpacing: ".3rem",
                            "&:hover": {
                                color: "lawngreen",
                            },
                            textDecoration: "none",
                        }}
                    >
                        PayMe
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            sx={{
                                m: 2,
                                color: "white",
                                display: "block",
                                "&:hover": {
                                    color: "white",
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                            href="/dashboard"
                        >
                            Dashboard
                        </Button>
                        <Button
                            sx={{
                                m: 2,
                                color: "white",
                                display: "block",
                                "&:hover": {
                                    color: "white",
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                            href="/pricing"
                        >
                            Pricing
                        </Button>
                        <Button
                            sx={{
                                m: 2,
                                color: "white",
                                display: "block",
                                "&:hover": {
                                    color: "white",
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                            href="/blog"
                        >
                            Blog
                        </Button>
                        <Button
                            sx={{
                                m: 2,
                                color: "white",
                                display: "block",
                                "&:hover": {
                                    color: "white",
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                            href="/about-us"
                        >
                            About Us
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                            <Avatar
                                alt="User"
                                src={userStore.user?.image || "/user.png"}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default observer(Navbar);
