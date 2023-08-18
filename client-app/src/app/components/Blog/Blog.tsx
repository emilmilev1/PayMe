import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FeaturedPost from "./FeaturedPost";
import { Typography } from "@mui/material";

const generatedFirstPicture = "https://picsum.photos/200/300";
const generatedSecondPicture = "https://picsum.photos/200/300";
const generatedThirdPicture = "https://picsum.photos/200/300";
const generatedFourthPicture = "https://picsum.photos/200/300";

const featuredPosts = [
    {
        title: "Featured post",
        date: "Sept 5",
        description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: generatedFirstPicture,
        imageLabel: "Image Text 1",
    },
    {
        title: "Bank",
        date: "Nov 11",
        description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: generatedSecondPicture,
        imageLabel: "Image Text 2",
    },
    {
        title: "Money",
        date: "Nov 11",
        description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: generatedThirdPicture,
        imageLabel: "Image Text 3",
    },
    {
        title: "Finance",
        date: "Nov 11",
        description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: generatedFourthPicture,
        imageLabel: "Image Text 4",
    },
];

const theme = createTheme();

export default function Blog() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mt: 5, mb: 20 }}>
                <main>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        sx={{ fontWeight: "500", mb: 5 }}
                        gutterBottom
                    >
                        Blog
                    </Typography>
                    <Grid container spacing={8}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}
