"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";

const baseShapeConfigs = [
    // Blue circle (large)
    { type: "circle", color: "#0066CC", baseSize: 200, text: "Cure Through\nwonder" },
    // Yellow circle (large)
    { type: "circle", color: "#FFD700", baseSize: 200, text: "Cure Through\nwonder" },
    // Red circle (large)
    { type: "circle", color: "#DC143C", baseSize: 200, text: "Cure Through\nwonder" },
    // Orange circle (medium)
    { type: "circle", color: "#FF7F50", baseSize: 180, text: "Cure Through\nwonder" },
    // Purple circle (medium)
    { type: "circle", color: "#8B5CF6", baseSize: 180, text: "Cure Through\nwonder" },

    // Green rectangles
    { type: "rectangle", color: "#047857", baseSize: 200, text: "Cure Through\nwonder" },
    { type: "rectangle", color: "#047857", baseSize: 180, text: "Cure Through\nwonder" },
    { type: "rectangle", color: "#047857", baseSize: 170, text: "Cure Through\nwonder" },

    // Yellow rectangles
    { type: "rectangle", color: "#FFD700", baseSize: 190, text: "Cure Through\nwonder" },
    { type: "rectangle", color: "#FFD700", baseSize: 175, text: "Cure Through\nwonder" },

    // Blue rectangle
    { type: "rectangle", color: "#0066CC", baseSize: 185, text: "Cure Through\nwonder" },

    // Yellow triangle
    { type: "triangle", color: "#FFD700", baseSize: 250, text: "Cure Through\nwonder" },

    // Red triangle
    { type: "triangle", color: "#DC143C", baseSize: 240, text: "Cure Through\nwonder" },
];

// Seeded PRNG (mulberry32) – gives a stable, deterministic random sequence
function mulberry32(seed: number) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6D2B79F5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

interface BgColors {
    s: string; h: string; r: string; k: string; o: string; g: string;
}
type ColorGroup = "s" | "h" | "r" | "o" | "k" | "g";

interface TokenDef {
    text: string;
    group: ColorGroup;
    baseSize: number;
    isDot?: boolean;
}

const TOKENS: TokenDef[] = [
    // Yellow tokens (activated by Yellow blocks -> group 'h')
    { text: "HAS", group: "h", baseSize: 50 },
    { text: "HAS", group: "h", baseSize: 54 },
    { text: "HAS", group: "h", baseSize: 46 },
    { text: "U", group: "h", baseSize: 60 },
    { text: "Y", group: "h", baseSize: 52 },
    { text: "S", group: "h", baseSize: 48 },
    { text: "M", group: "h", baseSize: 56 },
    { text: "A", group: "h", baseSize: 50 },
    { text: "", group: "h", baseSize: 8, isDot: true },

    // Green tokens (activated by Green blocks -> group 'g')
    { text: "+", group: "g", baseSize: 54 },
    { text: "+", group: "g", baseSize: 50 },
    { text: "F", group: "g", baseSize: 56 },
    { text: "L", group: "g", baseSize: 52 },
    { text: "M", group: "g", baseSize: 58 },
    { text: "W", group: "g", baseSize: 52 },
    { text: "V", group: "g", baseSize: 48 },
    { text: "", group: "g", baseSize: 7, isDot: true },

    // Red tokens (activated by Red blocks -> group 'r')
    { text: "R", group: "r", baseSize: 64 },
    { text: "H", group: "r", baseSize: 56 },
    { text: "C", group: "r", baseSize: 52 },
    { text: "O", group: "r", baseSize: 52 },
    { text: "Y", group: "r", baseSize: 52 },
    { text: "HAS", group: "r", baseSize: 48 },
    { text: "D", group: "r", baseSize: 50 },
    { text: "", group: "r", baseSize: 8, isDot: true },

    // Blue tokens (activated by Blue blocks -> group 's')
    { text: "T", group: "s", baseSize: 65 },
    { text: "T", group: "s", baseSize: 58 },
    { text: "T", group: "s", baseSize: 62 },
    { text: "B", group: "s", baseSize: 50 },
    { text: "N", group: "s", baseSize: 52 },
    { text: "E", group: "s", baseSize: 50 },
    { text: "", group: "s", baseSize: 7, isDot: true },

    // Orange tokens (activated by Orange blocks -> group 'o')
    { text: "I", group: "o", baseSize: 58 },
    { text: "I", group: "o", baseSize: 52 },
    { text: "HAS", group: "o", baseSize: 46 },
    { text: "P", group: "o", baseSize: 48 },
    { text: "K", group: "o", baseSize: 50 },
    { text: "U", group: "o", baseSize: 54 },
    { text: "", group: "o", baseSize: 8, isDot: true },

    // Purple tokens (activated by Purple blocks -> group 'k')
    { text: "R", group: "k", baseSize: 62 },
    { text: "K", group: "k", baseSize: 52 },
    { text: "M", group: "k", baseSize: 56 },
    { text: "G", group: "k", baseSize: 50 },
    { text: "E", group: "k", baseSize: 50 },
    { text: "HAS", group: "k", baseSize: 48 },
    { text: "", group: "k", baseSize: 7, isDot: true },
];

