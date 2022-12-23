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

const GuardedRoutesAuth = ({ component: Component, ...rest }: Props) => {
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

export default GuardedRoutesAuth;
