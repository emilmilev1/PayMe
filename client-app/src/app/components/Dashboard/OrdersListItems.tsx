import TableBody from "@mui/material/TableBody";
import { useStore } from "../../stores/store";
import TableEachPayment from "./TableEachPayment";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";

const OrdersListItems = () => {
    const { checkPaymentStore } = useStore();
    const { groupedPayments, pagination } = checkPaymentStore;

    if (!pagination) return null;

    return (
        <TableBody>
            {groupedPayments.map(([group, payments]) => (
                <Fragment key={group}>
                    {payments.map((payment) => (
                        <TableEachPayment key={payment.id} payment={payment} />
                    ))}
                </Fragment>
            ))}
        </TableBody>
    );
};

export default observer(OrdersListItems);
