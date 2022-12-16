import * as React from "react";
import { useState } from "react";
import { Dayjs } from "dayjs";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Container, Paper, Button } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CountrySelect from "../CountrySelect/CountrySelect";

export default function CreateCheck() {
    const [value, setValue] = useState<Dayjs | null>(null);

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
                            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                        >
                            <Typography variant="h6" gutterBottom>
                                User Data
                            </Typography>
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
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
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
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                href="/dashboard"
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Complete
                            </Button>
                        </Paper>
                    </Container>
                </Box>
            </LocalizationProvider>
        </React.Fragment>
    );
}
