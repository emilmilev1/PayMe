import * as React from "react";
import { Container, Typography, Grid, Link, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocationOn, Phone, Email } from "@mui/icons-material";

const FooterContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#3949ab",
    color: "#ffffff",
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
}));

const FooterSection = styled(Grid)(({ theme }) => ({
    textAlign: "left",
    [theme.breakpoints.up("md")]: {
        textAlign: "center",
    },
    marginBottom: theme.spacing(3),
}));

const Footer = () => {
    return (
        <FooterContainer maxWidth={false}>
            <Typography
                sx={{ mt: 5 }}
                variant="body2"
                color="text.secondary"
                align="center"
            >
                &copy; {new Date().getFullYear()}{" "}
                <Link color="inherit" href="http://localhost:3000">
                    PayMe.com
                </Link>
            </Typography>
        </FooterContainer>
    );
};

export default Footer;
