import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Container, Paper } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CountrySelect from "../CountrySelect/CountrySelect";
import { CheckPaymentFormValues } from "../../models/checkPaymentStore";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { v4 as uuid } from "uuid";
import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function CreateCheck() {
    const history = useHistory();
    const { checkPaymentStore } = useStore();

    const { createCheckPayment, updateCheckPayment, loadCheckPayment } =
        checkPaymentStore;
    const { id } = useParams<{ id: string }>();

    const [checkPayment, setCheckPayment] = useState<CheckPaymentFormValues>(
        () => ({
            id: "",
            title: "",
            firstName: "",
            lastName: "",
            address: "",
            total: 0,
            country: "",
            zipCode: 0,
            date: null,
            isHost: undefined,
            hostUsername: "",
            checkAttendees: [],
        })
    );

    const [selectedCountry, setSelectedCountry] = useState<string>("");

    useEffect(() => {
        if (id) {
            loadCheckPayment(id).then((checkPayment) =>
                setCheckPayment(new CheckPaymentFormValues(checkPayment))
            );
        }
    }, [id, loadCheckPayment]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const isFormValid =
            checkPayment.firstName &&
            checkPayment.lastName &&
            checkPayment.title &&
            checkPayment.address &&
            checkPayment.total >= 0 &&
            checkPayment.zipCode >= 0 &&
            checkPayment.date !== null;

        if (isFormValid) {
            if (!checkPayment.id) {
                const currentTime = new Date();

                const newCheckPayment = {
                    ...checkPayment,
                    id: uuid(),
                    country: selectedCountry,
                    date: currentTime,
                };

                createCheckPayment(newCheckPayment).then(() =>
                    history.push(`/dashboard`)
                );
            } else {
                updateCheckPayment(checkPayment).then(() =>
                    history.push(`/CheckPayments/${checkPayment.id}`)
                );
            }
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    sx={{ flexGrow: 1, pt: 5 }}
                >
                    Create Payment
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Container sx={{ padding: 5 }}>
                        <Paper
                            variant="outlined"
                            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                        >
                            <Typography variant="h6" gutterBottom>
                                User Data
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstNameSender"
                                            name="firstNameSender"
                                            label="First name"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            value={checkPayment.firstName}
                                            onChange={(e) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    firstName: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastNameSender"
                                            name="lastNameSender"
                                            label="Last name"
                                            fullWidth
                                            autoComplete="family-name"
                                            variant="standard"
                                            value={checkPayment.lastName}
                                            onChange={(e) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    lastName: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="title"
                                            name="title"
                                            label="Title"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            value={checkPayment.title}
                                            onChange={(e) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="address2"
                                            name="address2"
                                            label="Address line"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                            variant="standard"
                                            value={checkPayment.address}
                                            onChange={(e) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <CountrySelect
                                            setSelectedCountry={
                                                setSelectedCountry
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ pt: 3, pb: 3 }}
                                >
                                    Payment data
                                </Typography>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                        <DatePicker
                                            label="Date Payment"
                                            value={checkPayment.date}
                                            onChange={(newValue) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    date: newValue,
                                                })
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    required
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="state"
                                            name="Total"
                                            type="number"
                                            label="Total"
                                            fullWidth
                                            variant="standard"
                                            value={checkPayment.total}
                                            onChange={(e) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    total: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="zip"
                                            name="zip"
                                            label="Zip / Postal code"
                                            fullWidth
                                            autoComplete="shipping postal-code"
                                            variant="standard"
                                            value={checkPayment.zipCode}
                                            onChange={(e) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    zipCode: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "right",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{
                                            backgroundColor: "#4caf50",
                                            color: "#fff",
                                        }}
                                        disabled={
                                            !(
                                                checkPayment.firstName &&
                                                checkPayment.lastName &&
                                                checkPayment.title &&
                                                checkPayment.address &&
                                                checkPayment.total > 0 &&
                                                checkPayment.zipCode > 0 &&
                                                checkPayment.date !== null
                                            )
                                        }
                                    >
                                        Complete
                                    </Button>
                                </Box>
                            </form>
                        </Paper>
                    </Container>
                </Box>
            </LocalizationProvider>
        </React.Fragment>
    );
}
