import React from "react";
import { toast } from "react-toastify";
import {
    Button,
    Header,
    HeaderSubheader,
    Icon,
    Segment,
} from "semantic-ui-react";
import useQuery from "../../utils/hooks";
import api from "../../api/api";
import { useStore } from "../../stores/store";

const RegisterSuccess = () => {
    const email = useQuery().get("email") as string;

    function handleConfirmEmailResend() {
        api.Account.resendEmailConfirm(email)
            .then(() => {
                toast.success(
                    "Verification email resent - please check your email"
                );
            })
            .catch((error) => console.log(error));
    }

    return (
        <Segment placeholder textAlign="center">
            <Header icon color="green">
                <Icon name="check" />
                Successfully registered! You can close this tab!
            </Header>
            {email && (
                <>
                    <p>
                        Didn't receive the email? Click the below button to
                        resend
                    </p>
                    <Button
                        primary
                        onClick={handleConfirmEmailResend}
                        content="Resend email"
                        size="huge"
                    />
                </>
            )}
        </Segment>
    );
};

export default RegisterSuccess;
