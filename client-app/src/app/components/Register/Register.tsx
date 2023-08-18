import * as React from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormValues {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
    error: string | null;
}

const SignUp = () => {
    const { userStore } = useStore();

    const [showPassword, setShowPassword] = useState(false);
    const [signUpError, setSignUpError] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            error: null,
        },
        onSubmit: async (data, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            try {
                setSignUpError(false);
                await userStore.register(data);
            } catch (error) {
                setSignUpError(true);
                setErrors({
                    error: formik.errors.error,
                });
                setTimeout(() => {
                    setSignUpError(false);
                }, 3500);
            }
            setSubmitting(false);
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required!"),
            firstName: Yup.string().required("First name is required!"),
            lastName: Yup.string().required("Last name is required!"),
            email: Yup.string().required("Email is required!").email(),
            password: Yup.string()
                .required("Please enter your password.")
                .min(8, "Your password is too short."),
            rePassword: Yup.string()
                .required("Please confirm your password.")
                .oneOf([Yup.ref("password")], "Passwords do not match."),
        }),
    });

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Container maxWidth={false}>
            <CssBaseline />
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    marginTop: "30px",
                    padding: "0px 30px 30px 30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 5, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up to Pay Me
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
                        id="username"
                        label="Username"
                        name="username"
                        placeholder="username"
                        autoComplete="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.username &&
                            Boolean(formik.errors.username)
                        }
                        helperText={
                            formik.touched.username && formik.errors.username
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
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        placeholder="firstName"
                        autoComplete="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                        }
                        helperText={
                            formik.touched.firstName && formik.errors.firstName
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
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        placeholder="lastName"
                        autoComplete="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.lastName &&
                            Boolean(formik.errors.lastName)
                        }
                        helperText={
                            formik.touched.lastName && formik.errors.lastName
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
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{
                            background: "white",
                            borderRadius: "5px",
                            mt: 2,
                        }}
                    />
                    <TextField
                        fullWidth
                        required
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
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
                                                backgroundColor: "transparent",
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
                        color="success"
                        variant="contained"
                        sx={{ mt: 3, mb: 3 }}
                        disabled={
                            !formik.isValid ||
                            !formik.dirty ||
                            formik.isSubmitting
                        }
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login">Sign in?</Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default observer(SignUp);
