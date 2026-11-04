
import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { colors } from "../theme/colors";

const alphaHex = Array.from({ length: 256 }, (_, alpha) => alpha.toString(16).padStart(2, "0"));

const withAlpha = (hexColor, opacity) => {
    const alpha = Math.round(Math.max(0, Math.min(1, opacity)) * 255);

    return `${hexColor.slice(0, 7)}${alphaHex[alpha]}`;
};

const Background = ({ mode = "dark" }) => {
    const canvasRef = useRef(null);
    const backgroundColors = colors.neuralBackground;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width;
        let height;
        let dpr;
        let animationId;

        const mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            targetX: window.innerWidth / 2,
            targetY: window.innerHeight / 2,
        };

        // Configuración original
        const NODE_COUNT = 110;
        const MOUSE_CONNECTION_DISTANCE = 270;
        const MAX_MOUSE_CONNECTIONS = 7;
        const NODE_CONNECTION_DISTANCE = 125;

        const nodes = [];

        // Crear neuronas
        const createNodes = () => {
            nodes.length = 0;

            for (let i = 0; i < NODE_COUNT; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;

                nodes.push({
                    baseX: x,
                    baseY: y,
                    x,
                    y,
                    radius: 1.5 + Math.random() * 2.5,
                    phaseX: Math.random() * Math.PI * 2,
                    phaseY: Math.random() * Math.PI * 2,
                    speedX: 0.00025 + Math.random() * 0.00045,
                    speedY: 0.00025 + Math.random() * 0.00045,
                    amplitudeX: 3 + Math.random() * 12,
                    amplitudeY: 3 + Math.random() * 12,
                    pulse: Math.random() * Math.PI * 2,
                });
            }
        };

        // Ajustar resolución
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (nodes.length === 0) {
                createNodes();
            }
        };

        // Seguir mouse
        const handleMouseMove = (event) => {
            mouse.targetX = event.clientX;
            mouse.targetY = event.clientY;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", handleMouseMove);

        resize();

        // Animación principal
        const animate = (time) => {
            animationId = requestAnimationFrame(animate);

            mouse.x += (mouse.targetX - mouse.x) * 0.12;
            mouse.y += (mouse.targetY - mouse.y) * 0.12;

            ctx.clearRect(0, 0, width, height);

            // Halo del mouse
            const glow = ctx.createRadialGradient(
                mouse.x,
                mouse.y,
                0,
                mouse.x,
                mouse.y,
                240
            );

            glow.addColorStop(0, backgroundColors.mouseGlow[mode]);
            glow.addColorStop(1, backgroundColors.mouseGlowClear[mode]);

            ctx.fillStyle = glow;
            ctx.fillRect(
                mouse.x - 240,
                mouse.y - 240,
                480,
                480
            );

            // Movimiento independiente de neuronas
            for (const node of nodes) {
                const xTime = time * node.speedX + node.phaseX;
                const yTime = time * node.speedY + node.phaseY;

                node.x =
                    node.baseX +
                    Math.sin(xTime) * node.amplitudeX;

                node.y =
                    node.baseY +
                    Math.cos(yTime) * node.amplitudeY;
            }

            // Conexiones entre neuronas
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];

                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];

                    const dx = a.x - b.x;
                    const dy = a.y - b.y;

                    const distance = Math.hypot(dx, dy);

                    if (distance < NODE_CONNECTION_DISTANCE) {
                        const opacity =
                            (1 - distance / NODE_CONNECTION_DISTANCE) * 0.3;

                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);

                        ctx.strokeStyle = withAlpha(backgroundColors.nodeConnection[mode], opacity);
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }

            // Obtener neuronas más cercanas al mouse
            const nearbyNodes = nodes
                .map((node) => ({
                    node,
                    distance: Math.hypot(
                        node.x - mouse.x,
                        node.y - mouse.y
                    ),
                }))
                .filter(
                    (item) => item.distance < MOUSE_CONNECTION_DISTANCE
                )
                .sort((a, b) => a.distance - b.distance)
                .slice(0, MAX_MOUSE_CONNECTIONS);

            // Líneas del mouse
            for (const item of nearbyNodes) {
                const { node, distance } = item;

                const strength = Math.pow(
                    1 - distance / MOUSE_CONNECTION_DISTANCE,
                    1.4
                );

                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(node.x, node.y);

                ctx.strokeStyle = withAlpha(backgroundColors.mouseConnection[mode], strength * 0.85);

                ctx.lineWidth = 1.15;
                ctx.stroke();

                // Partícula viajando por la conexión
                const progress =
                    (time * 0.00035 + node.pulse) % 1;

                const px =
                    mouse.x + (node.x - mouse.x) * progress;

                const py =
                    mouse.y + (node.y - mouse.y) * progress;

                ctx.beginPath();
                ctx.arc(px, py, 1.5, 0, Math.PI * 2);

                ctx.fillStyle = withAlpha(backgroundColors.particle[mode], strength);
                ctx.fill();
            }

            // Dibujar neuronas
            for (const node of nodes) {
                const distance = Math.hypot(
                    node.x - mouse.x,
                    node.y - mouse.y
                );

                const proximity = Math.max(
                    0,
                    1 - distance / MOUSE_CONNECTION_DISTANCE
                );

                const pulse =
                    0.8 +
                    Math.sin(time * 0.002 + node.pulse) * 0.2;

                const radius = node.radius + proximity * 1.7;

                // Aura
                ctx.beginPath();
                ctx.arc(
                    node.x,
                    node.y,
                    radius * 4.5,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = withAlpha(backgroundColors.aura[mode], 0.01 + proximity * 0.04);

                ctx.fill();

                // Núcleo
                ctx.beginPath();
                ctx.arc(
                    node.x,
                    node.y,
                    radius * pulse,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    proximity > 0
                        ? withAlpha(backgroundColors.coreNear[mode], 0.65 + proximity * 0.35)
                        : backgroundColors.coreFar[mode];

                ctx.shadowBlur = proximity > 0 ? 14 : 5;
                ctx.shadowColor = backgroundColors.shadow[mode];

                ctx.fill();

                ctx.shadowBlur = 0;
            }
        };

        animationId = requestAnimationFrame(animate);

        // Limpieza React
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", handleMouseMove);
        };
    }, [mode, backgroundColors]);

    return (
        <Box
            component="canvas"
            ref={canvasRef}
            sx={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                zIndex: 0,
                pointerEvents: "none",
            background: `
          radial-gradient(
            circle at 50% 50%,
            ${backgroundColors.radial[mode]},
            ${backgroundColors.clear[mode]} 50%
          ),
          ${backgroundColors.canvas[mode]}
        `,
            }}
        />
    );
};

export default Background;
