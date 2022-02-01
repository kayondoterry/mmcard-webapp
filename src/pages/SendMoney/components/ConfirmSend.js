import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineWarning, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatMoney } from "../../../utils/utils";


function ConfirmSend() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { receiverName, senderNumber, amount, serviceFee } = getMMSendData();

  const [submitError, setSubmitError] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(null);

  const onError = (error) => {
    console.log(error.message);
    setSubmitError(error.message);
  };

  const onConfirmed = (data) => {
    console.log(data);
    setIsConfirmed(true);
  };

  const onSubmit = (data) => {
    setSubmitError(null);
    return confirmSendMoney().then(onConfirmed).catch(onError);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 bg-white p-4 py-8 rounded-lg shadow-lg max-w-sm mx-auto mt-32 mb-14"
    >
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Confirm Send
      </h1>
      {isConfirmed && (
        <div>
          <div className="flex items-center bg-green-600 text-white p-4 rounded">
            {/* <AiOutlineWarning size={26} className="mx-2" /> */}
            <span className="flex-1 px-2">
              The payment has been successfully initiated. Enter your code when
              a prompt by <em className="font-bold">PAYLINE HOLDINGS LIMITED </em>
              appears on your mobile device. Click the button below to track your recent transactions.
            </span>
          </div>
          <div className="flex flex-col py-3">
            <button onClick={() => navigate("/send/history/")} className="bg-blue-600 disabled:bg-blue-400 rounded-md px-2 py-2 text-white font-bold text-lg">
              <span className="m-auto">Transaction History</span>
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-gray-700 text-xs font-medium">Receiver Name</span>
        <span className="text-2xl font-light">{receiverName}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-700 text-xs font-medium">
          Sender's Number
        </span>
        <span className="text-2xl font-light">{senderNumber}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-700 text-xs font-medium">Amount in UGX</span>
        <span className="text-2xl font-light">{formatMoney(amount)}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-700 text-xs font-medium">
          Service Fee in UGX
        </span>
        <span className="text-2xl font-light">{formatMoney(serviceFee)}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-700 text-xs font-medium">
          Total
        </span>
        <span className="text-2xl font-light">{formatMoney(amount + serviceFee)}</span>
      </div>
      {submitError && (
        <div className="flex items-center bg-red-600 text-white p-4 rounded">
          <AiOutlineWarning size={26} />
          <span className="flex-1 px-4 text-sm">{submitError}</span>
          <AiOutlineClose
            className="hover:cursor-pointer"
            onClick={() => setSubmitError(null)}
            size={18}
          />
        </div>
      )}
      
      {!isConfirmed && (
        <div className="flex flex-col py-3">
          <button
            disabled={isSubmitting}
            className="bg-blue-600 disabled:bg-blue-400 rounded-md px-2 py-2 text-white font-bold text-lg"
            type="submit"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin m-auto" size={28} />
            ) : (
              <span className="m-auto">Confirm Transaction</span>
            )}
          </button>
        </div>
      )}
    </form>
  );
}

function getMMSendData() {
  return {
    receiverName: "Nabilibikondde Goretti",
    senderNumber: "+256786852458",
    amount: 25000,
    serviceFee: 750,
    reference: "8797c7c6-3050-4aa1-9afe-43f0dfc4fd79",
  };
}

function confirmSendMoney(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true });
      // reject(new Error("Service currently unavailable. Try again later"));
    }, 4000);
  });
}

export default ConfirmSend;
