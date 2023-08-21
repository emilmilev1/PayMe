import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FeaturedPost from "./FeaturedPost";
import { Typography } from "@mui/material";

const generatedFirstPicture = "https://picsum.photos/201/300";
const generatedSecondPicture = "https://picsum.photos/202/300";
const generatedThirdPicture = "https://picsum.photos/203/300";
const generatedFourthPicture = "https://picsum.photos/204/300";

const featuredPosts = [
    {
        title: "Nature and Numbers",
        date: "Sept 5",
        description:
            "Nature and numbers share an intricate harmony, where mathematical patterns reveal themselves in the beauty of the natural world.",
        image: generatedFirstPicture,
        imageLabel: "Image Text 1",
    },
    {
        title: "Bank",
        date: "Aug 14",
        description:
            "Banks serve as financial institutions that provide a range of services, including managing money, offering loans, and facilitating transactions for individuals and businesses.",
        image: generatedSecondPicture,
        imageLabel: "Image Text 2",
    },
    {
        title: "Money",
        date: "Dec 22",
        description:
            "Money is a universally recognized medium of exchange and store of value that facilitates economic transactions and trade.",
        image: generatedThirdPicture,
        imageLabel: "Image Text 3",
    },
    {
        title: "Finance",
        date: "Jan 1",
        description:
            "Finance involves the management of funds, assets, and liabilities to make informed decisions about investments, budgets, and financial planning.",
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
