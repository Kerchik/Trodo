import {
    ChangeEvent,
    Dispatch,
    FormEventHandler,
    SetStateAction,
    useMemo,
    useState,
} from "react";
import { CurrencySelectOption } from "../types/CurrencyTypes";

type ExchangeRateSelectProps = {
    currencyOptions: CurrencySelectOption[];
    selectedCurrency: CurrencySelectOption;
    setCurrencyOptions: Dispatch<SetStateAction<CurrencySelectOption[]>>;
};

const ExchangeRateSelect = ({
    currencyOptions,
    selectedCurrency,
    setCurrencyOptions,
}: ExchangeRateSelectProps) => {
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        setCurrencyOptions(
            currencyOptions.map((option) =>
                option.id === value
                    ? { ...option, selected: true }
                    : { ...option, selected: false }
            )
        );
    };
    return (
        <div className="my-4">
            <div className="flex flex-col gap-1">
                <label>Target:</label>
                <select value={selectedCurrency.id} onChange={handleSelect}>
                    {currencyOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <h1 className="mt-2 text-2xl font-bold">
                1 EUR to {selectedCurrency?.name} Exchange Rate
            </h1>
        </div>
    );
};

export default ExchangeRateSelect;
