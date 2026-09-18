"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import {
    PRODUCTS_DATA,
    PRODUCT_CATEGORIES,
} from "@/constants/products";
import {
    Search,
    ArrowUpDown,
    X,
    Sparkles,
    TreePine,
    ShieldCheck,
    Award,
    Truck,
    PackageOpen,
    ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let list = [...PRODUCTS_DATA];

        // Category filter
        if (selectedCategory !== "all") {
            const categoryObj = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory);
            if (categoryObj) {
                list = list.filter((p) => p.category === categoryObj.label);
            }
        }

        // In-stock only filter
        if (inStockOnly) {
            list = list.filter((p) => p.inStock !== false);
        }

        // Search filter (title, subtitle, description, features, category)
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase().trim();
            list = list.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.subtitle?.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query) ||
                    p.features?.some((f) => f.toLowerCase().includes(query))
            );
        }

        // Sorting
        switch (sortBy) {
            case "price-asc":
                list.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                list.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                list.sort((a, b) => b.rating - a.rating);
                break;
            case "featured":
            default:
                // Keep original curated order
                break;
        }

        return list;
    }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

    const resetFilters = () => {
        setSelectedCategory("all");
        setSearchQuery("");
        setSortBy("featured");
        setInStockOnly(false);
    };

    const hasActiveFilters =
        selectedCategory !== "all" || searchQuery.trim() !== "" || inStockOnly || sortBy !== "featured";

    return (
        <main className="w-full bg-[#FAFAFA] min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-16 font-sans">
            <div className="container mx-auto max-w-7xl">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-medium mb-6 sm:mb-8">
                    <Link
                        href="/"
                        className="hover:text-foreground transition-colors flex items-center gap-1.5"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Home</span>
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-semibold">Products</span>
                </div>

                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#dffada] text-[#064228] text-xs sm:text-sm font-bold tracking-wider uppercase"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Handcrafted In France</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1e293b] tracking-tight leading-tight uppercase"
                    >
                        The Turrim Workshop
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[#64748b] text-sm sm:text-base md:text-lg leading-relaxed font-normal"
                    >
                        Explore our complete collection of tactile wooden educational objects,
                        three-dimensional architectural alphabets, and specialized pedagogical therapy kits.
                    </motion.p>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-border/50 mb-8 sm:mb-10 space-y-4">
                    {/* Top Row: Search Input + Sort Dropdown */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products by name, material, or learning goal..."
                                className="w-full h-11 sm:h-12 pl-11 pr-10 bg-[#F9FAFB] border border-zinc-200/80 rounded-xl sm:rounded-2xl text-sm sm:text-base text-[#1F2937] placeholder:text-zinc-400 focus:outline-none focus:ring-3 focus:ring-[#064228]/10 focus:border-[#064228] transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer rounded-full"
                                    aria-label="Clear search"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Controls: In-Stock Switch & Sort Selector */}
                        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                            {/* In-Stock Only Pill Toggle */}
                            <button
                                onClick={() => setInStockOnly(!inStockOnly)}
                                className={cn(
                                    "h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border cursor-pointer select-none",
                                    inStockOnly
                                        ? "bg-[#dffada] text-[#064228] border-[#064228]/30 shadow-xs"
                                        : "bg-[#F9FAFB] text-zinc-600 border-zinc-200/80 hover:bg-zinc-100"
                                )}
                            >
                                <span
                                    className={cn(
                                        "w-2 h-2 rounded-full",
                                        inStockOnly ? "bg-[#1da824]" : "bg-zinc-400"
                                    )}
                                />
                                <span>In Stock Only</span>
                            </button>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <div className="flex items-center bg-[#F9FAFB] border border-zinc-200/80 rounded-xl sm:rounded-2xl px-3 sm:px-4 h-11 sm:h-12 gap-2 text-xs sm:text-sm font-semibold text-zinc-700">
                                    <ArrowUpDown className="w-4 h-4 text-zinc-500 shrink-0" />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                                        className="bg-transparent focus:outline-none cursor-pointer pr-2"
                                        aria-label="Sort products"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Category Tabs */}
                    <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            {PRODUCT_CATEGORIES.map((cat) => {
                                const isActive = selectedCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={cn(
                                            "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all relative z-10 cursor-pointer",
                                            isActive
                                                ? "text-white"
                                                : "text-zinc-600 hover:text-zinc-950 bg-zinc-100/80 hover:bg-zinc-200/80"
                                        )}
                                    >
                                        {cat.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="products-page-active-cat"
                                                className="absolute inset-0 bg-[#064228] rounded-full shadow-xs -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Reset Filters Link */}
                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="text-xs sm:text-sm font-semibold text-[#ef4444] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>Reset All Filters</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Status Counter */}
                <div className="flex items-center justify-between mb-6 px-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Showing{" "}
                        <span className="font-bold text-foreground">
                            {filteredAndSortedProducts.length}
                        </span>{" "}
                        of {PRODUCTS_DATA.length} products
                    </p>
                    {searchQuery && (
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Results for &ldquo;<span className="font-semibold text-foreground">{searchQuery}</span>&rdquo;
                        </p>
                    )}
                </div>

                {/* Products Grid */}
                {filteredAndSortedProducts.length > 0 ? (
                    <motion.div
                        layout
                        transition={{
                            layout: {
                                duration: 0.35,
                                ease: [0.16, 1, 0.3, 1],
                            },
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredAndSortedProducts.map((product) => (
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
                ) : (
                    /* Empty Search State */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16 sm:py-24 bg-white rounded-3xl border border-dashed border-zinc-300 p-8 max-w-xl mx-auto space-y-4"
                    >
                        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                            <PackageOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
                            No products found
                        </h3>
                        <p className="text-sm sm:text-base text-zinc-500 max-w-md mx-auto">
                            We couldn&apos;t find any Turrim items matching your search or filters. Try adjusting your keywords or clearing active filters.
                        </p>
                        <Button
                            onClick={resetFilters}
                            className="rounded-full bg-[#064228] text-white hover:bg-[#064228]/90 px-6 h-11 text-sm font-semibold cursor-pointer"
                        >
                            View All Products
                        </Button>
                    </motion.div>
                )}

                {/* Bottom Trust & Craftsmanship Guarantees */}
                <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-zinc-200">
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] tracking-tight">
                            The Turrim Craftsmanship Promise
                        </h3>
                        <p className="text-xs sm:text-sm text-[#64748b]">
                            Every single piece is sculpted with precision, balanced for tactile play,
                            and built to last for generations of joyful learning.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-border/40 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-[#dffada] text-[#064228] flex items-center justify-center shrink-0">
                                <TreePine className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-[#1F2937]">
                                    Sustainably Sourced
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Solid European beechwood from PEFC-certified eco forests.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-border/40 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-[#dffada] text-[#064228] flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-[#1F2937]">
                                    100% Non-Toxic
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Colores with natural plant pigments and food-safe oils.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-border/40 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-[#dffada] text-[#064228] flex items-center justify-center shrink-0">
                                <Award className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-[#1F2937]">
                                    Therapy Certified
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Validated by speech therapists, psychomotorists, and educators.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-border/40 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-[#dffada] text-[#064228] flex items-center justify-center shrink-0">
                                <Truck className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-[#1F2937]">
                                    Global Eco-Delivery
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Plastic-free, 100% recyclable protective packaging.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductsPage;
