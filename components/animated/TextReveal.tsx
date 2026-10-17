"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
    text: string;
    mode?: "words" | "characters" | "lines";
    delay?: number;
    stagger?: number;
    duration?: number;
    once?: boolean;
    amount?: "some" | "all" | number;
    className?: string;
    wordClassName?: string;
    charClassName?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function TextReveal({
    text,
    mode = "words",
    delay = 0,
    stagger = mode === "characters" ? 0.025 : 0.08,
    duration = 0.5,
    once = true,
    amount = 0.2,
    className,
    wordClassName,
    charClassName,
    as = "p",
}: TextRevealProps) {
    const Tag = motion[as] as React.ElementType;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: "100%",
        },
        visible: {
            opacity: 1,
            y: "0%",
            transition: {
                duration,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    if (mode === "characters") {
        const words = text.split(" ");
        return (
            <Tag
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once, amount }}
                className={cn("flex flex-wrap overflow-hidden", className)}
            >
                {words.map((word, wordIndex) => (
                    <span key={wordIndex} className={cn("inline-flex overflow-hidden mr-[0.25em]", wordClassName)}>
                        {word.split("").map((char, charIndex) => (
                            <motion.span
                                key={charIndex}
                                variants={itemVariants}
                                className={cn("inline-block", charClassName)}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </Tag>
        );
    }

    // Default: words
    const words = text.split(" ");
    return (
        <Tag
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            className={cn("flex flex-wrap overflow-hidden", className)}
        >
            {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span
                        variants={itemVariants}
                        className={cn("inline-block", wordClassName)}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}
