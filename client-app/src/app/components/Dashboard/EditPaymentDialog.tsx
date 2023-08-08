import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
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
import CountrySelect from "../CountrySelect/CountrySelect";
import { zonedTimeToUtc } from "date-fns-tz";

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "total") {
            const parsedValue = parseFloat(value);
            setEditedPayment((prevPayment) => ({
                ...prevPayment,
                [name]:
                    !isNaN(parsedValue) && parsedValue > 0 ? parsedValue : 0,
            }));
        } else {
            setEditedPayment((prevPayment) => ({
                ...prevPayment,
                [name]: value,
            }));
        }
    };

    const handleSaveChanges = async () => {
        try {
            const currentTimeInTimeZone = zonedTimeToUtc(new Date(), "EET");

            const updatedCurrentPayment = {
                ...editedPayment,
                country: editedPayment.country,
                date: currentTimeInTimeZone,
            };

            await checkPaymentStore.updateCheckPayment(updatedCurrentPayment);
            checkPaymentStore.updateEditedPayment(updatedCurrentPayment);

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
                <Grid item xs={12} sm={5} pt={2} pb={2}>
                    <CountrySelect
                        setSelectedCountry={(country) =>
                            setEditedPayment((prevPayment) => ({
                                ...prevPayment,
                                country: country,
                            }))
                        }
                        selectedCountry={editedPayment.country}
                    />
                </Grid>
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
                    disabled={
                        !(
                            editedPayment.firstName &&
                            editedPayment.lastName &&
                            editedPayment.title &&
                            editedPayment.address &&
                            editedPayment.total > 0 &&
                            editedPayment.zipCode > 0 &&
                            editedPayment.country !== ""
                        )
                    }
                >
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(EditPaymentDialog);
