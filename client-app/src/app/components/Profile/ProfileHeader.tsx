import { Grid, Header, Item, Segment } from "semantic-ui-react";

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
            </Grid>
        </Segment>
    );
};
