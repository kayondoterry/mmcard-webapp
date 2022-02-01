import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineWarning, AiOutlineClose } from "react-icons/ai";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import {
  formatNumber,
  getCardOwnerName,
  getServiceFee,
  initiateMMSend,
} from "../../../functions/functions";

function SendMoneyForm({ onSuccess }) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [cardOwnerName, setCardOwnerName] = useState(null);
  const [isCheckingCardOwnerName, setIsCheckingCardOwnerName] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const watchCardNumber = watch("cardNumber");
  const watchAmount = watch("amount");

  useEffect(() => {
    setCardOwnerName(null);
    if (watchCardNumber && watchCardNumber.length === 16) {
      updateCardOwnerName(watchCardNumber);
    }
  }, [watchCardNumber]);

  const rules = fieldRules();

  const onError = (error) => {
    console.log(error.message);
    setSubmitError(error.message);
  };

  const updateCardOwnerName = (cardNumber) => {
    setCardNumberError(null);
    setIsCheckingCardOwnerName(true);
    getCardOwnerName(cardNumber)
      .then(setCardOwnerName)
      .catch((error) => setCardNumberError(error.message))
      .finally(() => setIsCheckingCardOwnerName(false));
  };

  const onSubmit = (data) => {
    setSubmitError(null);
    return cardOwnerName ? initiateMMSend({
      ...data,
      senderNumber: parsePhoneNumber(data.senderNumber, "UG").format("E.164"),
    })
      .then(onSuccess)
      .catch(onError): Promise.reject();
  };

  const isProcessing = isSubmitting || isCheckingCardOwnerName;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 bg-white p-4 py-8 rounded-lg shadow-lg max-w-sm mx-auto mt-32 mb-14"
    >
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Send Money
      </h1>

      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">
          Receiver - Card number
        </span>
        <input
          disabled={isProcessing}
          type="text"
          size={1}
          minLength={16}
          maxLength={16}
          className="flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0"
          {...register("cardNumber", { ...rules.cardNumber })}
        />
        <span className="text-xs text-red-700">
          {errors.cardNumber?.message}
          {cardNumberError}
        </span>
      </label>
      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">Receiver - Name</span>
        <input
          type="text"
          size={1}
          disabled={true}
          value={cardOwnerName || "(Waiting for card number)"}
          className={`flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0 ${
            !cardOwnerName && "text-sm"
          }`}
        />
      </label>
      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">
          Sender - Mobile money number
        </span>
        <input
          disabled={isProcessing}
          type="tel"
          size={1}
          className="flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0"
          {...register("senderNumber", { ...rules.senderNumber })}
        />
        <span className="text-xs text-red-700">
          {errors.senderNumber?.message}
        </span>
      </label>
      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">Amount in UGX</span>
        <input
          disabled={isProcessing}
          type="text"
          size={1}
          className="flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0"
          {...register("amount", { ...rules.amount, valueAsNumber: true })}
        />
        <span className="text-xs text-red-700">{errors.amount?.message}</span>
      </label>
      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">Service Fee</span>
        <input
          disabled={true}
          type="text"
          size={1}
          value={watchAmount ? formatNumber(getServiceFee(watchAmount)) : 0}
          className="flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0"
        />
      </label>

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

      <div className="flex flex-col py-3">
        <button
          disabled={isProcessing}
          className="bg-blue-600 disabled:bg-blue-400 rounded-md px-2 py-2 text-white font-bold text-lg"
          type="submit"
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin m-auto" size={28} />
          ) : (
            <span className="m-auto">Send Money</span>
          )}
        </button>
      </div>
    </form>
  );
}

function fieldRules() {
  return {
    cardNumber: {
      required: {
        value: true,
        message: "Card number is required",
      },
    },
    senderNumber: {
      required: {
        value: true,
        message: "Mobile Money number is required",
      },
      validate: (value) =>
        !isValidPhoneNumber(value, "UG") ? "invalid phone number" : null,
    },
    amount: {
      required: {
        value: true,
        message: "Amount is required",
      },
      validate: (value) => (isNaN(value) ? "amount should be a number" : null),
      min: {
        value: 500,
        message: "500 is the minimum amount your can send",
      },
      max: {
        value: 500000,
        message: "500,000 is the maximum amount your can send",
      },
    },
  };
}

function sendMoney(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true });
      // reject(new Error("Invalid card number"));
    }, 4000);
  });
}

export default SendMoneyForm;
