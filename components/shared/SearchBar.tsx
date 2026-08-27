import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
        >
            <div className="relative w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Search your course here...."
                    className="w-full h-11 sm:h-12 md:h-14 pl-4 sm:pl-5 md:pl-6 pr-11 sm:pr-13 md:pr-16 bg-white border border-[#E5E7EB] rounded-xl text-[#1F2937] placeholder:text-[#818183] placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-[#064228]/10 focus:border-[#064228] transition-all text-sm sm:text-base md:text-lg shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                />
                <div className="absolute right-3.5 sm:right-5 md:right-6 top-1/2 -translate-y-1/2 text-[#818183] pointer-events-none">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
            </div>
        </motion.div>
    );
}
