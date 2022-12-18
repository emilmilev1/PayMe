import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button } from "@mui/material";
import { useStore } from "../../stores/store";
import { format } from "date-fns";

const Orders = () => {
    const { checkPaymentStore } = useStore();
    const { checkPaymentsByDate } = checkPaymentStore;

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
                    {checkPaymentsByDate.map((payment) => (
                        <TableRow key={1}>
                            <TableCell>
                                {format(payment.date!, "dd MMM yyyy h:mm aa")}
                            </TableCell>
                            <TableCell>{payment.firstName}</TableCell>
                            <TableCell>{payment.lastName}</TableCell>
                            <TableCell>{payment.address}</TableCell>
                            <TableCell>{payment.country}</TableCell>
                            <TableCell>{payment.zipCode}</TableCell>
                            <TableCell align="center">
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                                <Button>Details</Button>
                            </TableCell>
                            <TableCell align="right">
                                {payment.total.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Pagination */}
        </React.Fragment>
    );
};

export default Orders;
