"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScaleInProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    initialScale?: number;
    delay?: number;
    duration?: number;
    once?: boolean;
    amount?: "some" | "all" | number;
    type?: "spring" | "tween";
    className?: string;
}

export function ScaleIn({
    children,
    initialScale = 0.85,
    delay = 0,
    duration = 0.5,
    once = true,
    amount = 0.2,
    type = "spring",
    className,
    ...props
}: ScaleInProps) {
    const variants: Variants = {
        hidden: {
            opacity: 0,
            scale: initialScale,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition:
                type === "spring"
                    ? {
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay,
                      }
                    : {
                          duration,
                          delay,
                          ease: [0.16, 1, 0.3, 1],
                      },
        },
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
