import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import api from "../api/api";

interface DoesEmailExistResponse {
    doesEmailExist: boolean;
}

export default class UserStore {
    user: User | null = null;
    refreshTokenTimeout: any;
    doesUserEmailExist: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return store.commonStore.token !== null;
    }

    login = async (creds: UserFormValues, rememberMe: boolean) => {
        try {
            const user = await api.Account.login(creds);
            store.commonStore.setToken(user.token, rememberMe);
            this.startRefreshTokenTimer(user);
            runInAction(() => (this.user = user));
            store.modalStore.closeModal();
            store.commonStore.setAppLoaded();
            history.push("/dashboard");
        } catch (error) {
            throw error;
        }
    };

    logout = () => {
        store.modalStore.closeModal();
        store.commonStore.setToken(null, false);
        window.sessionStorage.removeItem("jwt");
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("rememberMe");
        runInAction(() => (this.user = null));
        this.user = null;
        history.push("/");
    };

    getUser = async () => {
        try {
            const user = await api.Account.current();
            store.commonStore.setToken(
                user.token,
                store.commonStore.userRemembered
            );
            runInAction(() => (this.user = user));
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.error(error);
        }
    };

    register = async (creds: UserFormValues) => {
        try {
            await api.Account.register(creds);
            store.modalStore.closeModal();
            history.push(`/account/registerSuccess?email=${creds.email}`);
        } catch (error) {
            throw error;
        }
    };

    doesEmailExist = async (email: string) => {
        try {
            const responseData = await api.Account.doesEmailExist(email);

            const doesEmailResponse = responseData as DoesEmailExistResponse;

            const doesEmailExistResult = doesEmailResponse.doesEmailExist;

            runInAction(() => {
                this.doesUserEmailExist = doesEmailExistResult;
            });

            history.push(`/account/resetPassword?email=${email}`);
        } catch (error) {
            console.error("Error checking email existence:", error);
        }
    };

    changePassword = async (email: String) => {
        console.log("Change Password: " + email);
    };

    setImage = (image: string) => {
        if (this.user) {
            this.user.image = image;
        }
    };

    setDisplayName = (name: string) => {
        if (this.user) {
            this.user.firstName = name;
        }
    };

    refreshToken = async () => {
        this.stopRefreshTokenTimer();

        try {
            const user = await api.Account.refreshToken();
            runInAction(() => (this.user = user));
            store.commonStore.setToken(
                user.token,
                store.commonStore.userRemembered
            );
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    };

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split(".")[1])) as {
            exp: number;
        };
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - 60 * 1000;
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
            this.refreshTokenTimeout = null;
        }
    }
}
