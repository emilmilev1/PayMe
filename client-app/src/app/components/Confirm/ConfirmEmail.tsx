import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import useQuery from "../../utils/hooks";
import { useStore } from "../../stores/store";
import api from "../../api/api";
import { useHistory } from "react-router";

const ConfirmEmail = () => {
    const { userStore } = useStore();
    const history = useHistory();

    const email = useQuery().get("email") as string;
    const token = useQuery().get("token") as string;

    console.log(userStore.user?.token);

    const Status = {
        Verifying: "Verifying",
        Failed: "Failed",
        Success: "Success",
        Waiting: "Waiting",
    };

    const [status, setStatus] = useState(Status.Waiting);
    const [verificationResult, setVerificationResult] = useState(false);
    const [verificationAttempted, setVerificationAttempted] = useState(false);

    useEffect(() => {
        if (!verificationAttempted && status === Status.Waiting) {
            setVerificationAttempted(true);
            api.Account.verifyEmail(token, email)
                .then(() => {
                    setVerificationResult(true);
                    setStatus(Status.Success);
                })
                .catch(() => {
                    setVerificationResult(false);
                    setStatus(Status.Failed);
                });
        }
    }, [status, token, email, verificationAttempted]);

    function handleConfirmEmailResend() {
        api.Account.resendEmailConfirm(email)
            .then(() => {
                toast.success(
                    "Verification email resent - please check your email!"
                );
            })
            .catch((error) => console.log(error));
    }

    const handleManualLogin = () => {
        history.push("/login");
    };

    return (
        <Segment placeholder textAlign="center">
            <Segment.Inline>
                {verificationResult ? (
                    <div>
                        <Header icon color="green">
                            <Icon name="check" />
                            Successfully registered and verified!
                        </Header>
                        <Button
                            primary
                            onClick={handleManualLogin}
                            content="Go to Login"
                            size="huge"
                        />
                    </div>
                ) : (
                    <div>
                        {status === Status.Verifying && <p>Verifying...</p>}
                        {status === Status.Failed && (
                            <div>
                                <p color="red">Verification failed.</p>
                                <p>
                                    Please check your email (including junk
                                    email) for the verification email
                                </p>
                                {userStore.user?.token == null ? (
                                    <Button
                                        primary
                                        onClick={handleConfirmEmailResend}
                                        size="big"
                                        content="Resend email"
                                    />
                                ) : null}
                            </div>
                        )}
                    </div>
                )}
            </Segment.Inline>
        </Segment>
    );
};

export default ConfirmEmail;
