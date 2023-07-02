import { CheckPaymentData } from "../../models/checkPaymentStore";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";

interface Props {
    payment: CheckPaymentData;
}

const TableEachPayment = ({ payment }: Props) => {
    return (
        <TableRow key={payment.id}>
            <TableCell>{format(payment.date, "dd MMM yyyy")}</TableCell>
            <TableCell>{format(payment.date, "h:mm aa")}</TableCell>
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
                    onClick={() => console.log("Edit")}
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
            <TableCell align="right">{payment.total.toFixed(2)}</TableCell>
        </TableRow>
    );
};

export default observer(TableEachPayment);
