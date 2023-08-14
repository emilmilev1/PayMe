import React from "react";
import { Tab } from "semantic-ui-react";
import { ProfileAbout } from "./ProfileAbout";
import { ProfilePhotos } from "./ProfilePhotos";
import { ArchivedPayments } from "./ArchivedPayments";
import { useStore } from "../../stores/store";
import { Profile } from "../../models/profile";
import { observer } from "mobx-react-lite";

interface Props {
    profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
    const { profileStore } = useStore();

    const panes = [
        {
            menuItem: "About Me",
            render: () => <ProfileAbout />,
        },
        {
            menuItem: "Photos",
            render: () => <ProfilePhotos profile={profile} />,
        },
        {
            menuItem: "Archived Payments",
            render: () => <ArchivedPayments />,
        },
    ];

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition="left"
            panes={panes}
        />
    );
};

export default observer(ProfileContent);
