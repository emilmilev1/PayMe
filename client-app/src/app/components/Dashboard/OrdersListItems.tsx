import TableBody from "@mui/material/TableBody";
import { useStore } from "../../stores/store";
import TableEachPayment from "./TableEachPayment";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";

const OrdersListItems = () => {
    const { checkPaymentStore } = useStore();
    const { checkPayments, pagination } = checkPaymentStore;

    if (!pagination) return null;

    return (
        <TableBody>
            {checkPayments.map((payment, index) => (
                <TableEachPayment
                    key={payment.id}
                    payment={payment}
                    checkPaymentStore={checkPaymentStore}
                />
            ))}
        </TableBody>
    );
};

export default observer(OrdersListItems);
