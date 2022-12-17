import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button } from "@mui/material";

/*interface ICreateData {
    id: number;
    date: Date;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    total: number;
    zipCode: number;
}*/

const Orders = () => {
    return (
        <React.Fragment>
            <Title>Recent Payments</Title>
            <TableCell align="right">
                <Button>Sort by current month</Button>
                <Button>Sort by Highest</Button>
                <Button>Sort by Lowest</Button>
            </TableCell>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Zip Code</TableCell>
                        <TableCell align="center">Options</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={1}>
                        <TableCell>24.03.2001</TableCell>
                        <TableCell>Gogo</TableCell>
                        <TableCell>Gogev</TableCell>
                        <TableCell>Sofia, 123</TableCell>
                        <TableCell>Bulgaria</TableCell>
                        <TableCell>4000</TableCell>
                        <TableCell align="center">
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                            <Button>Details</Button>
                        </TableCell>
                        <TableCell align="right">{`$12334.00`}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/* Pagination */}
        </React.Fragment>
    );
};

export default Orders;
