import * as React from "react";
import Title from "./Title";
import { Button, Table, TableCell, TableHead, TableRow } from "@mui/material";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const SortBy = () => {
    const { checkPaymentStore } = useStore();

    const sortByLatestPayments = () => {
        checkPaymentStore.sortByLatestPayments();
    };

    const sortByOldestPayments = () => {
        checkPaymentStore.sortByOldestPayments();
    };

    const sortByHighestTotal = () => {
        checkPaymentStore.sortByHighestTotal();
    };

    const sortByLowestTotal = () => {
        checkPaymentStore.sortByLowestTotal();
    };

    return (
        <React.Fragment>
            <Title>Sort Deposits By</Title>
            <Button
                style={{
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    padding: "8px 16px",
                    margin: "5px",
                    color: "grey",
                }}
                onClick={sortByLatestPayments}
            >
                Latest
            </Button>
            <Button
                style={{
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    padding: "8px 16px",
                    margin: "5px",
                    color: "grey",
                }}
                onClick={sortByOldestPayments}
            >
                Oldest
            </Button>
            <Button
                style={{
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    padding: "8px 16px",
                    margin: "5px",
                    color: "grey",
                }}
                onClick={sortByHighestTotal}
            >
                Highest Total
            </Button>
            <Button
                style={{
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    padding: "8px 16px",
                    margin: "5px",
                    color: "grey",
                }}
                onClick={sortByLowestTotal}
            >
                Lowest Total
            </Button>
        </React.Fragment>
    );
};

export default observer(SortBy);
