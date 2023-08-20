import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Container, Paper } from "@mui/material";

const AboutUs = () => {
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
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        PayMe offers a secure and convenient online payment
                        solution, allowing users to easily save their payment
                        information. With PayMe, you can securely store your
                        payment details and make transactions hassle-free,
                        ensuring a seamless and protected online shopping
                        experience. Say goodbye to repetitive data entry and
                        enjoy the peace of mind that comes with our reliable
                        payment storage service.
                    </Typography>
                </Grid>
            </Box>
            <Box
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={3}
                    style={{
                        width: 200,
                        height: 200,
                        marginBottom: "20px",
                    }}
                >
                    <img
                        src="/about/1.jpg"
                        alt="Image 1"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Paper>
                <Paper
                    elevation={3}
                    style={{
                        width: 200,
                        height: 200,
                        marginBottom: "20px",
                    }}
                >
                    <img
                        src="/about/2.jpg"
                        alt="Image 2"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Paper>
                <Paper
                    elevation={3}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                >
                    <img
                        src="/about/3.jpg"
                        alt="Image 3"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Paper>
            </Box>
        </Container>
    );
};

export default AboutUs;
