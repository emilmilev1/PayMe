import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import ProfileEditForm from "./ProfileEditForm";
import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

const ProfileAbout = () => {
    const { profileStore } = useStore();
    const { isCurrentUser, profile } = profileStore;
    const [editMode, setEditMode] = useState(false);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width="16">
                    <Header floated="left" icon="user" content={"About"} />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={editMode ? "Cancel" : "Edit Profile"}
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width="16">
                    {editMode ? (
                        <ProfileEditForm setEditMode={setEditMode} />
                    ) : (
                        <>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                Biography
                            </Typography>
                            <div
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {profile?.bio}
                            </div>
                        </>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfileAbout);
