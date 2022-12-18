import { createContext, useContext } from "react";
import CheckPaymentStore from "./checkPaymentStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";

interface Store {
    checkPaymentStore: CheckPaymentStore;
    commonStore: CommonStore;
    userStore: UserStore;
    profileStore: ProfileStore;
}

export const store: Store = {
    checkPaymentStore: new CheckPaymentStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    profileStore: new ProfileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
