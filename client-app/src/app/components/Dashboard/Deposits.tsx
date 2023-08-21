import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Button } from "@mui/material";
import { useStore } from "../../stores/store";

const Deposits = () => {
    const { checkPaymentStore } = useStore();
    const [totalAmount, setTotalAmount] = React.useState<number | null>(null);

    React.useEffect(() => {
        const fetchTotalAmount = async () => {
            try {
                const amount = await checkPaymentStore.getTotalPaymentsAmount();
                if (typeof amount === "number") {
                    setTotalAmount(amount);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTotalAmount();
    }, [checkPaymentStore]);

    return (
        <React.Fragment>
            <Title>Recent Total</Title>
            {totalAmount !== null ? (
                <Typography
                    component="p"
                    variant="h4"
                    sx={{ p: 1, mt: 2, color: "green" }}
                >
                    ${totalAmount.toFixed(2)}
                </Typography>
            ) : (
                <Typography component="p" variant="h4">
                    Loading...
                </Typography>
            )}
            <Button
                sx={{ p: 2, mt: 5, fontSize: 18 }}
                color="primary"
                href="/create-payment"
            >
                Add Payment
            </Button>
        </React.Fragment>
    );
};

export default Deposits;
