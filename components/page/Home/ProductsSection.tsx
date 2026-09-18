"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import { Sparkles, ShieldCheck, TreePine, Award, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from "@/constants/products";

const TRUST_PERKS = [
    {
        icon: TreePine,
        title: "Sustainably Harvested",
        desc: "PEFC-certified European solid beechwood",
    },
    {
        icon: ShieldCheck,
        title: "Non-Toxic & Child-Safe",
        desc: "Natural plant-based non-toxic vegetable dyes",
    },
    {
        icon: Award,
        title: "Pedagogy Approved",
        desc: "Endorsed by psychomotor therapists & teachers",
    },
    {
        icon: Truck,
        title: "Careful Eco-Delivery",
        desc: "Plastic-free recyclable shipping packaging",
    },
];

export function ProductsSection() {
    const [activeTab, setActiveTab] = useState<string>("all");

    const filteredProducts = useMemo(() => {
        if (activeTab === "all") return PRODUCTS_DATA;
        if (activeTab === "wooden-sets") {
            return PRODUCTS_DATA.filter((p) => p.category === "Wooden Game Sets");
        }
        if (activeTab === "abc-kits") {
            return PRODUCTS_DATA.filter((p) => p.category === "Architectural ABC");
        }
        if (activeTab === "sensory") {
            return PRODUCTS_DATA.filter((p) => p.category === "Sensory & Therapy");
        }
        return PRODUCTS_DATA;
    }, [activeTab]);

    return (
        <section className="w-full bg-white py-14 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dffada] text-[#064228] text-xs sm:text-sm font-bold tracking-wider uppercase"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Handcrafted Pedagogical Tools</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e293b] tracking-tight uppercase leading-tight"
                    >
                        Explore The Turrim Collection
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#64748b] text-sm sm:text-base md:text-lg leading-relaxed font-normal"
                    >
                        Tactile objects and wooden architectures designed to awaken curious minds,
                        train fine motor confidence, and turn learning into pure joy.
                    </motion.p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center mb-10 sm:mb-14">
                    <div className="inline-flex flex-wrap items-center justify-center bg-[#F1F3F5] dark:bg-zinc-800/80 p-1.5 rounded-full gap-1 sm:gap-2 shadow-xs max-w-full">
                        {PRODUCT_CATEGORIES.map((cat) => {
                            const isActive = activeTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={cn(
                                        "px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 relative z-10 cursor-pointer whitespace-nowrap",
                                        isActive
                                            ? "text-white"
                                            : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                                    )}
                                >
                                    {cat.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-product-category"
                                            className="absolute inset-0 bg-[#064228] rounded-full shadow-sm -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Products Grid */}
                <motion.div
                    layout
                    transition={{
                        layout: {
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                        },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout="position"
                                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.94,
                                    y: 10,
                                    transition: { duration: 0.2, ease: "easeIn" },
                                }}
                                transition={{
                                    layout: {
                                        type: "spring",
                                        stiffness: 280,
                                        damping: 28,
                                        mass: 0.7,
                                    },
                                    opacity: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                                    scale: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                                    y: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                                }}
                                className="h-full"
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View More Products CTA */}
                <div className="mt-12 sm:mt-14 flex justify-center">
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            asChild
                            className="rounded-full bg-[#064228] hover:bg-[#064228]/90 text-white font-bold text-sm sm:text-base px-8 sm:px-10 h-12 sm:h-13 shadow-[0_4px_20px_rgba(6,66,40,0.2)] hover:shadow-[0_6px_24px_rgba(6,66,40,0.3)] transition-all duration-300 gap-2.5 cursor-pointer group"
                        >
                            <Link href="/products">
                                <span>View More Products</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Trust & Guarantee Strip */}
                <div className="mt-16 sm:mt-20 md:mt-24 pt-10 sm:pt-14 border-t border-zinc-200/80">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
                        {TRUST_PERKS.map((perk, i) => {
                            const Icon = perk.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FBF9F7] border border-border/40"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#dffada] text-[#064228] flex items-center justify-center shrink-0">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-sm font-bold text-[#1F2937] tracking-tight">
                                            {perk.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {perk.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductsSection;
