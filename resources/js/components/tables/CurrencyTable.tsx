import { CurrencySelectOption, CurrencyTableItem } from "@/types/CurrencyTypes";
import { timestampToDate } from "../helpers/TimestampToDate";
import { Dispatch, SetStateAction } from "react";
//@ts-ignore
import Loading from "../../assets/loading.gif";

type CurrencyTableProps = {
    tableItems: CurrencyTableItem[];
    selectedCurrencyName: CurrencySelectOption["name"];
    sort: "DESC" | "ASC";
    setSort: Dispatch<SetStateAction<"DESC" | "ASC">>;
    loading: boolean;
};

const CurrencyTable = ({
    tableItems,
    selectedCurrencyName,
    sort,
    setSort,
    loading,
}: CurrencyTableProps) => {
    const handleSortClick = () => {
        sort === "ASC" ? setSort("DESC") : setSort("ASC");
    };

    return (
        <div className="relative">
            <table
                className={`border border-black ${loading ? "blur-sm" : ""}`}
            >
                <thead className="bg-slate-300 border border-black">
                    <tr className="border border-black">
                        <th
                            onClick={handleSortClick}
                            className="border border-black p-2 text-center cursor-pointer"
                        >
                            Date {sort === "ASC" ? "↑" : "↓"}
                        </th>
                        <th className="border border-black p-2 text-center">
                            EUR To {selectedCurrencyName}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!!tableItems.length ? (
                        <>
                            {tableItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-black p-2 text-center">
                                        {timestampToDate(item.timestamp)}
                                    </td>
                                    <td className="border border-black p-2 text-center">
                                        {item.value}
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td
                                colSpan={2}
                                className="border border-black p-2 text-center"
                            >
                                No items found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {loading && (
                <img
                    src={Loading}
                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
            )}
        </div>
    );
};

export default CurrencyTable;
