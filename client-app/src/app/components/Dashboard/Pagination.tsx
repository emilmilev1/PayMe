import { observer } from "mobx-react-lite";
import styles from "./Pagination.module.css";
import { useStore } from "../../stores/store";
import { PagingParams } from "../../models/pagination";

interface PaginationData {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

const Pagination = ({
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
}: PaginationData) => {
    console.log(currentPage, itemsPerPage, totalItems, totalPages);

    const { checkPaymentStore } = useStore();
    const { setPagingParams, pagination } = checkPaymentStore;

    setPagingParams(new PagingParams(currentPage! + 1));

    const getPages = () => {
        let elements = [];

        for (let i = 1; i <= totalPages!; i++) {
            elements.push(
                <div
                    className={`${currentPage === i ? styles.active : ""}`}
                    onClick={() => i}
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
                onClick={() =>
                    currentPage !== 1 &&
                    setPagingParams(new PagingParams(currentPage! - 1))
                }
            >
                <i className="fas fa-angle-left"></i>
            </div>

            {getPages()}

            <div
                className={`${styles.paginationArrow} ${
                    currentPage === totalPages ? styles.inactive : ""
                }`}
                onClick={() =>
                    currentPage !== totalPages &&
                    setPagingParams(new PagingParams(currentPage! + 1))
                }
            >
                <i className="fas fa-angle-right"></i>
            </div>
        </div>
    );
};

export default observer(Pagination);
