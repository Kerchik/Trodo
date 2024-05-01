import { useMemo, useState } from "react";
import ExchangeRateSelect from "./components/ExchangeRateSelect";
import { CurrencySelectOption } from "./types/CurrencyTypes";
import LastUpdatedAt from "./components/LastUpdatedAt";
import CurrencyTable from "./components/tables/CurrencyTable";
import CurrencyTableContainer from "./components/tables/CurrencyTableContainer";
import CurrencyData from "./components/CurrencyData";

const CURRENCY_OPTIONS = [
    {
        id: "usd",
        name: "USD",
        selected: true,
    },
    {
        id: "gbp",
        name: "GBP",
        selected: false,
    },
    {
        id: "aud",
        name: "AUD",
        selected: false,
    },
];

const Main = () => {
    const [currencyOptions, setCurrencyOptions] =
        useState<CurrencySelectOption[]>(CURRENCY_OPTIONS);
    const [lastUpdate, setLastUpdate] = useState<number>(0);
    const [currencyMaxValue, setCurrencyMaxValue] = useState<number>(0);
    const [currencyMinValue, setCurrencyMinValue] = useState<number>(0);
    const [currencyAvgValue, setCurrencyAvgValue] = useState<number>(0);

    const selectedCurrency: CurrencySelectOption = useMemo(() => {
        return currencyOptions.find(
            (option) => option.selected
        ) as CurrencySelectOption;
    }, [currencyOptions]);
    return (
        <main className="flex flex-col items-center">
            <ExchangeRateSelect
                currencyOptions={currencyOptions}
                selectedCurrency={selectedCurrency}
                setCurrencyOptions={setCurrencyOptions}
            />
            <LastUpdatedAt timestamp={lastUpdate} />
            <CurrencyTableContainer
                selectedCurrency={selectedCurrency}
                setLastUpdate={setLastUpdate}
                setCurrencyMaxValue={setCurrencyMaxValue}
                setCurrencyMinValue={setCurrencyMinValue}
                setCurrencyAvgValue={setCurrencyAvgValue}
            />
            <CurrencyData
                currencyMaxValue={currencyMaxValue}
                currencyMinValue={currencyMinValue}
                currencyAvgValue={currencyAvgValue}
                selectedCurrencyName={selectedCurrency.name}
            />
        </main>
    );
};

export default Main;
