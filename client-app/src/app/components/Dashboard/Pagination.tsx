import { observer } from "mobx-react-lite";
import styles from "./Pagination.module.css";
import { useStore } from "../../stores/store";
import { PagingParams } from "../../models/pagination";
import "@fortawesome/fontawesome-free/css/all.css";

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
}: PaginationData) => {
    const { checkPaymentStore } = useStore();
    const { setPagingParams } = checkPaymentStore;

    const handlePageChange = (page: number) => {
        setPagingParams(new PagingParams(page));
        onPageChange(page);
    };

    const getPages = () => {
        const elements = [];

        for (let i = 1; i <= totalPages; i++) {
            elements.push(
                <div
                    className={`${currentPage === i ? styles.active : ""}`}
                    onClick={() => handlePageChange(i)}
                    key={i}
                >
                    {i < 10 ? `${i}` : i}
                </div>
            );
        }

        return elements;
    };

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
