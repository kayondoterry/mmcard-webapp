import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineClose,
  AiOutlineWarning,
  AiFillCheckCircle,
} from "react-icons/ai";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { getSchools, registerStudent } from "../../../functions/functions";

function RegistrationForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [submitMessage, setSubmitMessage] = useState(null);
  const [schools, setSchools] = useState(null);
  const [isGettingSchools, setIsGettingSchools] = useState(true);

  const rules = fieldRules();

  const onError = (error) => {
    console.log(error.message);
    setSubmitMessage({ type: "error", message: error.message });
  };

  useEffect(() => {
    const _getSchools = async () => {
      // setIsGettingSchools(true);
      setSchools(await getSchools());
      setIsGettingSchools(false);
    };
    _getSchools();
  }, []);

  const onSubmit = (data) => {
    setSubmitMessage(null);
    return registerStudent(data)
      .then(() => {
        setSubmitMessage({
          type: "success",
          message: "Student account created",
        });
      })
      .catch(onError);
  };

  const isProcessing = isSubmitting || isGettingSchools;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // className="flex flex-col space-y-4 bg-white p-4 py-8 rounded-lg shadow-lg max-w-sm w-full self-center"
      className="flex flex-col space-y-4 bg-white p-4 py-8 rounded-lg shadow-lg max-w-sm mx-auto mt-32 mb-14"
    >
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Register Student
      </h1>
      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">Student Name</span>
        <input
          type="text"
          size={1}
          className="flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0"
          {...register("name", { ...rules.name })}
        />
        <span className="text-xs text-red-700">{errors.name?.message}</span>
      </label>
      <label className="flex flex-col">
        <div className="flex">
          <span className="text-gray-700 font-medium mr-1">School</span>
          {isGettingSchools && (
            <div className="flex items-center my-1 text-xs">
              (<span>Loading Schools</span>{" "}
              <FaSpinner className="animate-spin mx-1" />)
            </div>
          )}
        </div>
        <select
          defaultValue="placeholder"
          className="flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0"
          {...register("school", { ...rules.school })}
        >
          <option disabled hidden value="placeholder">
            {" "}
            -- Select School --{" "}
          </option>
          {schools &&
            schools.map((school) => (
              <option key={school.id} value={school.name}>
                {school.name}
              </option>
            ))}
        </select>
        <span className="text-xs text-red-700">{errors.school?.message}</span>
      </label>
      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">Card number</span>
        <input
          type="text"
          size={1}
          minLength={16}
          maxLength={16}
          className="flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0"
          {...register("cardNumber", { ...rules.cardNumber })}
        />
        <span className="text-xs text-red-700">
          {errors.cardNumber?.message}
        </span>
      </label>
      {submitMessage && (
        <div
          className={`flex items-center text-white p-4 rounded ${
            submitMessage.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {submitMessage.type === "success" ? (
            <FaCheckCircle size={28} />
          ) : (
            <AiOutlineWarning size={26} />
          )}
          <span className="flex-1 px-4 text-sm">{submitMessage.message}</span>
          <AiOutlineClose
            className="hover:cursor-pointer"
            onClick={() => setSubmitMessage(null)}
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
            <span className="m-auto">Register</span>
          )}
        </button>
      </div>
    </form>
  );
}

function fieldRules() {
  return {
    name: {
      required: {
        value: true,
        message: "Student name is required",
      },
    },
    school: {
      required: {
        value: true,
        message: "School is required",
      },
      validate: (value) =>
        value === "placeholder" ? "School is required" : null,
    },
    cardNumber: {
      required: {
        value: true,
        message: "Card number is required",
      },
    },
  };
}

// function registerStudent(data) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({ success: true });
//       // reject(new Error("Invalid card number"));
//     }, 4000);
//   });
// }

// function getSchools() {
//   return [
//     { id: "bd1f4cf1-4de4-4354-bc1d-c315743a7a6e", name: "King's College Budo" },
//     { id: "2cac6dac-d343-465b-8b2a-8bc37be30451", name: "Gayaza High School" },
//     {
//       id: "b170fbfe-3214-437f-8b53-f21cabdd3cb4",
//       name: "Ndejje Senior Secondary School",
//     },
//   ];
// }

export default RegistrationForm;
