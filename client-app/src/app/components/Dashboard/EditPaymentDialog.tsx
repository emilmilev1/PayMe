import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import CheckPaymentStore from "../../stores/checkPaymentStore";
import {
    CheckPaymentData,
    CheckPaymentFormValues,
} from "../../models/checkPaymentStore";
import { useHistory } from "react-router";
import { useStore } from "../../stores/store";

interface EditPaymentDialogProps {
    open: boolean;
    onClose: () => void;
    payment: CheckPaymentData;
    checkPaymentStore: CheckPaymentStore;
}

const EditPaymentDialog: React.FC<EditPaymentDialogProps> = ({
    open,
    onClose,
    payment,
    checkPaymentStore,
}) => {
    const [editedPayment, setEditedPayment] = useState<CheckPaymentFormValues>({
        ...payment,
    });
    const history = useHistory();
    const { userStore } = useStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedPayment((prevPayment) => ({
            ...prevPayment,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            setEditedPayment((prevPayment: CheckPaymentFormValues) => ({
                ...prevPayment,
            }));

            const result = await checkPaymentStore.updateCheckPayment(
                editedPayment
            );

            checkPaymentStore.updateEditedPayment(editedPayment);

            toast.success("Payment updated successfully");
            history.push(`/dashboard`);
            onClose();
        } catch (error) {
            toast.error("Failed to update payment");
            history.push(`/dashboard`);
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Payment</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    name="title"
                    value={editedPayment.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="First Name"
                    name="firstName"
                    value={editedPayment.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={editedPayment.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    name="address"
                    value={editedPayment.address}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Country"
                    name="country"
                    value={editedPayment.country}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Zip Code"
                    name="zipCode"
                    value={editedPayment.zipCode}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Total"
                    name="total"
                    value={editedPayment.total}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSaveChanges}
                    variant="contained"
                    color="primary"
                >
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(EditPaymentDialog);
