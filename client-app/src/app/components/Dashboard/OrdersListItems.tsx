import * as React from "react";
import TableBody from "@mui/material/TableBody";
import { useStore } from "../../stores/store";
import TableEachPayment from "./TableEachPayment";
import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";

const OrdersListItems = () => {
    const { checkPaymentStore } = useStore();
    const { groupedPayments } = checkPaymentStore;

    return (
        <Fragment>
            <TableBody>
                {groupedPayments.map(([group, payments]) => (
                    <Fragment>
                        <Header sub color="teal">
                            {group}
                        </Header>
                        {payments.map((payment) => (
                            <TableEachPayment
                                key={payment.id}
                                payment={payment}
                            />
                        ))}
                    </Fragment>
                ))}
            </TableBody>
        </Fragment>
    );
};

export default observer(OrdersListItems);
