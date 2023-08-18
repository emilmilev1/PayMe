import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

const AboutUs = () => {
    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: "flex" }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" color="primary">
                            About Us
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
};

export default AboutUs;
