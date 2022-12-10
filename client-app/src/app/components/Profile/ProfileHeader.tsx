import {
    Divider,
    Grid,
    Header,
    Item,
    Segment,
    Statistic,
} from "semantic-ui-react";

export const ProfileHeader = () => {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image
                                avatar
                                size="small"
                                src={"/PayMe.png"}
                            />
                            <Item.Content verticalAlign="middle">
                                <Header as="h1" content={"Pesho"} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label="Followers" value={12} />
                        <Statistic label="Following" value={4} />
                    </Statistic.Group>
                    <Divider />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};
