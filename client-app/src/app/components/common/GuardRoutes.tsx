import React from "react";
import { useStore } from "../../stores/store";
import {
    Redirect,
    Route,
    RouteComponentProps,
    RouteProps,
} from "react-router-dom";

interface Props extends RouteProps {
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
}

export const GuardedRoutesAuthorization = ({
    component: Component,
    ...rest
}: Props) => {
    const {
        userStore: { isLoggedIn },
    } = useStore();

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
};

export const GuardedRoutesAuthUserOptions = ({
    component: Component,
    ...rest
}: Props) => {
    const {
        userStore: { isLoggedIn },
    } = useStore();

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};
