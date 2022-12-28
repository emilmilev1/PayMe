import * as React from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { ErrorMessage, Form, Formik } from "formik";
import ValidationErrors from "../common/ValidationErrors";
import { Button, Header } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../Forms/MyTextInput";

const SignUp = () => {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                rePassword: "",
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .register(values)
                    .catch((error) => setErrors({ error }))
            }
            validationSchema={Yup.object({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string()
                    .required("Please enter your password.")
                    .min(8, "Your password is too short."),
                rePassword: Yup.string()
                    .required("Please retype your password.")
                    .oneOf(
                        [Yup.ref("password")],
                        "Your passwords do not match."
                    ),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form
                    className="ui form error"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <Header
                        as="h2"
                        content="Sign up to Pay Me"
                        color="teal"
                        textAlign="center"
                    />
                    <MyTextInput name="firstName" placeholder="First Name" />
                    <MyTextInput name="lastName" placeholder="Last Name" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput
                        name="password"
                        placeholder="Password"
                        type="password"
                    />
                    <MyTextInput
                        name="confirm-password"
                        placeholder="Confirm Password"
                        type="password"
                    />
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <ValidationErrors errors={errors.error} />
                        )}
                    />
                    <Button
                        disabled={isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        positive
                        content="Register"
                        type="submit"
                        sx={{ mt: 3, mb: 2 }}
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
};

export default observer(SignUp);
