import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import {
  AiOutlineMail,
  AiOutlineKey,
  AiOutlineWarning,
  AiOutlineClose,
} from "react-icons/ai";
import { loginRAgent } from "../../../../functions/functions";

function LoginForm({onSuccess}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [submitError, setSubmitError] = useState(null);

  const rules = fieldRules();

  const onError = (error) => {
    setSubmitError(error.message);
  };

  const onSubmit = ({email, password}) => {
    setSubmitError(null);
    return loginRAgent(email, password).then(onSuccess).catch(onError);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // className="flex flex-col space-y-4 bg-white p-4 py-8 rounded-lg shadow-lg max-w-sm w-full self-center"
      className="flex flex-col space-y-4 bg-white p-4 py-8 rounded-lg shadow-lg max-w-sm mx-auto mt-32 mb-14"
    >
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Welcome Back
      </h1>
      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">Email</span>
        <div className="relative flex items-center">
          <AiOutlineMail
            size={26}
            className="text-gray-600 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3"
          />
          <input
            size={1}
            type="email"
            placeholder="john@example.com"
            className="flex-1 placeholder:text-gray-500 bg-blue-50 rounded border-0 pl-14"
            {...register("email", { ...rules.email })}
          />
        </div>
        <span className="text-sm text-red-700">{errors.email?.message}</span>
      </label>

      <label className="flex flex-col">
        <span className="text-gray-700 font-medium">Password</span>
        <div className="relative flex items-cente">
          <AiOutlineKey
            size={26}
            className="text-gray-600 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3"
          />
          <input
            size={1}
            type="password"
            className="flex-1 bg-blue-50 rounded border-0 pl-14"
            placeholder="Enter your password"
            {...register("password", { ...rules.password })}
          />
        </div>
        <span className="text-sm text-red-700">{errors.password?.message}</span>
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
          disabled={isSubmitting}
          className="bg-blue-600 disabled:bg-blue-400 rounded-md px-2 py-2 text-white font-bold text-lg"
          type="submit"
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin m-auto" size={28} />
          ) : (
            <span className="m-auto">Log in</span>
          )}
        </button>
      </div>
    </form>
  );
}

function fieldRules() {
  return {
    email: {
      required: {
        value: true,
        message: "Email is required",
      },
    },
    password: {
      required: {
        value: true,
        message: "Password is required",
      },
    },
  };
}

function login(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve({ success: true });
      reject(new Error("Wrong password"));
    }, 4000);
  });
}

export default LoginForm;
