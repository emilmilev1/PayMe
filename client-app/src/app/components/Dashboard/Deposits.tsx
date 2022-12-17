import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Button } from "@mui/material";

// function preventDefault(event: React.MouseEvent) {
//     event.preventDefault();
// }

export default function Deposits() {
    return (
        <React.Fragment>
            <Title>Recent Deposits</Title>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography>
            <Button color="primary" href="/create-payment">
                Add Payment
            </Button>
        </React.Fragment>
    );
}
