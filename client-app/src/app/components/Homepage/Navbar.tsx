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
import { FormGroup } from "@mui/material";
import MaterialUISwitch from "../../layout/SwitchDesign";
import { ColorModeContext } from "../../../App";
import { Link } from "react-router-dom";
import { List, ListItem } from "semantic-ui-react";

const pages = [
    { page: "Dashboard", to: "/dashboard" },
    { page: "Checks", to: "/checks" },
    { page: "Pricing", to: "/pricing" },
    { page: "Blog", to: "/blog" },
    { page: "About Us", to: "/about-us" },
];
//const settings = ["Dashboard", "Profile", "Settings", "Logout"]; // Logged in user
//const settings = ["Dashboard", "Profile", "Admin", "Settings", "Logout"]; // Logged in Admin
const settings = ["Profile", "Newsletter"]; // Home page default user

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const colorMode = React.useContext(ColorModeContext);

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
                            <MenuItem>
                                <Typography
                                    margin="auto"
                                    textAlign="center"
                                    justifyContent="center"
                                    display="flex"
                                    sx={{ color: "inherit" }}
                                >
                                    <Link to="/dashboard">Dashboard</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography
                                    margin="auto"
                                    textAlign="center"
                                    justifyContent="center"
                                    display="flex"
                                    sx={{ color: "inherit" }}
                                >
                                    <Link to="/pricing">Pricing</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography
                                    margin="auto"
                                    textAlign="center"
                                    justifyContent="center"
                                    display="flex"
                                    sx={{ color: "inherit" }}
                                >
                                    <Link to="/blog">Blog</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography
                                    margin="auto"
                                    textAlign="center"
                                    justifyContent="center"
                                    display="flex"
                                    sx={{ color: "inherit" }}
                                >
                                    <Link to="/about-us">About Us</Link>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
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
                            display: { xs: "none", md: "flex" },
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
                    <Box>
                        <FormGroup>
                            <MaterialUISwitch
                                sx={{ m: 1 }}
                                onClick={colorMode.toggleColorMode}
                            />
                        </FormGroup>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="User" src="/user.png" />
                        </IconButton>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                <Typography
                                    margin="auto"
                                    textAlign="center"
                                    justifyContent="center"
                                    display="flex"
                                    sx={{ color: "inherit" }}
                                >
                                    <Link to="/profile">Profile</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography
                                    margin="auto"
                                    textAlign="center"
                                    justifyContent="center"
                                    display="flex"
                                    sx={{ color: "inherit" }}
                                >
                                    <Link to="/about-us">Newsletter</Link>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
