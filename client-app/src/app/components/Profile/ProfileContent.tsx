import React from "react";
import { Tab } from "semantic-ui-react";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileMyChecks } from "./ProfileMyChecks";
import { ProfilePhotos } from "./ProfilePhotos";

export const ProfileContent = () => {
    const panes = [
        { menuItem: "About", render: () => <ProfileAbout /> },
        {
            menuItem: "Photos",
            render: () => <ProfilePhotos />,
        },
        {
            menuItem: "My Checks",
            render: () => <ProfileMyChecks />,
        },
    ];

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition="right"
            panes={panes}
        />
    );
};
