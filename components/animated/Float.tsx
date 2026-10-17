"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    distance?: number;
    duration?: number;
    rotation?: number;
    delay?: number;
    className?: string;
}

export function Float({
    children,
    distance = 10,
    duration = 4,
    rotation = 2,
    delay = 0,
    className,
    ...props
}: FloatProps) {
    return (
        <motion.div
            animate={{
                y: [-distance / 2, distance / 2, -distance / 2],
                rotate: [-rotation, rotation, -rotation],
            }}
            transition={{
                duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay,
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export interface HoverScaleProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    scale?: number;
    lift?: number;
    className?: string;
}

export function HoverScale({
    children,
    scale = 1.05,
    lift = -4,
    className,
    ...props
}: HoverScaleProps) {
    return (
        <motion.div
            whileHover={{ scale, y: lift }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
