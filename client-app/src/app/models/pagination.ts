import { CheckPaymentData } from "./checkPaymentStore";

export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    data: any;
    pagination: Pagination;

    constructor(data: any, pagination: Pagination) {
        this.data = data;
        this.pagination = pagination;
    }
}

export class PagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 5) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}
