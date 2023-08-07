import * as React from "react";
import Title from "./Title";
import { Button, Table, TableCell, TableHead, TableRow } from "@mui/material";
import { useStore } from "../../stores/store";

const SortBy = () => {
    const { checkPaymentStore } = useStore();

    return (
        <React.Fragment>
            <Title>Sort Deposits By</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right" colSpan={9}>
                            <Button
                                style={{ border: "none", outline: "none" }}
                                onClick={() => console.log("By current month")}
                            >
                                Current month
                            </Button>
                            <Button
                                style={{ border: "none", outline: "none" }}
                                onClick={() => console.log("By Highest")}
                            >
                                Highest Total
                            </Button>
                            <Button
                                style={{ border: "none", outline: "none" }}
                                onClick={() => console.log("By Lowest")}
                            >
                                Lowest Total
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </React.Fragment>
    );
};

export default SortBy;
