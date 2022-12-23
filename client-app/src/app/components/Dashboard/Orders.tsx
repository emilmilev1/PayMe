import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button } from "@mui/material";
import { useStore } from "../../stores/store";
import TableEachPayment from "./TableEachPayment";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";

const Orders = () => {
    const { checkPaymentStore } = useStore();
    const { groupedPayments } = checkPaymentStore;

    return (
        <Fragment>
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
                    {groupedPayments.map(([group, payments]) => (
                        <Fragment>
                            {payments.map((payment) => (
                                <TableEachPayment
                                    key={payment.id}
                                    payment={payment}
                                />
                            ))}
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    );
};

export default observer(Orders);
