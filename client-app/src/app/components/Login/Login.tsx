import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import MyTextInput from "../Forms/MyTextInput";
import * as Yup from "yup";

const SignIn = () => {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: "", password: "", error: null }}
            onSubmit={async (data, { setErrors, setSubmitting }) => {
                setSubmitting(true);
                await userStore
                    .login(data)
                    .catch((error) =>
                        setErrors({ error: error.response.data })
                    );
                setSubmitting(false);
            }}
            validationSchema={Yup.object({
                email: Yup.string().required("Email is required!").email(),
                password: Yup.string()
                    .required("Please enter your password.")
                    .min(8, "Your password is too short."),
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
                        content="Log in to Pay Me"
                        color="teal"
                        textAlign="center"
                    />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput
                        name="password"
                        placeholder="Password"
                        type="password"
                    />
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <Label
                                style={{ marginBottom: 10 }}
                                basic
                                color="red"
                                content={errors.error}
                            />
                        )}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        positive
                        floated="right"
                        content="Sign In"
                        type="submit"
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
};

export default observer(SignIn);
