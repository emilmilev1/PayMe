import React from "react";
import { Tab } from "semantic-ui-react";
import { ProfileAbout } from "./ProfileAbout";
import { ProfilePhotos } from "./ProfilePhotos";

export const ProfileContent = () => {
    const panes = [
        { menuItem: "About", render: () => <ProfileAbout /> },
        {
            menuItem: "Photos",
            render: () => <ProfilePhotos />,
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
