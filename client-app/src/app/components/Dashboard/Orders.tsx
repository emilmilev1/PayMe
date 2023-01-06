import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import Pagination from "./Pagination";
import OrdersListItems from "./OrdersListItems";

const Orders = () => {
    const { checkPaymentStore } = useStore();
    const { pagination } = checkPaymentStore;

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
                <OrdersListItems />
            </Table>
            {/* <Pagination
                currentPage={pagination!.currentPage}
                itemsPerPage={pagination!.itemsPerPage}
                totalItems={pagination!.totalItems}
                totalPages={pagination!.totalPages}
            /> */}
        </Fragment>
    );
};

export default observer(Orders);
