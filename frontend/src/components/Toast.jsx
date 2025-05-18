import { motion, AnimatePresence } from "motion/react";

const Toast = ({ message, type = "error", onClose }) => {
  const bgColor = {
    error: "bg-[#F43F5E]",
    success: "bg-[#10B981]",
    warning: "bg-[#F59E0B]",
    info: "bg-[#3B82F6]"
  }[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-80 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast; 