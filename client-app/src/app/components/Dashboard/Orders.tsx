import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Box, Button, TableBody, Typography } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import OrdersListItems from "./OrdersListItems";
import Pagination from "./Pagination/Pagination";

const Orders = () => {
    const { checkPaymentStore } = useStore();
    const { loadCheckPayments, pagination, pagingParams, setPagingParams } =
        checkPaymentStore;

    useEffect(() => {
        loadCheckPayments();
    }, [loadCheckPayments]);

    const handlePageChange = (page: number) => {
        setPagingParams({
            ...pagingParams,
            pageNumber: page,
        });
    };

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={9}>
                            <Title>Recent Payments</Title>
                        </TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: "rgba(0, 0, 255, 0.1)" }}>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
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
                {pagination?.totalItems === 0 && (
                    <TableRow>
                        <TableCell align="center" colSpan={9}>
                            <Title>No payments to display</Title>
                        </TableCell>
                    </TableRow>
                )}
            </Table>
            <Pagination
                currentPage={pagingParams.pageNumber}
                totalPages={pagination ? pagination.totalPages : 0}
                totalItems={pagination ? pagination.totalItems : 0}
                onPageChange={handlePageChange}
                itemsPerPage={pagination ? pagination.itemsPerPage : 0}
            />
        </Fragment>
    );
};

export default observer(Orders);
