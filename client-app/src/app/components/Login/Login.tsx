import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import MyTextInput from "../Forms/MyTextInput";

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
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form
                    className="ui form error"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
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
