import { makeAutoObservable, runInAction } from "mobx";

import {
    CheckPayment,
    CheckPaymentFormValues,
} from "../models/checkPaymentStore";
import api from "../api/api";
import { store } from "./store";

export default class CheckPaymentStore {
    checkPaymentRegistry = new Map<string, CheckPayment>();
    selectedCheckPayment: CheckPayment | undefined = undefined;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get checkPaymentsByDate() {
        return Array.from(this.checkPaymentRegistry.values()).sort(
            (a, b) => a.date!.getTime() - b.date!.getTime()
        );
    }

    loadCheckPayments = async () => {
        try {
            const result = await api.CheckPayments.list();

            result.forEach((x) => {
                this.setCheckPayment(x);
            });
        } catch (error) {
            console.log(error);
        }
    };

    loadCheckPayment = async (id: string) => {
        let checkPayment = this.getCheckPayment(id);

        if (checkPayment) {
            this.selectedCheckPayment = checkPayment;
            return checkPayment;
        } else {
            try {
                checkPayment = await api.CheckPayments.details(id);

                this.setCheckPayment(checkPayment);

                runInAction(() => {
                    this.selectedCheckPayment = checkPayment;
                });

                return checkPayment;
            } catch (error) {
                console.log(error);
            }
        }
    };

    private setCheckPayment = (checkPayment: CheckPayment) => {
        const user = store.userStore.user;

        if (user) {
            checkPayment.isHost = checkPayment.hostUsername === user.username;
        }

        checkPayment.date = new Date(checkPayment.date!);
        this.checkPaymentRegistry.set(checkPayment.id, checkPayment);
    };

    private getCheckPayment = (id: string) => {
        return this.checkPaymentRegistry.get(id);
    };

    createCheckPayment = async (checkPayment: CheckPaymentFormValues) => {
        const user = store.userStore.user;

        try {
            await api.CheckPayments.create(checkPayment);

            const newCheckPayment = new CheckPayment(checkPayment);

            newCheckPayment.hostUsername = user!.username;

            this.setCheckPayment(newCheckPayment);

            runInAction(() => {
                this.selectedCheckPayment = newCheckPayment;
            });
        } catch (error) {
            console.log(error);
        }
    };

    updateCheckPayment = async (checkPayment: CheckPaymentFormValues) => {
        this.loading = true;

        try {
            await api.CheckPayments.update(checkPayment);

            runInAction(() => {
                if (checkPayment.id) {
                    let updatedCheckPayment = {
                        ...this.getCheckPayment(checkPayment.id),
                        ...checkPayment,
                    };

                    this.checkPaymentRegistry.set(
                        checkPayment.id,
                        updatedCheckPayment as CheckPayment
                    );

                    this.selectedCheckPayment =
                        updatedCheckPayment as CheckPayment;
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    deleteCheckPayment = async (id: string) => {
        this.loading = true;

        try {
            await api.CheckPayments.delete(id);

            runInAction(() => {
                this.checkPaymentRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
