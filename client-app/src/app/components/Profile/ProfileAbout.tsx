import { Container } from "@mui/material";
import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";

export const ProfileAbout = () => {
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width="16">
                    <Header floated="left" icon="user" content={`About`} />
                </Grid.Column>
                <Grid.Column width="16">
                    <span style={{ whiteSpace: "pre-wrap" }}></span>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};
