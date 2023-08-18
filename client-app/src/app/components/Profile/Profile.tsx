import { Typography } from "@mui/material";
import { Container, Grid } from "semantic-ui-react";
import LoadingComponent from "../Loading/Loading";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

const Profile = () => {
    const history = useHistory();
    const { username } = useParams<{ username: string }>();
    const { profileStore, userStore } = useStore();
    const { loadingProfile, loadProfile, profile } = profileStore;
    const { isLoggedIn } = userStore;

    useEffect(() => {
        if (!isLoggedIn || username != userStore.user?.username) {
            history.push("/");
        } else {
            loadProfile(username);
        }
    }, [loadProfile, username, isLoggedIn, history]);

    if (loadingProfile)
        return <LoadingComponent content="Loading profile..." />;

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
            <Grid style={{ minHeight: "500px" }}>
                <Grid.Column width={16}>
                    {profile && (
                        <>
                            <ProfileHeader />
                            <ProfileContent profile={profile} />
                        </>
                    )}
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default observer(Profile);
