import { Dispatch, SetStateAction } from "react";

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({
    currentPage,
    setCurrentPage,
    lastPage,
}: PaginationProps) => {
    const toPreviousPage = () => {
        if (currentPage === 1) return;

        setCurrentPage(currentPage - 1);
    };

    const toNextPage = () => {
        if (currentPage === lastPage) return;

        setCurrentPage(currentPage + 1);
    };

    const toPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = () => {
        return Array.from(Array(lastPage).keys()).map((page) => {
            return (
                <button
                    key={page}
                    onClick={() => toPage(page + 1)}
                    className={`${currentPage === page + 1 ? "font-bold" : ""}`}
                >
                    {page + 1}
                </button>
            );
        });
    };

    return (
        <div className="flex gap-2">
            <button onClick={toPreviousPage}>&#8249;</button>
            {pageNumbers()}
            <button onClick={toNextPage}>&#8250;</button>
        </div>
    );
};

export default Pagination;
