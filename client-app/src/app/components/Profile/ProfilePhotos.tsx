import React, { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Tab, Image } from "semantic-ui-react";
import { Photo, Profile } from "../../models/profile";
import { useStore } from "../../stores/store";
import PhotoUploadWidget from "../ImageUpload/PhotoUploadWidget";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { observer } from "mobx-react-lite";

interface Props {
    profile: Profile;
}

const ProfilePhotos = ({ profile }: Props) => {
    const {
        profileStore: {
            isCurrentUser,
            uploadPhoto,
            uploading,
            loading,
            setMainPhoto,
            deletePhoto,
        },
    } = useStore();

    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState("");
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(
        photo: Photo,
        e: SyntheticEvent<HTMLButtonElement>
    ) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(
        photo: Photo,
        e: SyntheticEvent<HTMLButtonElement>
    ) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    function handleDeletePhotoClick(photo: Photo) {
        setPhotoToDelete(photo);
        setDeleteConfirmationOpen(true);
    }

    function handleDeleteConfirmationClose(confirmed: boolean) {
        if (confirmed && photoToDelete) {
            deletePhoto(photoToDelete);
        }
        setPhotoToDelete(null);
        setDeleteConfirmationOpen(false);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width="16">
                    <Header floated="left" icon="user" content={`Photos`} />
                    {isCurrentUser && (
                        <Button
                            floated="right"
                            basic
                            content={addPhotoMode ? "Cancel" : "Add Photo"}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width="16">
                    {addPhotoMode ? (
                        <PhotoUploadWidget
                            uploadPhoto={handlePhotoUpload}
                            loading={uploading}
                        />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map((photo) => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                basic
                                                variant="contained"
                                                color="green"
                                                content="Main"
                                                name={"main" + photo.id}
                                                disabled={photo.isMain}
                                                loading={
                                                    target ===
                                                        "main" + photo.id &&
                                                    loading
                                                }
                                                onClick={(e) =>
                                                    handleSetMainPhoto(photo, e)
                                                }
                                            />
                                            <Button
                                                basic
                                                variant="contained"
                                                color="red"
                                                icon="trash"
                                                loading={
                                                    target === photo.id &&
                                                    loading
                                                }
                                                onClick={(e) =>
                                                    handleDeletePhotoClick(
                                                        photo
                                                    )
                                                }
                                                disabled={photo.isMain}
                                                name={photo.id}
                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
            <Dialog
                open={deleteConfirmationOpen}
                onClose={() => handleDeleteConfirmationClose(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this photo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleDeleteConfirmationClose(true)}
                        color="red"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => handleDeleteConfirmationClose(false)}
                        color="green"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Tab.Pane>
    );
};

export default observer(ProfilePhotos);