const SECONDARY_CHARS = [
    { text: "D", group: "r" as ColorGroup },
    { text: "P", group: "o" as ColorGroup },
    { text: "E", group: "s" as ColorGroup },
    { text: "N", group: "s" as ColorGroup },
    { text: "K", group: "k" as ColorGroup },
    { text: "V", group: "g" as ColorGroup },
    { text: "B", group: "s" as ColorGroup },
    { text: "G", group: "k" as ColorGroup },
    { text: "H", group: "r" as ColorGroup },
    { text: "A", group: "h" as ColorGroup },
    { text: "T", group: "s" as ColorGroup },
    { text: "R", group: "r" as ColorGroup },
    { text: "C", group: "r" as ColorGroup },
    { text: "L", group: "g" as ColorGroup },
    { text: "M", group: "g" as ColorGroup },
    { text: "S", group: "h" as ColorGroup },
    { text: "Y", group: "h" as ColorGroup },
    { text: "I", group: "o" as ColorGroup },
];

interface ZJellyTransform {
    scale: number;
    shadowBlur: number;
    shadowOffsetY: number;
}

// Compute Z-axis jump and rubbery jelly bounce (towards screen / viewer)
function computeZJelly(p: number, isColored: boolean): ZJellyTransform {
    if (p <= 0) {
        return { scale: 1.0, shadowBlur: 0, shadowOffsetY: 0 };
    }
    if (p >= 1) {
        const base = isColored ? 1.18 : 1.0;
        return {
            scale: base,
            shadowBlur: isColored ? 3 : 0,
            shadowOffsetY: isColored ? 1.5 : 0,
        };
    }

    // Settled base scale
    const targetBase = isColored ? 1.18 : 1.0;

    // Z-axis jump pop: shoots forward along Z towards viewer, then bounces like jelly
    const decay = Math.pow(1 - p, 2.0);
    const zBounce = Math.sin(p * Math.PI * 5) * decay * 0.38;

    // Smooth transition towards 1.18 settled scale
    const currentBase = 1.0 + (targetBase - 1.0) * Math.min(p * 1.5, 1);
    const scale = Math.max(0.6, currentBase + zBounce);

    // 3D depth shadow as it lifts forward on Z-axis
    const lift = Math.max(0, scale - 1.0);
    const shadowBlur = lift * 18;
    const shadowOffsetY = lift * 6;

    return {
        scale,
        shadowBlur,
        shadowOffsetY,
    };
}

function drawBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    colors: BgColors,
    groupAnims?: Record<ColorGroup, ZJellyTransform>
) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#E8E8E8";
    ctx.fillRect(0, 0, width, height);

    const rand = mulberry32(42); // fixed seed for stable layout

    const getGroupColor = (group: ColorGroup, defaultGray: string): string => {
        if (group === "s") return colors.s !== "#D0D0D0" ? colors.s : defaultGray;
        if (group === "h") return colors.h !== "#D0D0D0" ? colors.h : defaultGray;
        if (group === "r") return colors.r !== "#D0D0D0" ? colors.r : defaultGray;
        if (group === "o") return colors.o !== "#D0D0D0" ? colors.o : defaultGray;
        if (group === "k") return colors.k !== "#D0D0D0" ? colors.k : defaultGray;
        if (group === "g") return colors.g !== "#D0D0D0" ? colors.g : defaultGray;
        return defaultGray;
    };

    const getAnim = (group: ColorGroup): ZJellyTransform => {
        if (groupAnims && groupAnims[group]) return groupAnims[group];
        const isColored = colors[group] !== "#D0D0D0";
        const base = isColored ? 1.18 : 1.0;
        return {
            scale: base,
            shadowBlur: isColored ? 3 : 0,
            shadowOffsetY: isColored ? 1.5 : 0,
        };
    };

    // Dense grid cell size (~72px) so there are no empty gaps
    const cellSize = 72;
    const cols = Math.ceil(width / cellSize) + 2;
    const rows = Math.ceil(height / cellSize) + 2;

    for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
            const tokenIdx = Math.floor(rand() * TOKENS.length);
            const token = TOKENS[tokenIdx];

            // Soft gray shade variance for subtle depth when uncolored
            const grayShades = ["#C4C4C4", "#BDBDBD", "#C8C8C8", "#B5B5B5", "#CECECE"];
            const defaultGray = grayShades[Math.floor(rand() * grayShades.length)];
            const color = getGroupColor(token.group, defaultGray);
            const anim = getAnim(token.group);

            const jx = (rand() - 0.5) * cellSize * 0.75;
            const jy = (rand() - 0.5) * cellSize * 0.75;
            const cx = col * cellSize + cellSize / 2 + jx;
            const cy = row * cellSize + cellSize / 2 + jy;

            // Discrete rotation angles matching screenshot aesthetics (upright, 45°, 90°, 180°, slight tilts)
            const angleOptions = [0, 0, 0.45, -0.45, Math.PI / 2, -Math.PI / 2, Math.PI, 0.25, -0.25];
            const angle = angleOptions[Math.floor(rand() * angleOptions.length)];

            ctx.save();
            ctx.translate(cx, cy); // Remains exactly in place (NO upward jump)
            ctx.scale(anim.scale, anim.scale); // Jumps forward along Z-axis
            ctx.rotate(angle);

            if (anim.shadowBlur > 0.5) {
                ctx.shadowColor = "rgba(0, 0, 0, 0.20)";
                ctx.shadowBlur = anim.shadowBlur;
                ctx.shadowOffsetY = anim.shadowOffsetY;
            }

            if (token.isDot) {
                ctx.beginPath();
                ctx.arc(0, 0, token.baseSize, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            } else if (token.text === "+") {
                ctx.font = `900 ${token.baseSize}px Arial, sans-serif`;
                ctx.fillStyle = color;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("+", 0, 0);
            } else {
                ctx.font = `bold ${token.baseSize}px Arial, sans-serif`;
                ctx.fillStyle = color;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(token.text, 0, 0);
            }
            ctx.restore();

            // In ~55% of cells, add a secondary letter (also color-grouped) to eliminate any gaps
            if (rand() > 0.45 && !token.isDot) {
                const sec = SECONDARY_CHARS[Math.floor(rand() * SECONDARY_CHARS.length)];
                const sx = cx + (rand() - 0.5) * cellSize * 0.65;
                const sy = cy + (rand() - 0.5) * cellSize * 0.65;
                const sAngle = (rand() - 0.5) * Math.PI;
                const sBase = 24 + rand() * 12; // 24-36px
                const secAnim = getAnim(sec.group);
                const sGray = grayShades[Math.floor(rand() * grayShades.length)];
                const sColor = getGroupColor(sec.group, sGray);

                ctx.save();
                ctx.translate(sx, sy); // NO upward jump
                ctx.scale(secAnim.scale, secAnim.scale); // Z-axis jump
                ctx.rotate(sAngle);

                if (secAnim.shadowBlur > 0.5) {
                    ctx.shadowColor = "rgba(0, 0, 0, 0.20)";
                    ctx.shadowBlur = secAnim.shadowBlur;
                    ctx.shadowOffsetY = secAnim.shadowOffsetY;
                }

                ctx.font = `bold ${sBase}px Arial, sans-serif`;
                ctx.fillStyle = sColor;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(sec.text, 0, 0);
                ctx.restore();
            }
        }
    }
}


