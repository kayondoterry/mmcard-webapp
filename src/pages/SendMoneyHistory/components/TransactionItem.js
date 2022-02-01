import dayjs from "dayjs";
import { formatMoney } from "../../../utils/utils";

function TransactionItem({ transaction }) {
  const { receiverName, amount, status } = transaction;
  const statusColours = getStatusColours();
  return (
    <div className="max-w-xl bg-white rounded shadow-md flex items-center m-2 mx-auto">
      <div className="rounded-full bg-purple-700 m-4 w-12 h-12 flex justify-center items-center text-white text-3xl">
        {receiverName[0].toUpperCase()}
      </div>
      <div className="flex flex-col flex-1 px-2 pr-6">
        <div className="flex">
          <span className="text-sm font-medium text-gray-700 flex-1">
            {receiverName}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {dayjs().format("DD MMM YYYY")}
          </span>
        </div>
        <div className="flex">
          <span className="flex-1 font-light text-xl">
            {formatMoney(amount)}
          </span>
          <span className={`p-1 px-4 text-sm rounded-2xl text-white ${statusColours[status]}`}>{status}</span>
        </div>
      </div>
    </div>
  );
}

function getStatusColours() {
  return {
    pending: "bg-orange-500",
    success: "bg-green-500",
    failed: "bg-red-500",
  };
}

export default TransactionItem;
