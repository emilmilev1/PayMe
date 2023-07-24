import { makeAutoObservable, reaction, runInAction, values } from "mobx";
import { format } from "date-fns";
import {
    CheckPayment,
    CheckPaymentData,
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
    checkPaymentRegistry = new Map<string, CheckPaymentData>();
    selectedCheckPayment: CheckPaymentData | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.pagingParams.pageNumber,
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
            }, {} as { [key: string]: CheckPaymentData[] })
        );
    }

    loadCheckPayments = async () => {
        this.loadingInitial = true;

        try {
            this.checkPaymentRegistry.clear();

            const result: PaginatedResult<CheckPaymentData[]> =
                await api.CheckPayments.list(this.axiosParams);

            if (result.data) {
                result.data.forEach((value: CheckPaymentData) => {
                    this.setCheckPayment(value);
                });
            }

            const pagination: Pagination = {
                currentPage: result.pagination.currentPage,
                itemsPerPage: result.pagination.itemsPerPage,
                totalItems: result.pagination.totalItems,
                totalPages: result.pagination.totalPages,
            };

            this.setPagination(pagination);
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
                this.selectedCheckPayment = undefined;

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

    private setCheckPayment = (checkPayment: CheckPaymentData) => {
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

    updateEditedPayment = (editedPayment: CheckPaymentFormValues) => {
        if (editedPayment.id) {
            const updatedPayment: CheckPaymentData = {
                id: editedPayment.id,
                date: editedPayment.date!,
                title: editedPayment.title,
                firstName: editedPayment.firstName,
                lastName: editedPayment.lastName,
                address: editedPayment.address,
                country: editedPayment.country,
                zipCode: editedPayment.zipCode,
                total: editedPayment.total,
            };

            this.checkPaymentRegistry.set(editedPayment.id, updatedPayment);
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
                        updatedCheckPayment as CheckPaymentData
                    );

                    this.selectedCheckPayment =
                        updatedCheckPayment as CheckPaymentData;
                }
            });

            this.updateEditedPayment(checkPayment);
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
