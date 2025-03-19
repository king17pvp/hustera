import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="bg-gray-100 w-[820px] p-7 mt-2 mb-2 rounded-xl transition-all duration-500 ease-in-out"
    >
      <button
        onClick={toggleOpen}
        className={`flex justify-between items-center w-full text-2xl font-avant-medium font-semibold cursor-pointer ${
          isOpen ? "text-blue-600" : "text-black"
        }`}
      >
        {question}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="mt-6 p-1 text-xl text-gray-700">{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
