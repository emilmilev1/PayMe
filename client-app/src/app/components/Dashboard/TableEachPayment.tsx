import { CheckPaymentData } from "../../models/checkPaymentStore";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { format } from "date-fns";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import EditPaymentDialog from "./EditPaymentDialog";
import CheckPaymentStore from "../../stores/checkPaymentStore";
import { utcToZonedTime } from "date-fns-tz";
import { useStore } from "../../stores/store";

interface Props {
    payment: CheckPaymentData;
    checkPaymentStore: CheckPaymentStore;
}

const TableEachPayment = ({ payment, checkPaymentStore }: Props) => {
    const { userStore } = useStore();

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

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

    const handleOpenDetailsDialog = () => {
        setDetailsDialogOpen(true);
    };

    const handleCloseDetailsDialog = () => {
        setDetailsDialogOpen(false);
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
            <TableCell>{payment.paymentNumber}</TableCell>
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
                    onClick={handleOpenDetailsDialog}
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
            <Dialog
                open={detailsDialogOpen}
                onClose={handleCloseDetailsDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle style={{ textAlign: "center" }}>
                    Details
                </DialogTitle>
                <DialogContent style={{ textAlign: "center" }}>
                    <Typography variant="body1" gutterBottom>
                        <strong>User Details:</strong>
                    </Typography>
                    <Typography variant="body1">
                        <strong>Username:</strong> {userStore.user?.username}
                    </Typography>
                    <Typography variant="body1">
                        <strong>First Name:</strong> {userStore.user?.firstName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Last Name:</strong> {userStore.user?.lastName}
                    </Typography>
                </DialogContent>
                <DialogContent style={{ textAlign: "center" }}>
                    <Typography variant="body1" gutterBottom>
                        <strong>Payment Details:</strong>
                    </Typography>
                    <Typography variant="body1">
                        <strong>Payment Number:</strong> {payment.paymentNumber}
                    </Typography>
                    <Typography variant="body1">
                        <strong>First Name:</strong> {payment.firstName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Last Name:</strong> {payment.lastName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Address:</strong> {payment.address}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Country:</strong> {payment.country}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Zip Code:</strong> {payment.zipCode}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Created On:</strong> {dateEET}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Created On:</strong> {timeEET}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailsDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </TableRow>
    );
};

export default observer(TableEachPayment);
