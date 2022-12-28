import * as React from "react";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Container, Paper } from "@mui/material";
import { Button } from "semantic-ui-react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CountrySelect from "../CountrySelect/CountrySelect";
import { CheckPaymentFormValues } from "../../models/checkPaymentStore";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";

export default function CreateCheck() {
    const history = useHistory();

    const { checkPaymentStore } = useStore();
    const { createCheckPayment, updateCheckPayment, loadCheckPayment } =
        checkPaymentStore;
    const { id } = useParams<{ id: string }>();

    const [checkPayment, setCheckPayment] = useState<CheckPaymentFormValues>(
        new CheckPaymentFormValues()
    );

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDateValue] = useState<Dayjs | null>(null);
    const [total, setTotal] = useState("");
    const [zipCode, setZipCode] = useState("");

    const body = {
        firstName,
        lastName,
        address,
        date,
        total,
        zipCode,
    };

    useEffect(() => {
        if (id)
            loadCheckPayment(id).then((checkPayment) =>
                setCheckPayment(new CheckPaymentFormValues(checkPayment))
            );
    }, [id, loadCheckPayment]);

    function handleSubmit(checkPayment: CheckPaymentFormValues) {
        if (!checkPayment.id) {
            let newCheckPayment = {
                ...checkPayment,
                id: uuid(),
            };

            createCheckPayment(newCheckPayment).then(() =>
                history.push(`/CheckPayments/${newCheckPayment.id}`)
            );
        } else {
            updateCheckPayment(checkPayment).then(() =>
                history.push(`/CheckPayments/${checkPayment.id}`)
            );
        }
    }

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
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Container sx={{ padding: 5 }}>
                        <Paper
                            variant="outlined"
                            sx={{
                                my: { xs: 3, md: 6 },
                                p: { xs: 2, md: 3 },
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                User Data
                            </Typography>
                            <form>
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
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
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
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="address2"
                                            name="address2"
                                            label="Address line"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                            variant="standard"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CountrySelect />
                                    </Grid>
                                </Grid>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{ pt: 3, pb: 3 }}
                                >
                                    Payment data
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <DatePicker
                                            label="Date Payment"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDateValue(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="state"
                                            name="Total"
                                            type="number"
                                            label="Total"
                                            fullWidth
                                            variant="standard"
                                            value={total}
                                            onChange={(e) =>
                                                setTotal(e.target.value)
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
                                            value={zipCode}
                                            onChange={(e) =>
                                                setZipCode(e.target.value)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    positive
                                    floated="right"
                                    type="submit"
                                    content="Complete"
                                    to="/dashboard"
                                    variant="contained"
                                    sx={{ mb: 5, ml: 1 }}
                                />
                            </form>
                        </Paper>
                    </Container>
                </Box>
            </LocalizationProvider>
        </React.Fragment>
    );
}
