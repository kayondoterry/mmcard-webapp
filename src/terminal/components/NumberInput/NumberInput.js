const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

function NumberInput({ onKeyInput }) {
  return (
    <div className="flex justify-between flex-wrap">
      {keys.map((key) => (
        <button
          key={key}
          className="flex-initial flex justify-center items-center m-0.5 md:m-1 bg-blue-900 text-white text-xl md:text-2xl lg:text-4xl after:content-[''] after:block after:pb-[100%] basis-24"
          onClick={() => onKeyInput && onKeyInput(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
}

export default NumberInput;
