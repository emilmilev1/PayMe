import { makeAutoObservable, reaction, runInAction } from "mobx";
import { format } from "date-fns";
import {
    CheckPayment,
    CheckPaymentFormValues,
} from "../models/checkPaymentStore";
import api from "../api/api";
import { store } from "./store";
import {
    PaginatedResult,
    Pagination,
    PagingParams,
} from "../models/pagination";

export default class CheckPaymentStore {
    checkPaymentRegistry = new Map<string, CheckPayment>();
    selectedCheckPayment: CheckPayment | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => (this.pagingParams = new PagingParams()),
            () => {
                this.checkPaymentRegistry.clear();
                this.loadCheckPayments();
            }
        );
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    };

    get axiosParams() {
        const params = new URLSearchParams();

        params.append("pageNumber", this.pagingParams.pageNumber.toString());
        params.append("pageSize", this.pagingParams.pageSize.toString());

        return params;
    }

    get checkPaymentsByDate() {
        return Array.from(this.checkPaymentRegistry.values()).sort(
            (a, b) => a.date!.getTime() - b.date!.getTime()
        );
    }

    get groupedPayments() {
        return Object.entries(
            this.checkPaymentsByDate.reduce((payments, payment) => {
                const date = format(payment.date!, "dd MMM yyyy");

                payments[date] = payments[date]
                    ? [...payments[date], payment]
                    : [payment];

                return payments;
            }, {} as { [key: string]: CheckPayment[] })
        );
    }

    loadCheckPayments = async () => {
        this.loadingInitial = true;

        try {
            const result: any = await api.CheckPayments.list(this.axiosParams);

            result.data.forEach((value: CheckPayment) => {
                this.setCheckPayment(value);
            });

            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    };

    loadCheckPayment = async (id: string) => {
        let checkPayment = this.getCheckPayment(id);

        if (checkPayment) {
            this.selectedCheckPayment = checkPayment;
            return checkPayment;
        } else {
            this.loadingInitial = true;

            try {
                checkPayment = await api.CheckPayments.details(id);

                this.setCheckPayment(checkPayment);

                runInAction(() => {
                    this.selectedCheckPayment = checkPayment;
                });

                this.setLoadingInitial(false);

                return checkPayment;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    private setCheckPayment = (checkPayment: CheckPayment) => {
        checkPayment.date = new Date(checkPayment.date!);

        this.checkPaymentRegistry.set(checkPayment.id, checkPayment);
    };

    private getCheckPayment = (id: string) => {
        return this.checkPaymentRegistry.get(id);
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
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

    clearSelectedCheckPayment = () => {
        this.selectedCheckPayment = undefined;
    };
}
