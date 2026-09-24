"use client";

import { useEffect, useRef, useState } from "react";
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

const Hero = () => {
    const [bgTextColors, setBgTextColors] = useState({
        s: "#D0D0D0",
        h: "#D0D0D0",
        r: "#D0D0D0",
        k: "#D0D0D0",
        o: "#D0D0D0",
        g: "#D0D0D0",
    });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

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

    const svgBg = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="30" font-family="Arial" font-size="40" font-weight="bold"
          fill="${bgTextColors.s}">T</text>
        <text x="50" y="70" font-family="Arial" font-size="35" font-weight="bold"
          fill="${bgTextColors.h}">U</text>
        <text x="20" y="90" font-family="Arial" font-size="30" font-weight="bold"
          fill="${bgTextColors.r}">R</text>
        <text x="34" y="34" font-family="Arial" font-size="30" font-weight="bold"
          fill="${bgTextColors.k}">R</text>
        <text x="44" y="44" font-family="Arial" font-size="30" font-weight="bold"
          fill="${bgTextColors.o}">I</text>
        <text x="74" y="74" font-family="Arial" font-size="30" font-weight="bold"
          fill="${bgTextColors.g}">M</text>
      </svg>
    `.trim();

    return (
        <section
            ref={containerRef}
            className="relative w-full h-115 sm:h-135 md:h-155 lg:h-175 overflow-hidden bg-[#E8E8E8] select-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgBg)}")`,
                backgroundSize: "clamp(120px, 18vw, 200px)",
                backgroundRepeat: "repeat"
            }}
        >
            {/* Matter.js Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-auto touch-pan-y"
            />

            {/* Top White Shade / Gradient between Navbar and Hero */}
            <div
                className="absolute top-0 left-0 right-0 h-24 sm:h-28 md:h-32 lg:h-36 pointer-events-none z-10"
                style={{
                    background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255, 255, 255, 0.85) 30%, rgba(255, 255, 255, 0.4) 65%, rgba(255, 255, 255, 0) 100%)",
                }}
            />
        </section>
    );
};

export default Hero;
