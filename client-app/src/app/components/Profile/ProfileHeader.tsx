import { Button, Grid, Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export const ProfileHeader = () => {
    const { userStore } = useStore();
    const [open, setOpen] = useState(false);

    const handleExitClick = () => {
        setOpen(true);
    };

    const handleConfirmLogout = () => {
        userStore.logout();
        setOpen(false);
    };

    const handleCancelLogout = () => {
        setOpen(false);
    };

    const isLoggedIn = userStore.isLoggedIn;
    const username = userStore.user?.username;

    return (
        <Segment style={{ position: "relative" }}>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image
                                avatar
                                size="small"
                                src={"/PayMe.png"}
                            />
                            <Item.Content verticalAlign="middle">
                                <Header
                                    as="h1"
                                    content={
                                        isLoggedIn
                                            ? username
                                            : "Missing username"
                                    }
                                />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
            <Button
                onClick={handleExitClick}
                style={{
                    fontWeight: "bolder",
                    position: "absolute",
                    bottom: "15px",
                    right: "15px",
                }}
            >
                Logout
            </Button>
            <Dialog open={open} onClose={handleCancelLogout}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelLogout} color="red">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} color="green">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Segment>
    );
};
