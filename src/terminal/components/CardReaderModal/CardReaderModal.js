import { AiOutlineCreditCard } from "react-icons/ai";

function CardReaderModal() {
  return (
    <div className="fixed w-full h-full flex justify-center items-center px-4">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-2 rounded-lg shadow-lg max-w-sm">
        <AiOutlineCreditCard className="text-9xl animate-pulse" />
      </div>
    </div>
  );
}

export default CardReaderModal;
