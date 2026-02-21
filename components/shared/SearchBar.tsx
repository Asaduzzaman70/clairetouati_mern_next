import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <div className="relative w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Search your course here...."
                    className="w-full h-14 pl-6 pr-16 bg-white border border-[#E5E7EB] rounded-lg text-[#818183] placeholder:text-[#818183] focus:outline-none focus:ring-2 focus:ring-[#E5E7EB] transition-all text-lg shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#818183]">
                    <Search className="size-6" />
                </div>
            </div>
        </motion.div>
    );
}

