type CurrencyDataProps = {
    currencyMaxValue: number;
    currencyMinValue: number;
    currencyAvgValue: number;
    selectedCurrencyName: string;
};

const CurrencyData = ({
    currencyMaxValue,
    currencyMinValue,
    currencyAvgValue,
    selectedCurrencyName,
}: CurrencyDataProps) => {
    return (
        <div className="flex flex-wrap max-w-[500px] justify-center">
            <div>
                Minimum: {currencyMinValue} {selectedCurrencyName},
            </div>
            <div>
                Maximum: {currencyMaxValue} {selectedCurrencyName},
            </div>
            <div>
                Average: {currencyAvgValue} {selectedCurrencyName}
            </div>
        </div>
    );
};

export default CurrencyData;
