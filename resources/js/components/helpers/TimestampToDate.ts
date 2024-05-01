const MILLISECONDS_IN_SECOND = 1000;
const ZERO_BASED_MONTH_OFFSET = 1;
const DATE_TARGET_LENGTH = 2;

export const timestampToDate = (timestamp: number) => {
    const dateInMilliseconds = timestamp * MILLISECONDS_IN_SECOND;

    const date = new Date(dateInMilliseconds);

    const day = String(date.getDate()).padStart(DATE_TARGET_LENGTH, "0");
    const month = String(date.getMonth() + ZERO_BASED_MONTH_OFFSET).padStart(DATE_TARGET_LENGTH, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};