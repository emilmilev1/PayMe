import React from "react";
import { Grid, Header, Tab } from "semantic-ui-react";

export const ProfilePhotos = () => {
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width="16">
                    <Header floated="left" icon="user" content={`Photos`} />
                </Grid.Column>
                <Grid.Column width="16">
                    <span style={{ whiteSpace: "pre-wrap" }}></span>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};
