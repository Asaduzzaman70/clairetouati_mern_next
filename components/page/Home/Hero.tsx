"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const Hero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

        // Create engine with gravity
        const engine = Engine.create({
            gravity: { x: 0, y: 0.8 }
        });
        engineRef.current = engine;

        // Get container dimensions
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Create renderer
        const render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: "transparent"
            }
        });
        renderRef.current = render;

        // Create boundaries (walls)
        const wallThickness = 50;
        const walls = [
            // Bottom
            Bodies.rectangle(
                width / 2,
                height + wallThickness / 2,
                width,
                wallThickness,
                { isStatic: true, render: { fillStyle: "transparent" } }
            ),
            // Left
            Bodies.rectangle(
                -wallThickness / 2,
                height / 2,
                wallThickness,
                height,
                { isStatic: true, render: { fillStyle: "transparent" } }
            ),
            // Right
            Bodies.rectangle(
                width + wallThickness / 2,
                height / 2,
                wallThickness,
                height,
                { isStatic: true, render: { fillStyle: "transparent" } }
            )
        ];

        // Shape configurations matching the image
        const shapeConfigs = [
            // Blue circle (large)
            { type: "circle", color: "#0066CC", size: 220, text: "Cure Through\nwonder" },
            // Yellow circle (large)
            { type: "circle", color: "#FFD700", size: 220, text: "Cure Through\nwonder" },
            // Red circle (large)
            { type: "circle", color: "#DC143C", size: 220, text: "Cure Through\nwonder" },
            // Orange circle (medium)
            { type: "circle", color: "#FF7F50", size: 200, text: "Cure\nThrough\nwonder" },
            // Purple circle (medium)
            { type: "circle", color: "#8B5CF6", size: 200, text: "Cure Through\nwonder" },

            // Green rectangles
            { type: "rectangle", color: "#047857", size: 220, text: "Cure Through\nwonder" },
            { type: "rectangle", color: "#047857", size: 200, text: "Cure Through\nwonder" },
            { type: "rectangle", color: "#047857", size: 190, text: "Cure Through\nwonder" },

            // Yellow rectangles
            { type: "rectangle", color: "#FFD700", size: 210, text: "Cure Through\nwonder" },
            { type: "rectangle", color: "#FFD700", size: 195, text: "Cure Through\nwonder" },

            // Blue rectangle
            { type: "rectangle", color: "#0066CC", size: 205, text: "Cure Through\nwonder" },

            // Yellow triangle
            { type: "triangle", color: "#FFD700", size: 330, text: "Cure Through\nwonder" },

            // Red triangle
            { type: "triangle", color: "#DC143C", size: 310, text: "Cure Through\nwonder" },
        ];

        const shapes: Matter.Body[] = [];

        shapeConfigs.forEach((config, index) => {
            const x = Math.random() * (width - 200) + 100;
            const y = Math.random() * -1500 - 200; // Start above screen

            let shape: Matter.Body;

            if (config.type === "circle") {
                shape = Bodies.circle(x, y, config.size / 2, {
                    restitution: 0.5,
                    friction: 0.1,
                    density: 0.001,
                    render: {
                        fillStyle: config.color,
                    }
                });
            } else if (config.type === "rectangle") {
                shape = Bodies.rectangle(x, y, config.size, config.size, {
                    restitution: 0.5,
                    friction: 0.1,
                    density: 0.001,
                    angle: Math.random() * Math.PI / 4,
                    render: {
                        fillStyle: config.color,
                    }
                });
            } else { // triangle
                shape = Bodies.polygon(x, y, 3, config.size / 2, {
                    restitution: 0.5,
                    friction: 0.1,
                    density: 0.001,
                    angle: Math.random() * Math.PI,
                    render: {
                        fillStyle: config.color,
                    }
                });
            }

            // Store text data on the body for custom rendering
            (shape as any).customText = config.text;
            (shape as any).shapeSize = config.size;
            shapes.push(shape);
        });

        // Add all bodies to the world
        Composite.add(engine.world, [...walls, ...shapes]);

        // Add mouse control
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

        // Run the engine and renderer
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);

        // Custom text rendering on top of Matter.js shapes
        const drawText = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            shapes.forEach((shape) => {
                const text = (shape as any).customText;
                const size = (shape as any).shapeSize;
                if (!text) return;

                const pos = shape.position;
                const angle = shape.angle;

                ctx.save();
                ctx.translate(pos.x, pos.y);
                ctx.rotate(angle);

                // Text styling
                ctx.fillStyle = "#FFFFFF";
                ctx.font = `${size > 110 ? 16 : 14}px Inter, sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // Draw multi-line text
                const lines = text.split("\n");
                const lineHeight = size > 110 ? 20 : 18;
                const totalHeight = lines.length * lineHeight;
                const startY = -totalHeight / 2 + lineHeight / 2;

                lines.forEach((line: string, i: number) => {
                    ctx.fillText(line, 0, startY + i * lineHeight);
                });

                ctx.restore();
            });

            requestAnimationFrame(drawText);
        };

        drawText();

        // Handle window resize
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;

            render.canvas.width = newWidth;
            render.canvas.height = newHeight;
            render.options.width = newWidth;
            render.options.height = newHeight;
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener("resize", handleResize);

            if (runnerRef.current && engineRef.current) {
                Runner.stop(runnerRef.current);
            }
            if (renderRef.current) {
                Render.stop(renderRef.current);
            }
            if (engineRef.current) {
                Engine.clear(engineRef.current);
            }
            if (renderRef.current && renderRef.current.canvas) {
                renderRef.current.canvas.remove();
            }
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[700px] overflow-hidden bg-[#E8E8E8]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' font-family='Arial' font-size='40' font-weight='bold' fill='%23D0D0D0' opacity='0.3'%3ES%3C/text%3E%3Ctext x='50' y='70' font-family='Arial' font-size='35' font-weight='bold' fill='%23D0D0D0' opacity='0.3'%3EH%3C/text%3E%3Ctext x='20' y='90' font-family='Arial' font-size='30' font-weight='bold' fill='%23D0D0D0' opacity='0.3'%3ER%3C/text%3E%3C/svg%3E")`,
                backgroundSize: "200px 200px",
                backgroundRepeat: "repeat"
            }}
        >
            {/* Matter.js Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-auto"
            />
        </section>
    );
};

export default Hero;
