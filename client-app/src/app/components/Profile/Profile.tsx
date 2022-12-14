import { Typography } from "@mui/material";
import { Container, Grid } from "semantic-ui-react";
import { ProfileContent } from "./ProfileContent";
import { ProfileHeader } from "./ProfileHeader";

const Profile = () => {
    return (
        <Container style={{ margin: "8em" }}>
            <Typography
                component="h2"
                variant="h3"
                align="center"
                sx={{ flexGrow: 1, pb: 5 }}
            >
                Profile Page
            </Typography>
            <Grid>
                <Grid.Column width={16}>
                    <>
                        <ProfileHeader />
                        <ProfileContent />
                    </>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default Profile;
