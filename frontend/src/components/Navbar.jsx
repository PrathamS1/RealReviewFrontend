import { motion } from "motion/react";

function Navbar() {
  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
      animate={{ y: 0 , opacity: 1 }}
      className="w-full bg-[#1F2937] text-white flex justify-between items-center py-4 px-8 font-[Raleway] shadow-lg"
    >
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="flex items-center justify-start w-1/3 hover:cursor-pointer"
      >
        <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-3 object-cover" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">
          RealReview
        </h1>
      </motion.div>
      
      <div className="w-1/3">
        <ul className="flex text-lg space-x-12 justify-center">
          <motion.li 
            whileHover={{ scale: 1.1 }}
            className="opacity-50 hover:cursor-not-allowed"
          >
            Home
          </motion.li>
          <motion.li 
            whileHover={{ scale: 1.1 }}
            className="text-[#3B82F6] font-medium hover:cursor-pointer"
          >
            Estate Gallery
          </motion.li>
          <motion.li 
            whileHover={{ scale: 1.1 }}
            className="hover:cursor-not-allowed opacity-50"
          >
            About
          </motion.li>
        </ul>
      </div>
      
      <div className="w-1/3 text-right">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#3B82F6] px-6 py-2 rounded-full font-medium shadow-lg opacity-50 cursor-not-allowed hover:bg-[#3B82F6]/90 transition-colors"
          disabled
        >
          Login
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Navbar;
