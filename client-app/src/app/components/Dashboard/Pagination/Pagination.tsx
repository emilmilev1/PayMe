import { observer } from "mobx-react-lite";
import styles from "./Pagination.module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useStore } from "../../../stores/store";
import { PagingParams } from "../../../models/pagination";
import { useEffect } from "react";

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
}

const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
    itemsPerPage,
}: PaginationData) => {
    const { checkPaymentStore } = useStore();
    const { setPagingParams } = checkPaymentStore;

    const handlePageChange = (page: number) => {
        setPagingParams(new PagingParams(page));
        onPageChange(page);
    };

    const getPages = () => {
        const elements = [];

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                elements.push(
                    <div
                        className={`${currentPage === i ? styles.active : ""}`}
                        onClick={() => handlePageChange(i)}
                        key={i}
                    >
                        {i}
                    </div>
                );
            }
        } else {
            const startPage = Math.max(currentPage - 2, 1);
            const endPage = Math.min(currentPage + 1, totalPages);

            elements.push(
                <div
                    className={`${currentPage === 1 ? styles.active : ""}`}
                    onClick={() => handlePageChange(1)}
                    key={1}
                >
                    1
                </div>
            );

            if (startPage > 2) {
                elements.push(
                    <div key="dots1" className={styles.dots}>
                        ...
                    </div>
                );
            }

            for (let i = startPage; i <= endPage; i++) {
                if (i !== 1 && i !== totalPages) {
                    elements.push(
                        <div
                            className={`${
                                currentPage === i ? styles.active : ""
                            }`}
                            onClick={() => handlePageChange(i)}
                            key={i}
                        >
                            {i}
                        </div>
                    );
                }
            }

            if (endPage < totalPages - 1) {
                elements.push(
                    <div key="dots2" className={styles.dots}>
                        ...
                    </div>
                );
            }

            elements.push(
                <div
                    className={`${
                        currentPage === totalPages ? styles.active : ""
                    }`}
                    onClick={() => handlePageChange(totalPages)}
                    key={totalPages}
                >
                    {totalPages}
                </div>
            );
        }

        return elements;
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            onPageChange(totalPages);
        }
    }, [totalPages, currentPage, onPageChange]);

    if (totalItems === 0) {
        currentPage = 1;
        totalPages = 1;
    }

    return (
        <div className={styles.pagination}>
            <div
                className={`${styles.paginationArrow} ${
                    currentPage === 1 ? styles.inactive : ""
                }`}
                onClick={() => {
                    if (currentPage !== 1) {
                        handlePageChange(currentPage - 1);
                    }
                }}
            >
                <i className="fas fa-angle-left"></i>
            </div>

            {getPages()}

            <div
                className={`${styles.paginationArrow} ${
                    currentPage === totalPages ? styles.inactive : ""
                }`}
                onClick={() => {
                    if (currentPage !== totalPages) {
                        handlePageChange(currentPage + 1);
                    }
                }}
            >
                <i className="fas fa-angle-right"></i>
            </div>
        </div>
    );
};

export default observer(Pagination);
