import * as React from "react";
import {
    Container,
    Typography,
    Grid,
    Link,
    TextField,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(5),
}));

const FooterSection = styled(Grid)(({ theme }) => ({
    textAlign: "left",
    [theme.breakpoints.up("md")]: {
        textAlign: "center",
    },
}));

const Footer: React.FC = () => {
    return (
        <FooterContainer maxWidth={false} sx={{ color: "#6a6fff" }}>
            <Grid container spacing={3}>
                <FooterSection item xs={12} md={3}>
                    <Typography variant="h5" gutterBottom>
                        Address<span></span>
                    </Typography>
                    <Typography>
                        <i className="fa fa-map-marker-alt me-3"></i>123 Street,
                        New York, USA
                    </Typography>
                    <Typography>
                        <i className="fa fa-phone-alt me-3"></i>+012 345 67890
                    </Typography>
                    <Typography>
                        <i className="fa fa-envelope me-3"></i>info@example.com
                    </Typography>
                </FooterSection>
                <FooterSection item xs={12} md={3}>
                    <Typography variant="h5" gutterBottom>
                        Quick Link<span></span>
                    </Typography>
                    <Link variant="body1" href="">
                        About Us
                    </Link>
                    <Link variant="body1" href="">
                        Contact Us
                    </Link>
                    <Link variant="body1" href="">
                        Privacy Policy
                    </Link>
                    <Link variant="body1" href="">
                        Terms & Condition
                    </Link>
                    <Link variant="body1" href="">
                        Career
                    </Link>
                </FooterSection>
                <FooterSection item xs={12} md={3}>
                    <Typography variant="h5" gutterBottom>
                        Newsletter<span></span>
                    </Typography>
                    <Typography>
                        Lorem ipsum dolor sit amet elit. Phasellus nec pretium
                        mi. Curabitur facilisis ornare velit non vulpu
                    </Typography>
                    <div className="position-relative w-100 mt-3">
                        <TextField
                            variant="outlined"
                            placeholder="Your Email"
                            fullWidth
                            style={{ height: 48 }}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            className="shadow-none position-absolute top-0 end-0 mt-1 me-2"
                        >
                            <i className="fa fa-paper-plane fs-4"></i>
                        </Button>
                    </div>
                </FooterSection>
                <FooterSection item xs={12} md={3}>
                    <div className="d-flex pt-2 justify-content-center">
                        <Button
                            variant="outlined"
                            className="btn-social"
                            href="#"
                            startIcon={<i className="fab fa-twitter"></i>}
                        >
                            Twitter
                        </Button>
                        <Button
                            variant="outlined"
                            className="btn-social"
                            href="#"
                            startIcon={<i className="fab fa-facebook-f"></i>}
                        >
                            Facebook
                        </Button>
                        <Button
                            variant="outlined"
                            className="btn-social"
                            href="#"
                            startIcon={<i className="fab fa-instagram"></i>}
                        >
                            Instagram
                        </Button>
                        <Button
                            variant="outlined"
                            className="btn-social"
                            href="#"
                            startIcon={<i className="fab fa-linkedin-in"></i>}
                        >
                            LinkedIn
                        </Button>
                    </div>
                </FooterSection>
            </Grid>
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
