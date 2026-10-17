"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    staggerDelay?: number;
    delayChildren?: number;
    once?: boolean;
    amount?: "some" | "all" | number;
    className?: string;
}

export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    delayChildren = 0,
    once = true,
    amount = 0.2,
    className,
    ...props
}: StaggerContainerProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
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

export interface StaggerItemProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    yOffset?: number;
    duration?: number;
    className?: string;
}

export function StaggerItem({
    children,
    yOffset = 20,
    duration = 0.5,
    className,
    ...props
}: StaggerItemProps) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: yOffset },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                ease: [0.21, 0.47, 0.32, 0.98],
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className={cn(className)} {...props}>
            {children}
        </motion.div>
    );
}
