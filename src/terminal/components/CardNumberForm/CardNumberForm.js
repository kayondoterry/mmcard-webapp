import { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import NumberInput from "../NumberInput/NumberInput";

function CardNumberForm() {
  const [input, setInput] = useState("");

  const handleKeyInput = (key) => {
    input.length <= 16 && setInput(input.concat(key));
  }

  const handleBackspace = () => {
    input.length > 0 && setInput(input.slice(0, input.length-1));
  }

  return (
    <div className="p-4">
      <div className="flex-column md:flex mb-3 mx-0.5 md:mx-1">
        <span className="text-xl flex items-center mr-5">Enter Card Number:</span>
        <div className="flex flex-1">
          <div className="flex-1 bg-slate-800 text-4xl text-white flex items-center justify-end p-3">{input}</div>
          <button onClick={handleBackspace} className="flex justify-center items-center w-16 text-5xl bg-gray-300"> <FaBackspace/> </button>
        </div>
      </div>
      <NumberInput onKeyInput={handleKeyInput} />
    </div>
  );
}

export default CardNumberForm;
