import TableBody from "@mui/material/TableBody";
import { useStore } from "../../stores/store";
import TableEachPayment from "./TableEachPayment";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";

const OrdersListItems = () => {
    const { checkPaymentStore } = useStore();
    const { checkPayments, pagination, pagingParams } = checkPaymentStore;

    if (!pagination) return null;

    const startIndex = (pagingParams.pageNumber - 1) * pagination.itemsPerPage;

    return (
        <TableBody>
            {checkPayments.map((payment, index) => (
                <TableEachPayment
                    key={payment.id}
                    payment={payment}
                    checkPaymentStore={checkPaymentStore}
                    paymentNumber={startIndex + index + 1}
                />
            ))}
        </TableBody>
    );
};

export default observer(OrdersListItems);
