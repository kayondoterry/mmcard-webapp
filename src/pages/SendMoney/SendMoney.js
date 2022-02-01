import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmSend from "./components/ConfirmSend";
import SendMoneyForm from "./components/SendMoneyForm";

function SendMoney() {
  const navigate = useNavigate();

  const [sendInitiated, setSendInitiated] = useState(false);
  const handleOnSuccess = () => {
    setSendInitiated(true);
  };
  const tryAgain = () => {
    setSendInitiated(false);
  };

  const goToTransactionStatus = () => {
    navigate("/send/history");
  };

  const renderSendInitiated = () => {
    return (
      <div className="flex flex-col space-y-4 bg-white p-4 py-8 rounded-lg shadow-lg max-w-sm mx-auto mt-32 mb-14">
        <h1 className="text-xl font-bold text-center text-gray-800">
          Transaction successfully initiated!
        </h1>
        <p>
          Please confirm the transaction with your PIN when a USSD prompt
          appears on your mobile device.
        </p>
        <p>If no prompt appears with in the next minute, please try again.</p>
        <div className="flex flex-col items-center">
          <button
            onClick={tryAgain}
            className="px-4 py-2 m-2 text-white bg-blue-700"
          >
            Try Again
          </button>
          <button
            onClick={goToTransactionStatus}
            className="px-4 py-2 m-2 text-white bg-blue-700"
          >
            See Transaction Status
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="p-4">
      {!sendInitiated && <SendMoneyForm onSuccess={handleOnSuccess} />}
      {sendInitiated && renderSendInitiated()}
    </div>
  );
}

export default SendMoney;
