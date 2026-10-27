"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Home,
  ArrowLeft,
  Sparkles,
  Play,
  Shapes,
  Blocks,
  ArrowRight,
  ArrowUp,
  RotateCw,
} from "lucide-react";

// The 6 iconic Montessori / Bauhaus colors from Turrim's design system
const MONTESSORI_COLORS = {
  yellow: { hex: "#DC9F12", light: "#FEF08A", text: "#1A1A2E", letter: "T" },
  coral: { hex: "#FF7E4D", light: "#FED7AA", text: "#FFFFFF", letter: "U" },
  red: { hex: "#DC143C", light: "#FECDD3", text: "#FFFFFF", letter: "R" },
  purple: { hex: "#7C3AED", light: "#DDD6FE", text: "#FFFFFF", letter: "R" },
  blue: { hex: "#0066CC", light: "#BAE6FD", text: "#FFFFFF", letter: "I" },
  green: { hex: "#007F3E", light: "#BBF7D0", text: "#FFFFFF", letter: "M" },
};

const TURRIM_LETTERS = ["T", "U", "R", "R", "I", "M"] as const;
type TurrimLetter = (typeof TURRIM_LETTERS)[number];

export default function Page404() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // HUD and Game State
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [jumpsRemaining, setJumpsRemaining] = useState(2);
  const [collectedLetters, setCollectedLetters] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [towersBuilt, setTowersBuilt] = useState(0);

  // Audio Context ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound Synthesizer via Web Audio API (tactile Montessori acoustic feel)
  const playSound = useCallback(
    (type: "jump" | "letter" | "wordComplete" | "gameover" | "start") => {
      if (isMuted || typeof window === "undefined") return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const now = ctx.currentTime;

        if (type === "jump") {
          // Tactile wooden pop
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.exponentialRampToValueAtTime(480, now + 0.1);
          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
        } else if (type === "letter") {
          // Melodic xylophone bell
          const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0];
          const randomNote = notes[Math.floor(Math.random() * notes.length)];
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(randomNote, now);
          gain.gain.setValueAtTime(0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.start(now);
          osc.stop(now + 0.28);
        } else if (type === "wordComplete") {
          // Celebratory arpeggio
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.25, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.28);
          });
        } else if (type === "gameover") {
          // Soft wooden tumble
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.32);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
          osc.start(now);
          osc.stop(now + 0.32);
        } else if (type === "start") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(640, now + 0.16);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
          osc.start(now);
          osc.stop(now + 0.16);
        }
      } catch {
        // AudioContext restricted prior to user gesture
      }
    },
    [isMuted]
  );

  // Mutable Game Loop State
  const gameRef = useRef({
    width: 1200,
    height: 600,
    groundY: 480,
    score: 0,
    speed: 5.2,
    baseSpeed: 5.2,
    frames: 0,
    isMobile: false,
    towersBuilt: 0,
    collectedLetters: [false, false, false, false, false, false],
    player: {
      x: 100,
      y: 430,
      width: 44,
      height: 44,
      vy: 0,
      gravity: 0.68,
      jumpStrength: -12.8,
      isGrounded: true,
      jumpsLeft: 2,
      rotation: 0,
      squash: 1,
    },
    obstacles: [] as {
      x: number;
      y: number;
      width: number;
      height: number;
      type: "triangle" | "arch" | "cylinder" | "block";
      color: string;
    }[],
    collectibles: [] as {
      x: number;
      y: number;
      size: number;
      letter: TurrimLetter;
      letterIndex: number;
      color: string;
      textColor: string;
      angle: number;
      collected: boolean;
    }[],
    particles: [] as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      life: number;
      maxLife: number;
      size: number;
      shape?: "circle" | "square" | "confetti";
    }[],
    bgShapes: [] as {
      x: number;
      y: number;
      size: number;
      type: "circle" | "ring" | "square";
      color: string;
      speed: number;
    }[],
  });

  // Load High Score
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("turrim_404_high_score");
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    }
  }, []);

  // Jump Trigger (Enhanced with multi-touch & double jump)
  const jump = useCallback(() => {
    const game = gameRef.current;
    const { player, groundY } = game;

    if (gameState === "idle") {
      setGameState("playing");
      playSound("start");
      return;
    }
    if (gameState === "gameover") return;

    if (player.jumpsLeft > 0) {
      player.vy = player.jumpStrength;
      player.jumpsLeft -= 1;
      player.isGrounded = false;
      player.squash = 1.35;
      setJumpsRemaining(player.jumpsLeft);
      playSound("jump");

      // Spawn tactile dust particles
      for (let i = 0; i < 7; i++) {
        game.particles.push({
          x: player.x + player.width / 2 + (Math.random() * 20 - 10),
          y: groundY,
          vx: (Math.random() - 0.7) * 3,
          vy: -Math.random() * 2.2,
          color: "#E2D7C3",
          life: 1,
          maxLife: 16,
          size: 3 + Math.random() * 3,
          shape: "square",
        });
      }
    }
  }, [gameState, playSound]);

  // Restart Game
  const restartGame = useCallback(() => {
    const game = gameRef.current;
    game.score = 0;
    game.speed = game.baseSpeed;
    game.frames = 0;
    game.towersBuilt = 0;
    game.collectedLetters = [false, false, false, false, false, false];
    game.player.y = game.groundY - game.player.height;
    game.player.vy = 0;
    game.player.isGrounded = true;
    game.player.jumpsLeft = 2;
    game.player.rotation = 0;
    game.player.squash = 1;
    game.obstacles = [];
    game.collectibles = [];
    game.particles = [];

    setScore(0);
    setTowersBuilt(0);
    setJumpsRemaining(2);
    setCollectedLetters([false, false, false, false, false, false]);
    setGameState("playing");
    playSound("start");
  }, [playSound]);

  // Global Keyboard Controls (Space, Up Arrow, W key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        if (gameState === "gameover") {
          restartGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump, restartGame, gameState]);

  // Screen Adaptations (Device width, Mobile / Tablet / Desktop responsive tuning)
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;
      gameRef.current.isMobile = isMobile;

      gameRef.current.width = w;
      gameRef.current.height = h;

      // On mobile/tablet, provide more runway & fair reaction time
      const groundHeight = isMobile ? Math.max(220, h - 130) : isTablet ? Math.max(240, h - 135) : Math.max(260, h - 140);
      gameRef.current.groundY = groundHeight;

      // Player size & responsive speed
      const playerSize = isMobile ? 38 : isTablet ? 42 : 46;
      gameRef.current.player.width = playerSize;
      gameRef.current.player.height = playerSize;

      // Player X placement (closer to left on phones so obstacles are visible longer)
      gameRef.current.player.x = isMobile ? Math.max(45, w * 0.1) : isTablet ? Math.max(70, w * 0.12) : Math.max(100, w * 0.12);

      // Adaptive speed: slower on phones so it's not frustratingly hard
      const baseSpd = isMobile ? 4.3 : isTablet ? 4.8 : 5.4;
      gameRef.current.baseSpeed = baseSpd;
      if (gameRef.current.score === 0) {
        gameRef.current.speed = baseSpd;
      }

      // Jump strength tuned for player size
      gameRef.current.player.jumpStrength = isMobile ? -11.8 : isTablet ? -12.4 : -13.0;

      if (gameRef.current.player.isGrounded) {
        gameRef.current.player.y = gameRef.current.groundY - playerSize;
      }

      if (canvasRef.current) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvasRef.current.width = w * dpr;
        canvasRef.current.height = h * dpr;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("orientationchange", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("orientationchange", updateDimensions);
    };
  }, []);

  // Initialize Parallax Background Shapes
  useEffect(() => {
    const bgShapes = [];
    const colors = ["#DC9F1218", "#FF7E4D15", "#0066CC15", "#7C3AED15", "#007F3E15"];
    for (let i = 0; i < 9; i++) {
      bgShapes.push({
        x: Math.random() * 1600,
        y: 50 + Math.random() * 240,
        size: 26 + Math.random() * 38,
        type: (["circle", "ring", "square"] as const)[Math.floor(Math.random() * 3)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.3 + Math.random() * 0.4,
      });
    }
    gameRef.current.bgShapes = bgShapes;
  }, []);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const loop = () => {
      const game = gameRef.current;
      const { player, groundY, isMobile } = game;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear full canvas
      ctx.clearRect(0, 0, game.width, game.height);

      // --- Background: Warm Scandinavian Paper Surface (#FBF9F7) ---
      ctx.fillStyle = "#FBF9F7";
      ctx.fillRect(0, 0, game.width, game.height);

      // Subtle architectural grid
      ctx.strokeStyle = "rgba(0,0,0,0.025)";
      ctx.lineWidth = 1;
      const gridSpacing = isMobile ? 38 : 52;
      for (let x = 0; x < game.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, groundY);
        ctx.stroke();
      }

      // --- Giant 404 Architectural Watermark in Background ---
      ctx.save();
      const text404Size = Math.max(110, Math.min(game.width * 0.22, 250));
      const textCenterY = Math.max(100, groundY * 0.44);

      ctx.font = `900 ${text404Size}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Soft Turrim brand translucent fill
      ctx.fillStyle = "rgba(6, 66, 40, 0.045)";
      ctx.fillText("404", game.width / 2, textCenterY);

      // Delicate Bauhaus Gold architectural outline
      ctx.strokeStyle = "rgba(220, 159, 18, 0.09)";
      ctx.lineWidth = 2.5;
      ctx.strokeText("404", game.width / 2, textCenterY);

      // Sub-watermark: "Cure Through wonder • Page Not Found"
      ctx.font = isMobile ? "italic 700 14px serif" : "italic 700 18px serif";
      ctx.fillStyle = "rgba(26, 26, 46, 0.065)";
      ctx.fillText(
        "Cure Through wonder • Page Not Found",
        game.width / 2,
        textCenterY + text404Size * 0.42
      );
      ctx.restore();

      // --- Draw Floating Geometric Shapes ---
      game.bgShapes.forEach((s) => {
        if (gameState === "playing") {
          s.x -= s.speed;
          if (s.x < -80) s.x = game.width + 60;
        }

        ctx.fillStyle = s.color;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 3;

        if (s.type === "circle") {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.type === "ring") {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.roundRect(s.x, s.y, s.size, s.size, 8);
          ctx.fill();
        }
      });

      // --- Draw Fullscreen Wooden Floor Track ---
      ctx.strokeStyle = "#1A1A2E";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(game.width, groundY);
      ctx.stroke();

      // Wooden base
      ctx.fillStyle = "#F3EDE2";
      ctx.fillRect(0, groundY + 3.5, game.width, game.height - groundY);

      // Wood grain lines
      const groundOffset = (game.frames * game.speed) % 36;
      ctx.strokeStyle = "#E2D7C3";
      ctx.lineWidth = 2.2;
      for (let x = -groundOffset; x < game.width; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, groundY + 4);
        ctx.lineTo(x + 12, groundY + 30);
        ctx.stroke();
      }

      // --- Dynamic Shadow under Player ---
      const distanceFromGround = groundY - (player.y + player.height);
      const shadowScale = Math.max(0.3, 1 - distanceFromGround / 150);
      const shadowAlpha = Math.max(0.08, 0.26 - distanceFromGround / 220);
      ctx.fillStyle = `rgba(26, 26, 46, ${shadowAlpha})`;
      ctx.beginPath();
      ctx.ellipse(
        player.x + player.width / 2,
        groundY + 3,
        (player.width / 2.2) * shadowScale,
        4.5 * shadowScale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // --- Gameplay Mechanics Update ---
      if (gameState === "playing") {
        game.frames++;

        // Increase score
        if (game.frames % 5 === 0) {
          game.score += 1;
          setScore(game.score);
        }

        // Increase speed gradually (mild progression so it's not frustrating)
        if (game.frames % 340 === 0 && game.speed < (isMobile ? 8.2 : 9.8)) {
          game.speed += 0.28;
        }

        // Gravity & Player Physics
        player.vy += player.gravity;
        player.y += player.vy;

        // Ground Collision
        if (player.y >= groundY - player.height) {
          player.y = groundY - player.height;
          player.vy = 0;
          player.isGrounded = true;
          player.jumpsLeft = 2;
          player.rotation = 0;
          player.squash = 1;
          setJumpsRemaining(2);
        } else {
          // Playful mid-air tumble rotation
          player.rotation += 0.07;
        }

        if (player.squash > 1) {
          player.squash -= 0.05;
        }

        // --- Spawn Bauhaus Obstacles with Mobile-Aware Spacing ---
        // Minimum spawn interval scaled with device width so mobile is generous
        const minSpawnInterval = isMobile
          ? Math.max(75, Math.floor(145 - game.speed * 6))
          : Math.max(65, Math.floor(130 - game.speed * 5.5));

        if (game.frames % minSpawnInterval === 0 && Math.random() > 0.25) {
          const types: ("triangle" | "arch" | "cylinder" | "block")[] = [
            "triangle",
            "arch",
            "cylinder",
            "block",
          ];
          const selectedType = types[Math.floor(Math.random() * types.length)];

          // Obstacle sizes adjusted for mobile vs desktop
          let w = isMobile ? 30 : 36;
          let h = isMobile ? 36 : 42;
          let color = "#DC143C";

          if (selectedType === "triangle") {
            w = isMobile ? 32 : 38;
            h = isMobile ? 34 : 40;
            color = "#DC143C"; // Rouge / Red
          } else if (selectedType === "arch") {
            w = isMobile ? 26 : 30;
            h = isMobile ? 40 : 46;
            color = "#0066CC"; // Ocean Blue
          } else if (selectedType === "cylinder") {
            w = isMobile ? 28 : 34;
            h = isMobile ? 32 : 38;
            color = "#FF7E4D"; // Coral / Orange
          } else {
            w = isMobile ? 28 : 34;
            h = isMobile ? 36 : 42;
            color = "#7C3AED"; // Purple Violet
          }

          game.obstacles.push({
            x: game.width + 30,
            y: groundY - h,
            width: w,
            height: h,
            type: selectedType,
            color,
          });
        }

        // --- Spawn Montessori Letter Tokens ---
        if (game.frames % 170 === 0 && Math.random() > 0.15) {
          const uncollectedIdx = game.collectedLetters.findIndex((c) => !c);
          const targetIndex =
            uncollectedIdx !== -1
              ? uncollectedIdx
              : Math.floor(Math.random() * TURRIM_LETTERS.length);

          const targetLetter = TURRIM_LETTERS[targetIndex];
          const colorKeys: (keyof typeof MONTESSORI_COLORS)[] = [
            "yellow",
            "coral",
            "red",
            "purple",
            "blue",
            "green",
          ];
          const colorObj = MONTESSORI_COLORS[colorKeys[targetIndex]];

          game.collectibles.push({
            x: game.width + 30,
            y: groundY - (isMobile ? 65 : 75) - Math.random() * 45,
            size: isMobile ? 15 : 17,
            letter: targetLetter,
            letterIndex: targetIndex,
            color: colorObj.hex,
            textColor: colorObj.text,
            angle: 0,
            collected: false,
          });
        }

        // --- Update Obstacles & Check Collisions with Forgiving Hitbox ---
        for (let i = game.obstacles.length - 1; i >= 0; i--) {
          const obs = game.obstacles[i];
          obs.x -= game.speed;

          // Forgiving hit box (generous on mobile so it feels rewarding to jump)
          const pad = isMobile ? 10 : 8;
          if (
            player.x + pad < obs.x + obs.width &&
            player.x + player.width - pad > obs.x &&
            player.y + pad < obs.y + obs.height &&
            player.y + player.height - pad > obs.y
          ) {
            setGameState("gameover");
            playSound("gameover");

            // Tumble particles in brand colors
            for (let p = 0; p < 25; p++) {
              game.particles.push({
                x: player.x + player.width / 2,
                y: player.y + player.height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                color: ["#064228", "#DC9F12", "#DC143C", "#0066CC"][
                  Math.floor(Math.random() * 4)
                ],
                life: 1,
                maxLife: 32,
                size: 3.5 + Math.random() * 4,
                shape: "square",
              });
            }

            if (game.score > highScore) {
              setHighScore(game.score);
              if (typeof window !== "undefined") {
                localStorage.setItem("turrim_404_high_score", game.score.toString());
              }
            }
            break;
          }

          if (obs.x < -70) {
            game.obstacles.splice(i, 1);
          }
        }

        // --- Update Collectibles ---
        for (let i = game.collectibles.length - 1; i >= 0; i--) {
          const col = game.collectibles[i];
          col.x -= game.speed;
          col.angle += 0.04;

          // Generous pickup radius
          const pickupTolerance = isMobile ? 8 : 4;
          if (
            !col.collected &&
            player.x - pickupTolerance < col.x + col.size &&
            player.x + player.width + pickupTolerance > col.x - col.size &&
            player.y - pickupTolerance < col.y + col.size &&
            player.y + player.height + pickupTolerance > col.y - col.size
          ) {
            col.collected = true;

            const updated = [...game.collectedLetters];
            updated[col.letterIndex] = true;
            game.collectedLetters = updated;
            setCollectedLetters(updated);

            game.score += 50;
            setScore(game.score);

            const isFullWord = updated.every(Boolean);
            if (isFullWord) {
              game.score += 300;
              game.towersBuilt += 1;
              setTowersBuilt(game.towersBuilt);
              setScore(game.score);
              playSound("wordComplete");

              // Grand confetti celebration!
              for (let c = 0; c < 50; c++) {
                game.particles.push({
                  x: player.x + player.width / 2,
                  y: player.y,
                  vx: (Math.random() - 0.5) * 12,
                  vy: -Math.random() * 10 - 2,
                  color: [
                    "#DC9F12",
                    "#FF7E4D",
                    "#DC143C",
                    "#7C3AED",
                    "#0066CC",
                    "#007F3E",
                  ][Math.floor(Math.random() * 6)],
                  life: 1,
                  maxLife: 45,
                  size: 4 + Math.random() * 5,
                  shape: "confetti",
                });
              }

              setTimeout(() => {
                game.collectedLetters = [false, false, false, false, false, false];
                setCollectedLetters([false, false, false, false, false, false]);
              }, 1200);
            } else {
              playSound("letter");
            }

            for (let s = 0; s < 14; s++) {
              game.particles.push({
                x: col.x,
                y: col.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: col.color,
                life: 1,
                maxLife: 22,
                size: 3 + Math.random() * 3,
                shape: "circle",
              });
            }
          }

          if (col.x < -50 || col.collected) {
            game.collectibles.splice(i, 1);
          }
        }
      }

      // --- Draw Obstacles ---
      game.obstacles.forEach((obs) => {
        ctx.fillStyle = obs.color;
        ctx.strokeStyle = "#1A1A2E";
        ctx.lineWidth = 2.5;

        if (obs.type === "triangle") {
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.height);
          ctx.lineTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.strokeStyle = "rgba(255,255,255,0.45)";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(obs.x + 3, obs.y + obs.height - 3);
          ctx.lineTo(obs.x + obs.width / 2, obs.y + 5);
          ctx.stroke();
        } else if (obs.type === "arch") {
          ctx.beginPath();
          ctx.roundRect(obs.x, obs.y, obs.width, obs.height, [14, 14, 4, 4]);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#FBF9F7";
          ctx.beginPath();
          ctx.roundRect(obs.x + 5, obs.y + obs.height - 16, obs.width - 10, 16, [7, 7, 0, 0]);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.fillRect(obs.x + 4, obs.y + 5, obs.width - 8, 3.5);
        }
      });

      // --- Draw Montessori Letter Tokens ---
      game.collectibles.forEach((col) => {
        ctx.save();
        ctx.translate(col.x, col.y);
        ctx.rotate(col.angle);

        ctx.fillStyle = col.color;
        ctx.strokeStyle = "#1A1A2E";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, col.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, col.size - 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = isMobile ? "bold 13px sans-serif" : "bold 15px sans-serif";
        ctx.fillStyle = col.textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(col.letter, 0, 1);

        ctx.restore();
      });

      // --- Draw Particles ---
      for (let i = game.particles.length - 1; i >= 0; i--) {
        const p = game.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);

        if (p.shape === "confetti") {
          ctx.fillRect(p.x, p.y, p.size, p.size * 1.5);
        } else if (p.shape === "square") {
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        if (p.life >= p.maxLife) {
          game.particles.splice(i, 1);
        }
      }

      // --- Draw Player: Charming Animated Runner Character ---
      if (gameState !== "gameover" || game.particles.length > 0) {
        ctx.save();
        const px = player.x + player.width / 2;
        const py = player.y + player.height / 2;
        ctx.translate(px, py);

        ctx.rotate(player.rotation);
        ctx.scale(1 / player.squash, player.squash);

        // Body: Rounded Wooden Cube in Brand Deep Forest Green (#064228)
        ctx.fillStyle = "#064228";
        ctx.strokeStyle = "#1A1A2E";
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.roundRect(-player.width / 2, -player.height / 2, player.width, player.height, 10);
        ctx.fill();
        ctx.stroke();

        // Bauhaus Crown / Headband in Brand Gold (#DC9F12)
        ctx.fillStyle = "#DC9F12";
        ctx.beginPath();
        ctx.roundRect(-player.width / 2 + 2.5, -player.height / 2 + 2.5, player.width - 5, 8, [
          6, 6, 0, 0,
        ]);
        ctx.fill();

        // Montessori "T" initial
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.font = isMobile ? "900 11px sans-serif" : "900 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("T", 0, player.height * 0.32);

        // Cute Big Eyes
        const eyeOffset = player.width * 0.12;
        const eyeSize = isMobile ? 5 : 6;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(eyeOffset, -2, eyeSize, 0, Math.PI * 2);
        ctx.arc(eyeOffset + eyeSize * 1.8, -2, eyeSize, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        const pupilSize = isMobile ? 2.4 : 2.8;
        ctx.fillStyle = "#1A1A2E";
        ctx.beginPath();
        ctx.arc(eyeOffset + 1.2, -2, pupilSize, 0, Math.PI * 2);
        ctx.arc(eyeOffset + eyeSize * 1.8 + 1.2, -2, pupilSize, 0, Math.PI * 2);
        ctx.fill();

        // Specular reflections
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(eyeOffset + 0.6, -3.5, 1, 0, Math.PI * 2);
        ctx.arc(eyeOffset + eyeSize * 1.8 + 0.6, -3.5, 1, 0, Math.PI * 2);
        ctx.fill();

        // --- Natural, Smooth Animated Little Wooden Shoes / Feet ---
        ctx.fillStyle = "#1A1A2E";
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;

        const shoeW = isMobile ? 11 : 13;
        const shoeH = isMobile ? 6.5 : 7.5;

        if (player.isGrounded && gameState === "playing") {
          const strideSpeed = game.frames * 0.28;
          const strideRadius = isMobile ? 8 : 10;
          const liftRadius = isMobile ? 6 : 7.5;

          const bFootX = -player.width * 0.22 + Math.cos(strideSpeed) * strideRadius;
          const bFootY = player.height / 2 + 2 - Math.max(0, Math.sin(strideSpeed) * liftRadius);

          const fFootX = player.width * 0.14 + Math.cos(strideSpeed + Math.PI) * strideRadius;
          const fFootY =
            player.height / 2 + 2 - Math.max(0, Math.sin(strideSpeed + Math.PI) * liftRadius);

          ctx.beginPath();
          ctx.roundRect(bFootX - shoeW / 2, bFootY - shoeH / 2, shoeW, shoeH, [4, 4, 3, 3]);
          ctx.fill();

          ctx.beginPath();
          ctx.roundRect(fFootX - shoeW / 2, fFootY - shoeH / 2, shoeW, shoeH, [4, 4, 3, 3]);
          ctx.fill();
        } else {
          // In the air (Jumping)
          const airFootY = player.height / 2 - 2.5;
          ctx.beginPath();
          ctx.roundRect(-player.width * 0.32, airFootY, shoeW, shoeH, [4, 4, 3, 3]);
          ctx.fill();
          ctx.beginPath();
          ctx.roundRect(-2, airFootY + 2, shoeW, shoeH, [4, 4, 3, 3]);
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, playSound, highScore]);

  // Touch handlers to prevent screen drag/zoom on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only handle if not tapping on an interactive button/link
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;
    e.preventDefault();
    jump();
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      className="relative w-screen h-screen overflow-hidden bg-[#FBF9F7] text-[#1e293b] select-none font-sans touch-none"
    >
      {/* Fullscreen Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onClick={jump}
        className="absolute inset-0 w-full h-full cursor-pointer block touch-none z-0"
      />

      {/* Floating Top Header Bar (Responsive for Mobile, Tablet & Desktop) */}
      <header className="absolute top-0 left-0 right-0 z-20 px-3 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col gap-2 pointer-events-none">
        <div className="w-full flex items-center justify-between">
          {/* Left: Back Link & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/80 text-xs sm:text-sm font-semibold text-[#1A1A2E] hover:bg-white hover:text-[#064228] transition-all shadow-xs active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Back</span>
            </Link>

            <Link href="/" className="flex items-center gap-1.5 cursor-pointer">
              <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#1A1A2E]">
                turrim
              </span>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-[#dffada] text-[#064228] font-bold">
                Pedagogy
              </span>
            </Link>
          </div>

          {/* Center (Desktop/Tablet): Montessori Spell Turrim Progress Tray */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-xs pointer-events-auto">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase mr-1">
              <Blocks className="w-4 h-4 text-[#064228]" />
              <span>Spell Turrim:</span>
            </div>

            <div className="flex items-center gap-1.5">
              {TURRIM_LETTERS.map((letter, idx) => {
                const colorKeys: (keyof typeof MONTESSORI_COLORS)[] = [
                  "yellow",
                  "coral",
                  "red",
                  "purple",
                  "blue",
                  "green",
                ];
                const colorObj = MONTESSORI_COLORS[colorKeys[idx]];
                const isCollected = collectedLetters[idx];

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: isCollected ? colorObj.hex : "#F3F4F6",
                      color: isCollected ? colorObj.text : "#9CA3AF",
                      borderColor: isCollected ? colorObj.hex : "#E5E7EB",
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-black text-xs sm:text-sm border transition-all duration-300 shadow-2xs ${
                      isCollected ? "scale-105 shadow-sm" : "opacity-60"
                    }`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] font-bold text-[#064228] px-2 py-0.5 rounded-md bg-[#dffada] ml-1">
              Towers: {towersBuilt}
            </div>
          </div>

          {/* Right: Score, Best Score & Audio Mute */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 pointer-events-auto">
            {/* Score Pill */}
            <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/80 text-[11px] sm:text-xs font-bold text-gray-800 shadow-xs">
              <span className="text-gray-400">SCORE:</span>
              <span className="text-[#064228] font-black text-xs sm:text-sm">{score}</span>
            </div>

            {/* High Score Trophy */}
            <div className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#FEF08A] border border-[#DC9F12]/40 text-[#1A1A2E] text-[11px] sm:text-xs font-bold shadow-xs">
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#DC9F12]" />
              <span>BEST: {highScore}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              className="p-1.5 sm:p-2 rounded-full border border-gray-200/80 bg-white/95 backdrop-blur-md hover:bg-white text-gray-700 transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Compact Spell Tray (centered beneath header) */}
        <div className="flex lg:hidden items-center justify-between gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-xs mx-auto pointer-events-auto max-w-sm w-full">
          <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase">
            <Blocks className="w-3.5 h-3.5 text-[#064228]" />
            <span>TURRIM:</span>
          </div>

          <div className="flex items-center gap-1">
            {TURRIM_LETTERS.map((letter, idx) => {
              const colorKeys: (keyof typeof MONTESSORI_COLORS)[] = [
                "yellow",
                "coral",
                "red",
                "purple",
                "blue",
                "green",
              ];
              const colorObj = MONTESSORI_COLORS[colorKeys[idx]];
              const isCollected = collectedLetters[idx];

              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: isCollected ? colorObj.hex : "#F3F4F6",
                    color: isCollected ? colorObj.text : "#9CA3AF",
                    borderColor: isCollected ? colorObj.hex : "#E5E7EB",
                  }}
                  className={`w-6 h-6 rounded flex items-center justify-center font-black text-[10px] border transition-all duration-300 ${
                    isCollected ? "scale-105 shadow-xs" : "opacity-60"
                  }`}
                >
                  {letter}
                </div>
              );
            })}
          </div>

          <div className="text-[10px] font-bold text-[#064228] px-1.5 py-0.5 rounded bg-[#dffada]">
            Towers: {towersBuilt}
          </div>
        </div>
      </header>

      {/* Floating Bottom Quick Bar */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 px-3 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Device control hints & Jump counter */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#555555] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200/70 shadow-xs pointer-events-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-[#1da824] animate-pulse" />
          <span className="hidden sm:inline">[SPACE], Click or Tap anywhere to Jump</span>
          <span className="sm:hidden">Tap anywhere to Jump!</span>
          <span className="font-bold text-[#064228] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Jumps: {jumpsRemaining}x
          </span>
        </div>

        {/* Right: Quick Business Links */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          <Link
            href="/playroom"
            className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#1A1A2E] text-[11px] sm:text-xs font-bold border border-gray-200/80 transition-colors shadow-xs cursor-pointer active:scale-95"
          >
            Playroom
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#0a0a0a] hover:bg-black text-white text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </footer>

      {/* Dedicated Floating Thumb Jump Button for Mobile & Tablet */}
      {gameState === "playing" && (
        <button
          type="button"
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            jump();
          }}
          onClick={(e) => {
            e.stopPropagation();
            jump();
          }}
          className="md:hidden fixed bottom-14 right-4 z-30 w-16 h-16 rounded-full bg-[#064228] text-white font-black text-xs flex flex-col items-center justify-center shadow-xl border-3 border-white active:scale-90 transition-transform cursor-pointer select-none"
          aria-label="Tap to Jump"
        >
          <ArrowUp className="w-5 h-5 stroke-3" />
          <span className="text-[9px] tracking-wider uppercase font-bold">JUMP</span>
        </button>
      )}

      {/* Start / Idle Overlay */}
      {gameState === "idle" && (
        <div
          onClick={jump}
          className="absolute inset-0 z-30 bg-black/20 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 cursor-pointer transition-all hover:bg-black/25"
        >
          <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-3xl p-5 sm:p-7 text-center shadow-2xl border border-white/80 transform animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#064228] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 border border-emerald-200/60 shadow-2xs">
              <Shapes className="w-3.5 h-3.5 text-[#007F3E]" />
              <span>404 • Lost in the Playroom</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#1A1A2E] tracking-tight mb-2">
              Build the <span className="text-[#064228]">Turrim</span>{" "}
              <span className="text-[#DC9F12]">Tower</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#555555] mb-5 leading-relaxed">
              Jump over mismatched geometry and collect the Montessori alphabet blocks to spell{" "}
              <strong className="text-[#064228]">TURRIM</strong>!
            </p>

            <button
              onClick={jump}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#064228] hover:bg-[#085a37] text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              Tap or Press [Space] to Play!
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal Overlay */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 z-30 bg-black/35 backdrop-blur-xs flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-sm w-full text-center shadow-2xl border border-gray-100 transform animate-in fade-in zoom-in-95 duration-200">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#dffada] text-[#064228] flex items-center justify-center mx-auto mb-2.5 shadow-xs">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#1A1A2E] mb-1">
              Playroom Rest Time!
            </h2>
            <p className="text-xs text-[#64748b] mb-3.5">
              Every tumble is an opportunity to learn and rebuild!
            </p>

            <div className="grid grid-cols-2 gap-2.5 py-2.5 px-3.5 bg-[#FBF9F7] rounded-2xl mb-4 border border-gray-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Score</span>
                <span className="text-lg sm:text-xl font-black text-[#1A1A2E]">{score}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Best Score
                </span>
                <span className="text-lg sm:text-xl font-black text-[#DC9F12]">{highScore}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={restartGame}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#064228] hover:bg-[#085a37] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again (Tap or Space)
              </button>

              <Link
                href="/playroom"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#E8E8E8] hover:bg-zinc-200 text-[#1A1A2E] font-semibold text-xs transition-colors active:scale-95"
              >
                Enter 3D Playroom
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
