import { Typography, Stack, Link, Button } from "@mui/material";
import { Container } from "semantic-ui-react";
import Carousel from "./Carousel";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const Header = () => {
    const { userStore } = useStore();

    return (
        <Container style={{ height: "100vh" }}>
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
                sx={{ flexGrow: 1, pt: 10 }}
            >
                {userStore.isLoggedIn ? (
                    <Button
                        variant="contained"
                        LinkComponent={Link}
                        href="/dashboard"
                        color="success"
                        sx={{
                            maxWidth: "100px",
                            maxHeight: "50px",
                            minWidth: "100px",
                            minHeight: "40px",
                        }}
                    >
                        Dashboard
                    </Button>
                ) : null}
            </Stack>
            <Carousel />
        </Container>
    );
};

export default observer(Header);
