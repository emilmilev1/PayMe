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
import { useState } from "react";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme();

interface FormValues {
    email: string;
    password: string;
    rePassword: string;
    error: string | null;
}

const ForgotPassword = () => {
    const { userStore } = useStore();

    const [showPassword, setShowPassword] = useState(false);
    const [signUpError, setSignUpError] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues: { email: "", password: "", rePassword: "", error: null },
        onSubmit: async (data, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            try {
                setSignUpError(false);
                await userStore.doesEmailExist(data.email);
                if (userStore.doesUserEmailExist) {
                    await userStore.changePassword(data.email, data.password);
                } else {
                    console.log("Email does not exist");
                }
            } catch (error: any) {
                setSignUpError(true);
                setErrors({
                    error: "Password change failed. Please try again.",
                });
                setTimeout(() => {
                    setSignUpError(false);
                }, 3500);
            }
            setSubmitting(false);
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required!").email(),
            password: Yup.string()
                .required("Please enter your new password.")
                .min(8, "Your new password is too short."),
            rePassword: Yup.string()
                .required("Please confirm your new password.")
                .oneOf([Yup.ref("password")], "New passwords do not match."),
        }),
    });

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

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
                        {signUpError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {formik.errors.error}
                            </Alert>
                        )}
                        <TextField
                            fullWidth
                            required
                            id="reset-email"
                            margin="normal"
                            label="Email"
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
                        <TextField
                            fullWidth
                            required
                            id="newPassword"
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="newPassword"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                            sx={{
                                background: "white",
                                borderRadius: "5px",
                                mt: 2,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={handleShowPassword}
                                            size="small"
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor:
                                                        "transparent",
                                                },
                                                "&:focus": {
                                                    outline: "none",
                                                },
                                                "&:active": {
                                                    outline: "none",
                                                },
                                            }}
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            id="rePassword"
                            name="rePassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="rePassword"
                            value={formik.values.rePassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.rePassword &&
                                Boolean(formik.errors.rePassword)
                            }
                            helperText={
                                formik.touched.rePassword &&
                                formik.errors.rePassword
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
