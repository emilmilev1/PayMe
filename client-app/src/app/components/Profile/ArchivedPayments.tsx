import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Tab } from "semantic-ui-react";

const ArchivedPayments = () => {
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width="16">
                    <Header
                        floated="left"
                        icon="user"
                        content={`Archived Payments`}
                    />
                </Grid.Column>
                <Grid.Column width="16">
                    <span style={{ whiteSpace: "pre-wrap" }}></span>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ArchivedPayments);
