import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null =
        window.sessionStorage.getItem("jwt") ||
        window.localStorage.getItem("jwt") ||
        null;
    appLoaded: boolean = false;
    userRemembered: boolean = false;

    constructor() {
        makeAutoObservable(this);

        const rememberMeFromStorage = localStorage.getItem("rememberMe");
        if (rememberMeFromStorage) {
            this.userRemembered = JSON.parse(rememberMeFromStorage);
        }
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    };

    setToken = (token: string | null, rememberMe: boolean) => {
        this.token = token;
        this.userRemembered = rememberMe;

        if (this.userRemembered) {
            if (this.token) {
                window.localStorage.setItem("jwt", this.token);
            } else {
                window.localStorage.removeItem("jwt");
            }
            window.sessionStorage.removeItem("jwt");
        } else {
            if (this.token) {
                window.sessionStorage.setItem("jwt", this.token);
            } else {
                window.sessionStorage.removeItem("jwt");
            }
            window.localStorage.removeItem("jwt");
        }
    };

    setUserRemembered = (rememberMe: boolean) => {
        this.userRemembered = rememberMe;
        localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
    };

    setAppLoaded = () => {
        this.appLoaded = true;
    };
}
