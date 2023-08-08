import { CheckPaymentData } from "../../models/checkPaymentStore";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { format } from "date-fns";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import EditPaymentDialog from "./EditPaymentDialog";
import CheckPaymentStore from "../../stores/checkPaymentStore";
import { utcToZonedTime } from "date-fns-tz";

interface Props {
    payment: CheckPaymentData;
    checkPaymentStore: CheckPaymentStore;
    paymentNumber: number;
}

const TableEachPayment = ({
    payment,
    checkPaymentStore,
    paymentNumber,
}: Props) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleOpenEditDialog = () => {
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const handleDelete = () => {
        checkPaymentStore.deleteCheckPayment(payment.id);
        handleCloseDeleteDialog();
    };

    const paymentDateInBulgaria = utcToZonedTime(payment.date, "EET");
    const dateEET = format(paymentDateInBulgaria, "dd.MM.yyyy");
    const timeEET = format(paymentDateInBulgaria, "HH:mm a");

    const totalAmount =
        typeof payment.total === "number" ? payment.total.toFixed(2) : 0;

    return (
        <TableRow
            key={payment.id}
            sx={{
                "&:hover": {
                    backgroundColor: "rgba(255, 255, 0, 0.3)",
                },
            }}
        >
            <TableCell>{paymentNumber}</TableCell>
            <TableCell>{dateEET}</TableCell>
            <TableCell>{timeEET}</TableCell>
            <TableCell>{payment.firstName}</TableCell>
            <TableCell>{payment.lastName}</TableCell>
            <TableCell>{payment.address}</TableCell>
            <TableCell>{payment.country}</TableCell>
            <TableCell>{payment.zipCode}</TableCell>
            <TableCell align="center">
                <Button
                    style={{
                        border: "none",
                        outline: "none",
                        color: "green",
                    }}
                    onClick={() => console.log("Details")}
                >
                    Details
                </Button>
                <Button
                    style={{ border: "none", outline: "none" }}
                    onClick={handleOpenEditDialog}
                >
                    Edit
                </Button>
                <Button
                    style={{
                        border: "none",
                        outline: "none",
                        color: "red",
                    }}
                    onClick={handleOpenDeleteDialog}
                >
                    Delete
                </Button>
            </TableCell>
            <TableCell align="right">${totalAmount}</TableCell>
            {editDialogOpen && (
                <EditPaymentDialog
                    open={editDialogOpen}
                    onClose={handleCloseEditDialog}
                    payment={payment}
                    checkPaymentStore={checkPaymentStore}
                />
            )}
            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this payment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </TableRow>
    );
};

export default observer(TableEachPayment);
