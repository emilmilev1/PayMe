import { Container, Grid } from "semantic-ui-react";
import { ProfileContent } from "./ProfileContent";
import { ProfileHeader } from "./ProfileHeader";

const Profile = () => {
    return (
        <Container style={{ marginTop: "5em" }}>
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
