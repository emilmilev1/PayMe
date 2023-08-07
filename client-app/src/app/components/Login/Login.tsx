import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import * as Yup from "yup";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

interface FormValues {
    email: string;
    password: string;
    error: string | null;
}

const SignIn = () => {
    const { userStore, commonStore } = useStore();

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues: { email: "", password: "", error: null },
        onSubmit: async (data, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            try {
                setLoginError(false);
                await userStore.login(data, rememberMe);
            } catch (error) {
                setLoginError(true);
                setErrors({
                    error: "Incorrect email or password!",
                });
                setTimeout(() => {
                    setLoginError(false);
                }, 3500);
            }
            setSubmitting(false);
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Email is required!").email(),
            password: Yup.string()
                .required("Please enter your password.")
                .min(8, "Your password is too short."),
        }),
    });

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleRememberMe = () => {
        setRememberMe((prevRememberMe) => !prevRememberMe);
        commonStore.setUserRemembered(!rememberMe);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 5, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={formik.handleSubmit} noValidate>
                    {loginError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {formik.errors.error}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
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
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="success"
                                checked={rememberMe}
                                onChange={handleRememberMe}
                            />
                        }
                        label="Remember me"
                        sx={{ pt: 2 }}
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/reset-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default observer(SignIn);
