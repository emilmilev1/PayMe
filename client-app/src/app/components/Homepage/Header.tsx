import { Typography, Stack, Link, Button } from "@mui/material";
import { Container } from "semantic-ui-react";
import Carousel from "./Carousel";

const Header = () => {
    return (
        <Container style={{ paddingBottom: "5rem" }}>
            <Typography
                component="h1"
                variant="h4"
                align="center"
                sx={{ flexGrow: 1, pt: 5 }}
            >
                PayMe is a service to create your checks and save all your
                payments
            </Typography>
            <Stack
                direction="row"
                justifyContent="center"
                sx={{ flexGrow: 1, pt: 5 }}
            >
                <Button
                    variant="contained"
                    href="/create-payment"
                    LinkComponent={Link}
                    color="success"
                    sx={{
                        maxWidth: "100px",
                        maxHeight: "50px",
                        minWidth: "100px",
                        minHeight: "40px",
                    }}
                >
                    Create
                </Button>
            </Stack>
            <Carousel />
        </Container>
    );
};

export default Header;
