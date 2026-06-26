import { useRef, useEffect } from 'react';

export default function JarvisBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Hexagon drawing function
    function drawHexagon(x, y, size, color, alpha = 1, filled = false) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = alpha;
      if (filled) {
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Rotating ring
    function drawRing(x, y, radius, rotation, color, segments = 8, dashed = false) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      if (dashed) {
        ctx.setLineDash([5, 5]);
      }
      
      for (let i = 0; i <= segments; i++) {
        const angle = rotation + (Math.PI * 2 * i) / segments;
        const startX = x + radius * Math.cos(angle);
        const startY = y + radius * Math.sin(angle);
        
        if (i > 0) {
          ctx.lineTo(startX, startY);
        } else {
          ctx.moveTo(startX, startY);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Data stream lines
    function drawDataStream(startX, startY, endX, endY, progress, color) {
      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      ctx.globalAlpha = 1;
      
      // Glow effect at the head
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Animated hexagonal grid
    const hexagons = [];
    const hexSize = 40;
    const hexSpacing = hexSize * 1.8;

    for (let y = 0; y < canvas.height / hexSpacing + 2; y++) {
      for (let x = 0; x < canvas.width / hexSpacing + 2; x++) {
        const offsetX = (y % 2) * (hexSpacing / 2);
        hexagons.push({
          x: x * hexSpacing + offsetX,
          y: y * hexSpacing,
          baseAlpha: Math.random() * 0.3 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          active: Math.random() > 0.7
        });
      }
    }

    // Rotating rings
    const rings = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 80, speed: 0.005, segments: 12, dashed: true },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 60, speed: -0.008, segments: 8, dashed: false },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 150, speed: 0.003, segments: 16, dashed: true },
      { x: canvas.width * 0.3, y: canvas.height * 0.8, radius: 40, speed: 0.01, segments: 6, dashed: false },
      { x: canvas.width * 0.7, y: canvas.height * 0.2, radius: 50, speed: -0.006, segments: 10, dashed: true }
    ];

    // Data streams
    const dataStreams = [];
    for (let i = 0; i < 20; i++) {
      dataStreams.push({
        startX: Math.random() * canvas.width,
        startY: Math.random() * canvas.height,
        endX: Math.random() * canvas.width,
        endY: Math.random() * canvas.height,
        progress: Math.random(),
        speed: Math.random() * 0.005 + 0.002,
        color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7'
      });
    }

    // Network nodes
    const nodes = [];
    for (let i = 0; i < 25; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
        type: Math.random() > 0.5 ? 'node' : 'data'
      });
    }

    // Binary rain effect
    const binaryDrops = [];
    for (let i = 0; i < 15; i++) {
      binaryDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        chars: ['0', '1']
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      // Draw hexagonal grid
      hexagons.forEach(hex => {
        const alpha = hex.baseAlpha + Math.sin(time * hex.pulseSpeed) * 0.1;
        if (hex.active) {
          drawHexagon(hex.x, hex.y, hexSize * 0.8, '#06b6d4', Math.max(0, alpha), true);
        } else {
          drawHexagon(hex.x, hex.y, hexSize * 0.8, '#06b6d4', Math.max(0, alpha * 0.5));
        }
      });

      // Draw rotating rings
      rings.forEach(ring => {
        const rotation = time * ring.speed;
        drawRing(ring.x, ring.y, ring.radius, rotation, '#06b6d4', ring.segments, ring.dashed);
        drawRing(ring.x, ring.y, ring.radius - 10, -rotation * 1.5, '#a855f7', ring.segments / 2, !ring.dashed);
        // Inner ring
        drawRing(ring.x, ring.y, ring.radius - 20, rotation * 0.5, '#ec4899', ring.segments / 4, false);
      });

      // Draw data streams
      dataStreams.forEach(stream => {
        stream.progress += stream.speed;
        if (stream.progress > 1) {
          stream.progress = 0;
          stream.startX = Math.random() * canvas.width;
          stream.startY = Math.random() * canvas.height;
          stream.endX = Math.random() * canvas.width;
          stream.endY = Math.random() * canvas.height;
        }
        drawDataStream(stream.startX, stream.startY, stream.endX, stream.endY, stream.progress, stream.color);
      });

      // Draw network nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 0.02 + node.pulsePhase) * 0.5 + 0.5;
        const alpha = 0.3 + pulse * 0.4;
        
        ctx.beginPath();
        ctx.fillStyle = node.type === 'node' ? '#06b6d4' : '#a855f7';
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.type === 'node' ? '#06b6d4' : '#a855f7';
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Connect nearby nodes
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const lineAlpha = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = node.type === 'node' ? '#06b6d4' : '#a855f7';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      // Binary rain
      ctx.font = '12px monospace';
      binaryDrops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = 0;
          drop.x = Math.random() * canvas.width;
        }
        const char = drop.chars[Math.floor(Math.random() * drop.chars.length)];
        ctx.fillStyle = '#06b6d4';
        ctx.globalAlpha = 0.3;
        ctx.fillText(char, drop.x, drop.y);
        ctx.globalAlpha = 1;
      });

      // Central holographic circle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 1; i <= 4; i++) {
        const radius = 80 + i * 40 + Math.sin(time * 0.01 + i) * 15;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 / i})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 5]);
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Scanning lines
      const scanY = (time * 2) % canvas.height;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 2;
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();

      // Horizontal scan
      const scanX = (time * 3) % canvas.width;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.lineWidth = 1;
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, canvas.height);
      ctx.stroke();

      // Corner brackets
      const cornerSize = 50;
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.3;
      
      // Top-left
      ctx.beginPath();
      ctx.moveTo(cornerSize, 0);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, cornerSize);
      ctx.stroke();
      
      // Top-right
      ctx.beginPath();
      ctx.moveTo(canvas.width - cornerSize, 0);
      ctx.lineTo(canvas.width, 0);
      ctx.lineTo(canvas.width, cornerSize);
      ctx.stroke();
      
      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(cornerSize, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.lineTo(0, canvas.height - cornerSize);
      ctx.stroke();
      
      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(canvas.width - cornerSize, canvas.height);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(canvas.width, canvas.height - cornerSize);
      ctx.stroke();
      
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -3,
        pointerEvents: 'none',
        opacity: 0.5
      }}
    />
  );
}
