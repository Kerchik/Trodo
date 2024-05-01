import { timestampToDate } from "./helpers/TimestampToDate";

type LastUpdatedAtProps = {
    timestamp: number;
};

const LastUpdatedAt = ({ timestamp }: LastUpdatedAtProps) => {
    return (
        <div className="mb-4">
            <p>Last updated: {timestampToDate(timestamp)}</p>
        </div>
    );
};

export default LastUpdatedAt;
