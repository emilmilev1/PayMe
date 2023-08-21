import React, { useState } from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import ProfileEditForm from "./ProfileEditForm";
import { Button, Typography } from "@mui/material";
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
                        <div style={{ float: "right" }}>
                            {editMode ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{
                                        marginRight: "10px",
                                        outline: "none",
                                        background: "red",
                                    }}
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancel
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        outline: "none",
                                        background: "green",
                                    }}
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    )}
                </Grid.Column>
                <Grid.Column width="10">
                    {editMode ? (
                        <ProfileEditForm setEditMode={setEditMode} />
                    ) : (
                        <>
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 600 }}
                                marginBottom={2}
                            >
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
