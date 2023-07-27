import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useFormik } from "formik";
import * as Yup from "yup";

const theme = createTheme();

interface FormValues {
    email: string;
    error: string | null;
}

const ForgotPassword = () => {
    const { userStore } = useStore();

    const formik = useFormik<FormValues>({
        initialValues: { email: "", error: null },
        onSubmit: async (data, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            try {
                await userStore.doesEmailExist(data.email);
                await userStore.changePassword(data.email);
            } catch (error) {
                setErrors({
                    error: "Incorrect email or password!",
                });
            }
            setSubmitting(false);
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required!").email(),
        }),
    });

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 5, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            id="reset-email"
                            margin="normal"
                            required
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            sx={{
                                background: "white",
                                borderRadius: "5px",
                                mt: 2,
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={
                                !formik.isValid ||
                                !formik.dirty ||
                                formik.isSubmitting
                            }
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send email
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/login">Sign in?</Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ForgotPassword;
