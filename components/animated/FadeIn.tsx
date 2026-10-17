"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type FadeDirection = "up" | "down" | "left" | "right" | "none";

export interface FadeInProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    direction?: FadeDirection;
    delay?: number;
    duration?: number;
    distance?: number;
    once?: boolean;
    amount?: "some" | "all" | number;
    className?: string;
}

export function FadeIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    distance = 24,
    once = true,
    amount = 0.2,
    className,
    ...props
}: FadeInProps) {
    const getInitialOffset = (): { x: number; y: number } => {
        switch (direction) {
            case "up":
                return { x: 0, y: distance };
            case "down":
                return { x: 0, y: -distance };
            case "left":
                return { x: distance, y: 0 };
            case "right":
                return { x: -distance, y: 0 };
            case "none":
            default:
                return { x: 0, y: 0 };
        }
    };

    const offset = getInitialOffset();

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: offset.x,
            y: offset.y,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
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
