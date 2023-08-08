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
import { Profile } from "../models/profile";
import { zonedTimeToUtc } from "date-fns-tz";

export default class CheckPaymentStore {
    checkPaymentRegistry = new Map<string, CheckPaymentData>();
    selectedCheckPayment: CheckPaymentData | undefined = undefined;
    editMode = false;
    loading = false;
    creatingPayment = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.pagingParams.pageNumber,
            () => {
                if (!this.creatingPayment) {
                    this.checkPaymentRegistry.clear();
                    this.loadCheckPayments();
                }
            }
        );
    }

    sortingParams = {
        orderBy: "date",
        isDescending: false,
    };

    setSortingParams = (orderBy: string, isDescending: boolean) => {
        this.sortingParams.orderBy = orderBy;
        this.sortingParams.isDescending = isDescending;
    };

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    };

    get axiosParams() {
        const params = new URLSearchParams();

        params.append("pageNumber", this.pagingParams.pageNumber.toString());
        params.append("pageSize", this.pagingParams.pageSize.toString());
        params.append("orderBy", this.sortingParams.orderBy.toString());
        params.append(
            "isDescending",
            this.sortingParams.isDescending.toString()
        );

        return params;
    }

    get checkPayments() {
        return Array.from(this.checkPaymentRegistry.values());
    }

    getTotalPaymentsAmount = async () => {
        const resultAPI: unknown = await api.CheckPayments.total();

        return resultAPI;
    };

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
        } catch (error) {
            console.log(error);
        } finally {
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
        const payment = new Profile(user!);

        try {
            this.creatingPayment = true;

            await api.CheckPayments.create(checkPayment);

            const newCheckPayment = new CheckPayment(checkPayment);

            newCheckPayment.hostUsername = user!.username;
            newCheckPayment.checkAttendees = [payment];
            this.setCheckPayment(newCheckPayment);

            runInAction(() => {
                this.selectedCheckPayment = newCheckPayment;
            });

            this.loadCheckPayments();
        } catch (error) {
            console.log(error);
        } finally {
            this.creatingPayment = false;
        }
    };

    updateEditedPayment = (editedPayment: CheckPaymentFormValues) => {
        if (editedPayment.id) {
            const updatedPayment: CheckPaymentData = {
                id: editedPayment.id,
                date: editedPayment.date
                    ? zonedTimeToUtc(editedPayment.date, "EET")
                    : zonedTimeToUtc(new Date(), "EET"),
                title: editedPayment.title,
                firstName: editedPayment.firstName,
                lastName: editedPayment.lastName,
                address: editedPayment.address,
                country: editedPayment.country,
                zipCode: editedPayment.zipCode,
                total: editedPayment.total,
                checkAttendees: editedPayment.checkAttendees,
            };

            this.checkPaymentRegistry.set(editedPayment.id, updatedPayment);
        }
    };

    private updateCheckPaymentDetails = (checkPayment: CheckPaymentData) => {
        checkPayment.date = new Date(checkPayment.date!);
        this.checkPaymentRegistry.set(checkPayment.id, checkPayment);
    };

    updateCheckPayment = async (checkPayment: CheckPaymentFormValues) => {
        this.loading = true;
        let updatedCheckPayment: CheckPaymentData | undefined;

        try {
            await api.CheckPayments.update(checkPayment);

            runInAction(() => {
                if (checkPayment.id) {
                    let updatedCheckPayment = {
                        ...this.getCheckPayment(checkPayment.id),
                        ...checkPayment,
                    };

                    this.updateCheckPaymentDetails(
                        updatedCheckPayment as CheckPaymentData
                    );

                    this.selectedCheckPayment =
                        updatedCheckPayment as CheckPaymentData;
                }
            });

            this.updateEditedPayment(checkPayment);

            if (updatedCheckPayment) {
                this.checkPaymentRegistry.set(
                    updatedCheckPayment.id,
                    updatedCheckPayment
                );
            }

            this.loadCheckPayments();
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    deleteCheckPayment = async (id: string) => {
        this.loading = true;

        try {
            await api.CheckPayments.delete(id);

            runInAction(() => {
                const currentPage = this.pagination?.currentPage || 1;

                this.checkPaymentRegistry.delete(id);
                this.loading = false;

                if (this.checkPayments.length === 0 && currentPage > 1) {
                    this.pagingParams.pageNumber--;
                    this.loadCheckPayments();
                }
            });

            this.loadCheckPayments();
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

    sortByLatestPayments = () => {
        this.setSortingParams("date", true);
        this.loadCheckPayments();
    };

    sortByOldestPayments = () => {
        this.setSortingParams("date", false);
        this.loadCheckPayments();
    };

    sortByHighestTotal = () => {
        this.setSortingParams("total", true);
        this.loadCheckPayments();
    };

    sortByLowestTotal = () => {
        this.setSortingParams("total", false);
        this.loadCheckPayments();
    };
}
