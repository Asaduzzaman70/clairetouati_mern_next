"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowUpRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Product {
    id: string | number;
    title: string;
    subtitle?: string;
    description: string;
    category: string;
    price: number;
    originalPrice?: number;
    currency?: string;
    rating: number;
    reviewsCount: number;
    badge?: string;
    badgeVariant?: "mint" | "yellow" | "coral" | "purple" | "blue" | "green";
    image: StaticImageData | string;
    features?: string[];
    inStock?: boolean;
    href?: string;
}

export interface ProductCardProps {
    product: Product;
    onAction?: (product: Product) => void;
    actionLabel?: string;
    className?: string;
}

const badgeVariantStyles: Record<
    NonNullable<Product["badgeVariant"]>,
    { bg: string; text: string }
> = {
    mint: { bg: "bg-[#dffada]", text: "text-[#064228]" },
    yellow: { bg: "bg-[#FFD600]", text: "text-[#1A1A2E]" },
    coral: { bg: "bg-[#FF8A50]", text: "text-white" },
    purple: { bg: "bg-[#6930C3]", text: "text-white" },
    blue: { bg: "bg-[#0056D2]", text: "text-white" },
    green: { bg: "bg-[#007F3E]", text: "text-white" },
};

export function ProductCard({
    product,
    onAction,
    actionLabel = "Order Turrim",
    className,
}: ProductCardProps) {
    const badgeStyle = product.badgeVariant
        ? badgeVariantStyles[product.badgeVariant]
        : badgeVariantStyles.mint;

    const currencySymbol = product.currency || "€";

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
            className={cn(
                "bg-[#FBF9F7] hover:bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgb(0,0,0,0.08)] border border-border/50 flex flex-col justify-between h-full transition-all duration-300 group select-none",
                className
            )}
        >
            <div className="flex flex-col gap-3.5 sm:gap-4">
                {/* Media Container */}
                <div className="relative w-full aspect-4/3 rounded-xl sm:rounded-[1.2rem] overflow-hidden bg-zinc-100">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Floating Badge (Top Left) */}
                    {product.badge && (
                        <div className="absolute top-3 left-3 z-10">
                            <span
                                className={cn(
                                    "px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-xs flex items-center gap-1",
                                    badgeStyle.bg,
                                    badgeStyle.text
                                )}
                            >
                                <Sparkles className="w-3 h-3 shrink-0" />
                                {product.badge}
                            </span>
                        </div>
                    )}

                    {/* Stock Status Chip (Bottom Left - avoids collision with top badge) */}
                    <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-white/95 backdrop-blur-md text-zinc-800 shadow-sm flex items-center gap-1.5 border border-black/5">
                            <span
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    product.inStock !== false ? "bg-[#1da824]" : "bg-red-500"
                                )}
                            />
                            {product.inStock !== false ? "In Stock" : "Pre-order"}
                        </span>
                    </div>
                </div>

                {/* Category & Rating Row */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                    <span className="px-3 py-1 bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold rounded-full truncate">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs sm:text-sm font-semibold text-foreground">
                            {product.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            ({product.reviewsCount})
                        </span>
                    </div>
                </div>

                {/* Title & Description with uniform baseline heights */}
                <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] group-hover:text-[#064228] transition-colors tracking-tight leading-snug line-clamp-2 min-h-13 sm:min-h-14 flex items-start">
                        {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed line-clamp-2 font-normal h-10">
                        {product.description}
                    </p>
                </div>

                {/* Feature Tags with uniform vertical rhythm */}
                <div className="flex flex-wrap gap-1.5 pt-1 min-h-13 content-start">
                    {product.features && product.features.length > 0 &&
                        product.features.slice(0, 3).map((feat, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-zinc-600 bg-white border border-zinc-200/80 px-2.5 py-1 rounded-full"
                            >
                                <Check className="w-3 h-3 text-[#1da824]" />
                                {feat}
                            </span>
                        ))}
                </div>
            </div>

            {/* Footer: Pricing & Action Button */}
            <div className="mt-5 pt-4 border-t border-zinc-200/60 flex items-center justify-between gap-3">
                {/* Price block */}
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-bold text-[#064228] tracking-tight">
                            {currencySymbol}{product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs sm:text-sm text-muted-foreground line-through font-medium">
                                {currencySymbol}{product.originalPrice}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground">
                        Tax included • Free shipping
                    </span>
                </div>

                {/* Action CTA Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {product.href ? (
                        <Link href={product.href}>
                            <Button className="rounded-full bg-[#0a0a0a] hover:bg-[#064228] text-white h-11 px-4 sm:px-5 font-semibold text-xs sm:text-sm shadow-sm gap-1.5 cursor-pointer transition-colors duration-200">
                                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>{actionLabel}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            onClick={() => onAction?.(product)}
                            className="rounded-full bg-[#0a0a0a] hover:bg-[#064228] text-white h-11 px-4 sm:px-5 font-semibold text-xs sm:text-sm shadow-sm gap-1.5 cursor-pointer transition-colors duration-200"
                        >
                            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>{actionLabel}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Button>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ProductCard;
