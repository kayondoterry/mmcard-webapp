import { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import useLongPress from "../../hooks/useLongPress";

// after:content-[''] after:block after:pb-[100%]

function InputModal({
  placeHolder,
  max,
  min,
  onCancel,
  onSubmit,
  disabled,
  obscured,
  centered,
}) {
  const [input, setInput] = useState("");
  const [inputFontSize, setInputFontSize] = useState("");

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "X", "0", "OK"];

  const KeyPad = ({ keys }) => {
    const onLongPress = useLongPress();
    return (
      <div className="flex flex-wrap">
        {keys.map((key) => {
          const bgColor =
            key === "OK"
              ? "bg-green-700"
              : key === "X"
              ? "bg-red-700"
              : "bg-blue-900";
          return (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              {...onLongPress(() => handleLongPress(key))}
              className={`flex justify-center items-center flex-1 basis-[calc(33%-4px)] m-0.5 text-3xl text-white ${bgColor} h-16`}
            >
              {key === "X" ? <FaBackspace /> : key}
            </button>
          );
        })}
      </div>
    );
  };

  const handleLongPress = (key) => {
    if (key === "X") {
      setInput("");
    }
  };

  const handleKeyPress = (key) => {
    if (key === "X") {
      handleBackspace();
    } else if (key === "OK") {
      handleSubmit();
    } else {
      input.length < (max || Number.MAX_VALUE) && setInput(input.concat(key));
    }
  };

  const handleBackspace = () => {
    input.length > 0 && setInput(input.slice(0, input.length - 1));
  };

  const handleSubmit = () => {};

  return (
    <div className="fixed w-full h-full flex justify-center items-center px-4">
      <div className="flex-1 flex flex-col bg-white p-2 rounded-lg shadow-lg max-w-sm">
        <input
          disabled={true}
          value={obscured ? "*".repeat(input.length) : input}
          type="text"
          placeholder="Enter Card Number"
          className="m-1 text-right border-0 bg-blue-100 font-light text-4xl h-20 flex items-center placeholder:text-2xl"
        />
        <KeyPad keys={keys} />
      </div>
    </div>
  );
}

export default InputModal;
