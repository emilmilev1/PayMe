import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { useStore } from "../../stores/store";
import { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { runInAction } from "mobx";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

interface FormValues {
    username: string;
    firstName: string | undefined;
    lastName: string | undefined;
    bio: string | undefined;
    error: string | null;
}

const ProfileEditForm = ({ setEditMode }: Props) => {
    const history = useHistory();

    const {
        profileStore: { profile, updateProfile, loadProfile },
        userStore,
    } = useStore();

    const [signUpError, setSignUpError] = useState(false);

    const formik = useFormik<FormValues>({
        initialValues: {
            username: profile?.username || "",
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            bio: profile?.bio,
            error: null,
        },
        onSubmit: async (data, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            try {
                setSignUpError(false);

                await updateProfile(data);

                runInAction(() => {
                    userStore.user!.username = data.username;
                });

                history.push(`/profiles/${data.username}`);
                await loadProfile(data.username);

                setEditMode(false);
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
            bio: Yup.string().required("Bio is required!"),
        }),
    });

    return (
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
                    formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
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
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
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
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                sx={{
                    background: "white",
                    borderRadius: "5px",
                    mt: 2,
                }}
            />
            <TextField
                fullWidth
                required
                id="bio"
                name="bio"
                placeholder="Biography"
                autoComplete="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
                multiline
                minRows={3}
                sx={{
                    background: "white",
                    borderRadius: "5px",
                    mt: 2,
                    width: "100%",
                }}
            />
            <Button
                type="submit"
                fullWidth
                color="success"
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
                disabled={
                    !formik.isValid || !formik.dirty || formik.isSubmitting
                }
            >
                Save Changes
            </Button>
        </form>
    );
};

export default observer(ProfileEditForm);
