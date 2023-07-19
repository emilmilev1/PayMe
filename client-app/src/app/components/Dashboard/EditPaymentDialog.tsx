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
import { Profile } from "../../models/profile";
import { format } from "date-fns";
import { CheckPaymentFormValues } from "../../models/checkPaymentStore";

interface PaymentDataEdit {
    id: string;
    date: Date;
    title: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    zipCode: number;
    total: number;
    isHost: boolean;
    hostUsername: string;
    checkAttendees: Profile[];
}

interface EditPaymentDialogProps {
    open: boolean;
    onClose: () => void;
    payment: PaymentDataEdit;
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedPayment((prevPayment) => ({
            ...prevPayment,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const currentTime = new Date();
            const currentDate = new Date();

            setEditedPayment((prevPayment: CheckPaymentFormValues) => ({
                ...prevPayment,
                date: currentDate,
                time: currentTime,
            }));

            await checkPaymentStore.updateCheckPayment(editedPayment);
            checkPaymentStore.updateEditedPayment(editedPayment);

            toast.success("Payment edited successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to edit payment");
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Payment</DialogTitle>
            <DialogContent>
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
