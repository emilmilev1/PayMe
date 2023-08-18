import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { tiers } from "./tiers";

function PricingContent() {
    return (
        <React.Fragment>
            <GlobalStyles
                styles={{
                    ul: {
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                    },
                }}
            />
            <CssBaseline />
            <Container
                disableGutters
                maxWidth="sm"
                component="main"
                sx={{ pt: 8, pb: 6 }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    sx={{ fontWeight: "500" }}
                    gutterBottom
                >
                    Pricing
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Quickly build an effective pricing table for your potential
                    customers with this layout. It&apos;s built with default MUI
                    components with little customization.
                </Typography>
            </Container>
            <Container maxWidth="md" component="main" sx={{ marginBottom: 20 }}>
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === "Enterprise" ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{
                                        align: "center",
                                    }}
                                    action={
                                        tier.title === "Pro" ? (
                                            <StarIcon />
                                        ) : null
                                    }
                                    subheaderTypographyProps={{
                                        align: "center",
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "light"
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "baseline",
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            component="h2"
                                            variant="h3"
                                            color="text.primary"
                                        >
                                            ${tier.price}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="text.secondary"
                                        >
                                            /mo
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={
                                            tier.buttonVariant as
                                                | "outlined"
                                                | "contained"
                                        }
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}
