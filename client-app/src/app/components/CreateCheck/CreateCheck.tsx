import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button, CircularProgress, Container, Paper } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CountrySelect from "../CountrySelect/CountrySelect";
import { CheckPaymentFormValues } from "../../models/checkPaymentStore";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { format, zonedTimeToUtc } from "date-fns-tz";

export default function CreateCheck() {
    const history = useHistory();
    const { checkPaymentStore } = useStore();

    const { createCheckPayment, loadCheckPayment } = checkPaymentStore;
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
            date: new Date(),
            isHost: undefined,
            hostUsername: "",
            checkAttendees: [],
        })
    );

    const [selectedCountry, setSelectedCountry] = useState<string>("");

    useEffect(() => {
        if (id) {
            loadCheckPayment(id).then((checkPayment) => {
                setCheckPayment(new CheckPaymentFormValues(checkPayment));
                setSelectedCountry(checkPayment!.country);
            });
        }
    }, [id, loadCheckPayment]);

    const isFormValid =
        checkPayment.firstName &&
        checkPayment.lastName &&
        checkPayment.title &&
        checkPayment.address &&
        checkPayment.total >= 0 &&
        checkPayment.zipCode >= 0 &&
        selectedCountry !== "" &&
        checkPayment.date !== null;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isFormValid) {
            try {
                const currentTimeInTimeZone = zonedTimeToUtc(new Date(), "EET");

                const newCheckPayment = {
                    ...checkPayment,
                    id: uuid(),
                    country: selectedCountry,
                    date: currentTimeInTimeZone,
                };

                await createCheckPayment(newCheckPayment);
                toast.success("Payment created successfully!");
                history.push(`/dashboard`);
            } catch (error) {
                toast.error("Error occurred while creating payment.");
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
                                            fullWidth
                                            required
                                            id="firstNameSender"
                                            name="firstNameSender"
                                            label="First name"
                                            autoComplete="firstNameSender"
                                            variant="filled"
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
                                            fullWidth
                                            required
                                            id="lastNameSender"
                                            name="lastNameSender"
                                            label="Last name"
                                            autoComplete="lastNameSender"
                                            variant="filled"
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
                                            fullWidth
                                            required
                                            id="title"
                                            name="title"
                                            label="Title"
                                            autoComplete="title"
                                            variant="filled"
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
                                            fullWidth
                                            required
                                            id="address2"
                                            name="address2"
                                            label="Address line"
                                            autoComplete="address2"
                                            variant="filled"
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
                                            selectedCountry={selectedCountry}
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
                                            disabled
                                            label="Date Payment"
                                            value={checkPayment.date}
                                            onChange={(newValue) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    date:
                                                        newValue instanceof Date
                                                            ? newValue
                                                            : null,
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
                                            fullWidth
                                            required
                                            id="total"
                                            name="Total"
                                            type="number"
                                            label="Total"
                                            variant="filled"
                                            value={
                                                checkPayment.total === 0
                                                    ? ""
                                                    : checkPayment.total
                                            }
                                            onChange={(e) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    total:
                                                        e.target.value === ""
                                                            ? 0
                                                            : parseFloat(
                                                                  e.target.value
                                                              ),
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="zip"
                                            name="zip"
                                            type="number"
                                            label="Zip / Postal code"
                                            autoComplete="zip"
                                            variant="filled"
                                            value={
                                                checkPayment.zipCode === 0
                                                    ? ""
                                                    : checkPayment.zipCode
                                            }
                                            onChange={(e) =>
                                                setCheckPayment({
                                                    ...checkPayment,
                                                    zipCode:
                                                        e.target.value === ""
                                                            ? 0
                                                            : parseInt(
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
                                        sx={{
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
                                                selectedCountry !== "" &&
                                                checkPayment.date !== null
                                            )
                                        }
                                        onClick={handleSubmit}
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
