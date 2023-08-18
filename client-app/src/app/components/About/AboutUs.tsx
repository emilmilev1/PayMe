import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Container } from "@mui/material";

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
                    <Typography variant="subtitle1" color="white">
                        About Us
                    </Typography>
                </Grid>
            </Box>
        </Container>
    );
};

export default AboutUs;
