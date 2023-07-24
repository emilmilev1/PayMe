import { CheckPaymentData } from "../../models/checkPaymentStore";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import EditPaymentDialog from "./EditPaymentDialog";
import CheckPaymentStore from "../../stores/checkPaymentStore";
import { utcToZonedTime } from "date-fns-tz";

interface Props {
    payment: CheckPaymentData;
    checkPaymentStore: CheckPaymentStore;
}

const TableEachPayment = ({ payment, checkPaymentStore }: Props) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleOpenEditDialog = () => {
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const dateEET = format(
        utcToZonedTime(payment.date, "Europe/Sofia"),
        "dd MMM yyyy"
    );
    const timeEET = format(
        utcToZonedTime(payment.date, "Europe/Sofia"),
        "h:mm aa"
    );

    const totalAmount =
        typeof payment.total === "number" ? payment.total.toFixed(2) : "N/A";

    return (
        <TableRow key={payment.id}>
            <TableCell>{dateEET}</TableCell>
            <TableCell>{timeEET}</TableCell>
            <TableCell>{payment.firstName}</TableCell>
            <TableCell>{payment.lastName}</TableCell>
            <TableCell>{payment.address}</TableCell>
            <TableCell>{payment.country}</TableCell>
            <TableCell>{payment.zipCode}</TableCell>
            <TableCell align="center">
                <Button
                    style={{ border: "none", outline: "none", color: "green" }}
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
                    style={{ border: "none", outline: "none", color: "red" }}
                    onClick={() => console.log("Delete")}
                >
                    Delete
                </Button>
            </TableCell>
            <TableCell align="right">{totalAmount}</TableCell>
            {editDialogOpen && (
                <EditPaymentDialog
                    open={editDialogOpen}
                    onClose={handleCloseEditDialog}
                    payment={payment}
                    checkPaymentStore={checkPaymentStore}
                />
            )}
        </TableRow>
    );
};

export default observer(TableEachPayment);
