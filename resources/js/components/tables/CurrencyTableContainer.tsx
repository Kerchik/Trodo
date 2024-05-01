import { getCurrencies } from "@/requests/requests";
import CurrencyTable from "./CurrencyTable";
import { CurrencySelectOption, CurrencyTableItem } from "@/types/CurrencyTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "../paginations/Pagination";

type CurrencyTableContainerProps = {
    selectedCurrency: CurrencySelectOption;
    setLastUpdate: Dispatch<SetStateAction<number>>;
    setCurrencyMaxValue: Dispatch<SetStateAction<number>>;
    setCurrencyMinValue: Dispatch<SetStateAction<number>>;
    setCurrencyAvgValue: Dispatch<SetStateAction<number>>;
};

const CurrencyTableContainer = ({
    selectedCurrency,
    setLastUpdate,
    setCurrencyMaxValue,
    setCurrencyMinValue,
    setCurrencyAvgValue,
}: CurrencyTableContainerProps) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [tableItems, setTableItems] = useState<CurrencyTableItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [sort, setSort] = useState<"DESC" | "ASC">("DESC");
    const [loading, setLoading] = useState<boolean>(false);

    const getCurrenciesRequest = async (resetPage: boolean) => {
        if (resetPage) {
            setCurrentPage(1);
            return;
        }

        setLoading(true);

        const { data, pagination, lastUpdate, maxValue, minValue, avgValue } =
            await getCurrencies(selectedCurrency.id, currentPage, sort);

        setTableItems(data);
        setCurrentPage(pagination.currentPage);
        setLastPage(pagination.lastPage);

        setLastUpdate(lastUpdate);
        setCurrencyMaxValue(maxValue);
        setCurrencyMinValue(minValue);
        setCurrencyAvgValue(avgValue);

        setLoading(false);
    };

    useEffect(() => {
        getCurrenciesRequest(false);
        setIsMounted(true);
    }, [currentPage]);

    useEffect(() => {
        if (!isMounted) return;

        getCurrenciesRequest(currentPage !== 1);
    }, [selectedCurrency, sort]);
    return (
        <>
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                setCurrentPage={setCurrentPage}
            />
            <CurrencyTable
                tableItems={tableItems}
                selectedCurrencyName={selectedCurrency.name}
                sort={sort}
                setSort={setSort}
                loading={loading}
            />
            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};

export default CurrencyTableContainer;
