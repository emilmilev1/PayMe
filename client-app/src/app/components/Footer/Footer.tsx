import { Container, Link, Typography, Grid } from "@mui/material";

function Footer() {
    return (
        <Container
            maxWidth="md"
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6],
            }}
        >
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={6} sm={3}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Company
                    </Typography>
                    <ul>
                        <li>
                            <Link
                                href="/team"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                Team
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about-us"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                History
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about-us"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Resources
                    </Typography>
                    <ul>
                        <li>
                            <Link
                                href="/dashboard"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/checks"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                Checks
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blog"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                Newsletter
                            </Link>
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={5} sm={3}>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{ justifyContent: "space-between" }}
                        gutterBottom
                    >
                        Legal
                    </Typography>
                    <ul>
                        <li>
                            <Link
                                href="/"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                Terms of use
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                variant="subtitle1"
                                color="text.secondary"
                                underline="hover"
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </Grid>
            </Grid>
            <Typography
                sx={{ mt: 5 }}
                variant="body2"
                color="text.secondary"
                align="center"
            >
                Copyright &copy; {new Date().getFullYear()}{" "}
                <Link color="inherit" href="http://localhost:3000">
                    PayMe.com
                </Link>
            </Typography>
        </Container>
    );
}

export default Footer;
