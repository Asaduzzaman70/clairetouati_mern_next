"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type SlideDirection = "left" | "right" | "top" | "bottom";

export interface SlideInProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    direction?: SlideDirection;
    distance?: number | string;
    delay?: number;
    duration?: number;
    once?: boolean;
    amount?: "some" | "all" | number;
    className?: string;
}

export function SlideIn({
    children,
    direction = "left",
    distance = 60,
    delay = 0,
    duration = 0.6,
    once = true,
    amount = 0.2,
    className,
    ...props
}: SlideInProps) {
    const getInitialCoordinates = () => {
        switch (direction) {
            case "left":
                return { x: typeof distance === "number" ? -distance : `-${distance}`, y: 0 };
            case "right":
                return { x: typeof distance === "number" ? distance : distance, y: 0 };
            case "top":
                return { x: 0, y: typeof distance === "number" ? -distance : `-${distance}` };
            case "bottom":
                return { x: 0, y: typeof distance === "number" ? distance : distance };
        }
    };

    const initialPos = getInitialCoordinates();

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: initialPos.x,
            y: initialPos.y,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
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
