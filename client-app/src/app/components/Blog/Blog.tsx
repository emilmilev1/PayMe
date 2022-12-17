import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FeaturedPost from "./FeaturedPost";
import { Typography } from "@mui/material";

const featuredPosts = [
    {
        title: "Featured post",
        date: "Sept 5",
        description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: "https://source.unsplash.com/random",
        imageLabel: "Image Text 1",
    },
    {
        title: "Bank",
        date: "Nov 11",
        description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: "https://source.unsplash.com/random",
        imageLabel: "Image Text 2",
    },
    {
        title: "Money",
        date: "Nov 11",
        description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: "https://source.unsplash.com/random",
        imageLabel: "Image Text 3",
    },
    {
        title: "Finance",
        date: "Nov 11",
        description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
        image: "https://source.unsplash.com/random",
        imageLabel: "Image Text 4",
    },
];

const theme = createTheme();

export default function Blog() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <main>
                    <Typography
                        align="center"
                        component="h4"
                        variant="h4"
                        sx={{ mb: 5 }}
                    >
                        Blog
                    </Typography>
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                </main>
            </Container>
        </ThemeProvider>
    );
}
