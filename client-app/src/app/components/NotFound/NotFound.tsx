import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFound = () => (
    <Segment placeholder>
        <Header icon>
            <Typography sx={{ paddingTop: 25 }}>
                <Icon name="search" />
                Oops - we have looked everywhere and could not find this.
            </Typography>
        </Header>
        <Segment.Inline>
            <Typography sx={{ paddingBottom: 25 }}>
                <Button as={Link} to="/" primary>
                    Return to home page
                </Button>
            </Typography>
        </Segment.Inline>
    </Segment>
);

export default NotFound;