const Hero = () => {
    const [bgTextColors, setBgTextColors] = useState<BgColors>({
        s: "#D0D0D0",
        h: "#D0D0D0",
        r: "#D0D0D0",
        k: "#D0D0D0",
        o: "#D0D0D0",
        g: "#D0D0D0",
    });

    const bgCanvasRef = useRef<HTMLCanvasElement>(null);   // static background canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);     // Matter.js physics canvas
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    // Track Z-axis jelly bounce animation start time per group
    const jellyStartsRef = useRef<Record<ColorGroup, number>>({
        s: 0,
        h: 0,
        r: 0,
        k: 0,
        o: 0,
        g: 0,
    });
    const prevColorsRef = useRef<BgColors>(bgTextColors);
    const animIdRef = useRef<number | null>(null);

    // Utility: sync bg canvas size + repaint
    const repaintBg = useCallback((colors: BgColors, anims?: Record<ColorGroup, ZJellyTransform>) => {
        const bgCanvas = bgCanvasRef.current;
        const container = containerRef.current;
        if (!bgCanvas || !container) return;
        bgCanvas.width = container.clientWidth || window.innerWidth || 1200;
        bgCanvas.height = container.clientHeight || 700;
        const ctx = bgCanvas.getContext("2d");
        if (ctx) drawBackground(ctx, bgCanvas.width, bgCanvas.height, colors, anims);
    }, []);

    // Initial background paint
    useEffect(() => {
        repaintBg(bgTextColors);
        const onResize = () => repaintBg(bgTextColors);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Z-axis jelly bounce animation trigger on block clicks
    useEffect(() => {
        const groups: ColorGroup[] = ["s", "h", "r", "k", "o", "g"];
        const prev = prevColorsRef.current;
        const now = performance.now();

        // Check which groups were newly colored
        groups.forEach((g) => {
            if (bgTextColors[g] !== prev[g] && bgTextColors[g] !== "#D0D0D0") {
                jellyStartsRef.current[g] = now;
            }
        });
        prevColorsRef.current = bgTextColors;

        // Stop any running animation loop before restarting
        if (animIdRef.current) {
            cancelAnimationFrame(animIdRef.current);
            animIdRef.current = null;
        }

        const duration = 580; // ms Z-jelly bounce duration

        const tick = () => {
            const currentTime = performance.now();
            let anyRunning = false;
            const currentAnims: Record<ColorGroup, ZJellyTransform> = {} as any;

            groups.forEach((g) => {
                const startTime = jellyStartsRef.current[g];
                const isColored = bgTextColors[g] !== "#D0D0D0";

                if (startTime > 0) {
                    const elapsed = currentTime - startTime;
                    if (elapsed < duration) {
                        anyRunning = true;
                        currentAnims[g] = computeZJelly(elapsed / duration, isColored);
                    } else {
                        currentAnims[g] = computeZJelly(1, isColored);
                    }
                } else {
                    currentAnims[g] = computeZJelly(isColored ? 1 : 0, isColored);
                }
            });

            repaintBg(bgTextColors, currentAnims);

            if (anyRunning) {
                animIdRef.current = requestAnimationFrame(tick);
            } else {
                animIdRef.current = null;
            }
        };

        animIdRef.current = requestAnimationFrame(tick);

        return () => {
            if (animIdRef.current) {
                cancelAnimationFrame(animIdRef.current);
            }
        };
    }, [bgTextColors, repaintBg]);

    // ─── Matter.js physics setup ────────────────────────────────────────────────
    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

        // Create engine with gravity
        const engine = Engine.create({
            gravity: { x: 0, y: 0.85 }
        });
        engineRef.current = engine;

        // Get container dimensions
        const width = container.clientWidth || window.innerWidth || 1200;
        const height = container.clientHeight || 700;

        // Calculate responsive scale factor for shapes
        const getScaleFactor = (w: number) => {
            if (w < 400) return 0.52;
            if (w < 640) return 0.62;
            if (w < 768) return 0.72;
            if (w < 1024) return 0.85;
            return 1;
        };

        const scaleFactor = getScaleFactor(width);

        // Filter shapes on very small screens to avoid overcrowding
        const activeShapeConfigs = width < 540
            ? baseShapeConfigs.slice(0, 8)
            : baseShapeConfigs;

        // Create renderer
        const render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: "transparent",
            }
        });
        renderRef.current = render;

        // Create boundaries (walls)
        const wallThickness = 500;
        const bottomWall = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 5, wallThickness, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });
        const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 5, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 5, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });
        const topWall = Bodies.rectangle(width / 2, -wallThickness * 2, width * 5, wallThickness, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });

        const walls = [bottomWall, leftWall, rightWall, topWall];
        const shapes: Matter.Body[] = [];

        activeShapeConfigs.forEach((config) => {
            const size = config.baseSize * scaleFactor;
            const x = Math.random() * Math.max(width - size - 20, 20) + size / 2 + 10;
            const y = Math.random() * -1000 - 150; // Start above screen

            let shape: Matter.Body;

            if (config.type === "circle") {
                shape = Bodies.circle(x, y, size / 2, {
                    restitution: 0.45,
                    friction: 0.15,
                    density: 0.001,
                    render: {
                        fillStyle: config.color,
                    }
                });
            } else if (config.type === "rectangle") {
                shape = Bodies.rectangle(x, y, size, size, {
                    restitution: 0.45,
                    friction: 0.15,
                    density: 0.001,
                    angle: Math.random() * (Math.PI / 4),
                    render: {
                        fillStyle: config.color,
                    }
                });
            } else { // triangle
                shape = Bodies.polygon(x, y, 3, size / 2, {
                    restitution: 0.45,
                    friction: 0.15,
                    density: 0.001,
                    angle: Math.random() * Math.PI,
                    render: {
                        fillStyle: config.color,
                    }
                });
            }

            // Store text metadata and scaled size on the body
            (shape as any).customText = config.text;
            (shape as any).shapeSize = size;
            (shape as any).shapeType = config.type;
            shapes.push(shape);
        });

        // Add all bodies to the world
        Composite.add(engine.world, [...walls, ...shapes]);

        // Add mouse / touch control
        const mouse = Mouse.create(canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Change specific background text colors when a shape is clicked or touched
        Events.on(mouseConstraint, "mousedown", () => {
            const body = mouseConstraint.body;
            if (body && (body as any).customText && body.render.fillStyle) {
                const color = body.render.fillStyle as string;
                setBgTextColors(prev => {
                    if (color === "#0066CC") return { ...prev, s: color };
                    if (color === "#FFD700") return { ...prev, h: color };
                    if (color === "#DC143C") return { ...prev, r: color };
                    if (color === "#FF7F50") return { ...prev, o: color };
                    if (color === "#8B5CF6") return { ...prev, k: color };
                    if (color === "#047857") return { ...prev, g: color };
                    return { ...prev, s: "#D0D0D0", h: "#D0D0D0", r: "#D0D0D0", o: "#D0D0D0", k: "#D0D0D0", g: "#D0D0D0" };
                });
            }
        });

        // Exact frame-synchronized text rendering directly inside Matter.js afterRender hook
        Events.on(render, "afterRender", () => {
            const ctx = render.context;
            if (!ctx) return;

            shapes.forEach((shape) => {
                const text = (shape as any).customText;
                const size = (shape as any).shapeSize;
                const shapeType = (shape as any).shapeType;
                if (!text) return;

                const pos = shape.position;
                const angle = shape.angle;

                ctx.save();
                ctx.translate(pos.x, pos.y);
                ctx.rotate(angle);

                // Maximum allowable text width inside the shape
                const maxTextWidth = size * (shapeType === "triangle" ? 0.42 : shapeType === "circle" ? 0.62 : 0.72);

                // Dynamic proportional font size
                let fontSize = Math.min(Math.max(9, Math.floor(size * 0.065)), 14);
                ctx.font = `600 ${fontSize}px Inter, sans-serif`;

                const lines: string[] = text.split("\n");

                // Auto-fit font size if any line exceeds max allowable width
                for (const line of lines) {
                    while (ctx.measureText(line).width > maxTextWidth && fontSize > 7) {
                        fontSize -= 0.5;
                        ctx.font = `600 ${fontSize}px Inter, sans-serif`;
                    }
                }

                const lineHeight = fontSize * 1.3;
                const totalHeight = lines.length * lineHeight;
                const startY = -totalHeight / 2 + lineHeight / 2;

                ctx.fillStyle = "#FFFFFF";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                lines.forEach((line, i) => {
                    ctx.fillText(line, 0, startY + i * lineHeight);
                });

                ctx.restore();
            });
        });

        // Run the engine and renderer
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);

        // Handle window resize
        const handleResize = () => {
            if (!containerRef.current || !renderRef.current) return;
            const newWidth = containerRef.current.clientWidth;
            const newHeight = containerRef.current.clientHeight;

            render.canvas.width = newWidth;
            render.canvas.height = newHeight;
            render.options.width = newWidth;
            render.options.height = newHeight;

            // Reposition walls to match new dimensions
            Matter.Body.setPosition(bottomWall, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
            Matter.Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
            Matter.Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
            Matter.Body.setPosition(topWall, { x: newWidth / 2, y: -wallThickness * 2 });
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener("resize", handleResize);
            if (runnerRef.current) {
                Runner.stop(runnerRef.current);
                runnerRef.current = null;
            }
            if (renderRef.current) {
                Render.stop(renderRef.current);
                renderRef.current.textures = {};
                renderRef.current = null;
            }
            if (mouse) {
                Mouse.clearSourceEvents(mouse);
            }
            if (engineRef.current) {
                Composite.clear(engineRef.current.world, false);
                Engine.clear(engineRef.current);
                engineRef.current = null;
            }
            if (canvas) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-115 sm:h-135 md:h-155 lg:h-175 overflow-hidden select-none"
        >
            {/* Canvas-drawn TURRIM letter background */}
            <canvas
                ref={bgCanvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 0 }}
            />

            {/* Matter.js Physics Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-auto touch-pan-y"
                style={{ zIndex: 1 }}
            />

            {/* Top White Shade / Gradient between Navbar and Hero */}
            <div
                className="absolute top-0 left-0 right-0 h-24 sm:h-28 md:h-32 lg:h-36 pointer-events-none"
                style={{
                    zIndex: 2,
                    background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255, 255, 255, 0.85) 30%, rgba(255, 255, 255, 0.4) 65%, rgba(255, 255, 255, 0) 100%)",
                }}
            />
        </section>
    );
};

export default Hero;
