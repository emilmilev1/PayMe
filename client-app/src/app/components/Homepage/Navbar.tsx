import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

const Navbar = () => {
    const { userStore } = useStore();
    const history = useHistory();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
                    <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        PayMe
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {[
                                <React.Fragment>
                                    <MenuItem key="dashboard">
                                        <Typography
                                            margin="auto"
                                            textAlign="center"
                                            justifyContent="center"
                                            display="flex"
                                            sx={{ color: "inherit" }}
                                        >
                                            <Link href="/dashboard">
                                                Dashboard
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem key="pricing">
                                        <Typography
                                            margin="auto"
                                            textAlign="center"
                                            justifyContent="center"
                                            display="flex"
                                            sx={{ color: "inherit" }}
                                        >
                                            <Link href="/pricing">Pricing</Link>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem key="blog">
                                        <Typography
                                            margin="auto"
                                            textAlign="center"
                                            justifyContent="center"
                                            display="flex"
                                            sx={{ color: "inherit" }}
                                        >
                                            <Link href="/blog">Blog</Link>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem key="about">
                                        <Typography
                                            margin="auto"
                                            textAlign="center"
                                            justifyContent="center"
                                            display="flex"
                                            sx={{ color: "inherit" }}
                                        >
                                            <Link href="/about-us">
                                                About Us
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                </React.Fragment>,
                            ]}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
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
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            href="/dashboard"
                        >
                            Dashboard
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            href="/pricing"
                        >
                            Pricing
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            href="/blog"
                        >
                            Blog
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
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
