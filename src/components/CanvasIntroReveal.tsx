import { useEffect, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

export default function CanvasIntroReveal({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Full viewport dimensions
    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;
    
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = `${logicalWidth}px`;
    canvas.style.height = `${logicalHeight}px`;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.src = '/kindev-logo.png';

    // Responsive sizing
    const isMobile = logicalWidth < 768;
    const logoSize = isMobile ? 120 : 220; // Big logo matching video presence
    const fontSize = isMobile ? 48 : 100; // Giant text
    const textOffsetX = logoSize + (isMobile ? 10 : 20); // Text starts right after logo
    const centerX = logicalWidth / 2;
    const centerY = logicalHeight / 2;
    // The logo starts centered, then slides left to make room for text
    const totalContentWidth = textOffsetX + (isMobile ? 200 : 450); // approx text width
    const finalLogoX = centerX - totalContentWidth / 2;
    const startLogoX = centerX - logoSize / 2; // Start centered

    // Interactivity state
    let mouseX = -100;
    let mouseY = -100;
    let waves: { x: number, y: number, radius: number }[] = [];

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouseX = -100;
      mouseY = -100;
    };

    const handleInteraction = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      waves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0
      });
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerdown', handleInteraction);
    canvas.addEventListener('pointerup', handlePointerLeave);
    canvas.addEventListener('pointercancel', handlePointerLeave);
    
    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      color: string;
      delay: number;
      active: boolean;

      constructor(x: number, y: number, color: string, delay: number) {
        this.originX = x;
        this.originY = y;
        // Start from behind the logo center
        this.x = startLogoX + logoSize / 2 + (Math.random() - 0.5) * 40;
        this.y = centerY + (Math.random() - 0.5) * 40;
        
        this.vx = (Math.random() - 0.5) * 25;
        this.vy = (Math.random() - 0.5) * 25;
        this.color = color;
        this.delay = delay;
        this.active = false;
      }

      update(time: number, currentLogoRight: number) {
        if (time < this.delay) return;
        this.active = true;

        const dx = this.originX - this.x;
        const dy = this.originY - this.y;
        
        let forceX = 0;
        let forceY = 0;

        // 1. Push particles away from the moving logo edge
        const distToLogoEdge = Math.sqrt(
          (this.x - currentLogoRight) ** 2 + (this.y - centerY) ** 2
        );
        const repelRadius = isMobile ? 40 : 60;
        if (distToLogoEdge < repelRadius) {
          const angle = Math.atan2(this.y - centerY, this.x - currentLogoRight);
          const force = (repelRadius - distToLogoEdge) * 0.5;
          forceX += Math.cos(angle) * force;
          forceY += Math.sin(angle) * force;
        }

        // 2. Mouse Repulsion
        if (mouseX !== -100) {
          const distToMouse = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
          const mouseRadius = isMobile ? 20 : 30;
          if (distToMouse < mouseRadius) {
            const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
            const force = (mouseRadius - distToMouse) * 1.5;
            forceX += Math.cos(angle) * force;
            forceY += Math.sin(angle) * force;
          }
        }

        // 3. Wave effect on tap
        waves.forEach(wave => {
          const distToWaveCenter = Math.sqrt((this.x - wave.x) ** 2 + (this.y - wave.y) ** 2);
          const distFromWaveFront = Math.abs(distToWaveCenter - wave.radius);
          const waveWidth = isMobile ? 30 : 50;
          if (distFromWaveFront < waveWidth) { 
            const angle = Math.atan2(this.y - wave.y, this.x - wave.x);
            const force = (waveWidth - distFromWaveFront) * 2.0; 
            forceX += Math.cos(angle) * force;
            forceY += Math.sin(angle) * force - force * 0.5;
          }
        });

        this.vx += dx * 0.05 + forceX;
        this.vy += dy * 0.05 + forceY;
        this.vx *= 0.80;
        this.vy *= 0.80;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        ctx.fillStyle = this.color;
        const size = isMobile ? 1.5 : 2.0;
        ctx.fillRect(this.x, this.y, size, size);
      }
    }

    let particles: Particle[] = [];
    
    const initParticles = () => {
      const offCanvas = document.createElement('canvas');
      const renderWidth = Math.floor(logicalWidth * dpr);
      const renderHeight = Math.floor(logicalHeight * dpr);
      offCanvas.width = renderWidth;
      offCanvas.height = renderHeight;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.scale(dpr, dpr);
      offCtx.clearRect(0, 0, logicalWidth, logicalHeight);
      
      // Draw text at the final position (after logo slides left)
      offCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
      offCtx.textBaseline = 'middle';
      
      const textX = finalLogoX + textOffsetX;
      const gradient = offCtx.createLinearGradient(textX, 0, textX + (isMobile ? 200 : 450), 0);
      gradient.addColorStop(0, '#06b6d4');
      gradient.addColorStop(0.5, '#10b981');
      gradient.addColorStop(1, '#8b5cf6');
      offCtx.fillStyle = gradient;
      
      offCtx.fillText('Kindev', textX, centerY + 4);

      const imageData = offCtx.getImageData(0, 0, renderWidth, renderHeight);
      const data = imageData.data;

      particles = [];
      // Performance-aware step: less dense on mobile for performance
      const step = isMobile ? (dpr > 1 ? 3 : 2) : (dpr > 1 ? 2 : 1);

      for (let y = 0; y < renderHeight; y += step) {
        for (let x = 0; x < renderWidth; x += step) {
          const index = (y * renderWidth + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 30) {
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const color = `rgba(${r}, ${g}, ${b}, ${alpha/255})`;
            
            const logicalX = x / dpr;
            const logicalY = y / dpr;
            
            // Delay based on distance from text start
            const delay = (logicalX - textX) * 6 + Math.random() * 150;
            particles.push(new Particle(logicalX, logicalY, color, delay));
          }
        }
      }
    };

    let animationFrameId: number;
    let startTime = Date.now();
    let isCompleteTriggered = false;

    const render = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      waves.forEach(w => w.radius += 10);
      waves = waves.filter(w => w.radius < logicalWidth);

      // Logo slides from center to final left position over 1200ms
      let currentLogoX = startLogoX;
      if (elapsed > 0) {
        const progress = Math.min(elapsed / 1200, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        currentLogoX = startLogoX - (startLogoX - finalLogoX) * ease;
      }

      // Update and draw particles
      if (elapsed > 0) {
        const logoRight = currentLogoX + logoSize;
        particles.forEach(p => {
          p.update(elapsed, logoRight);
          p.draw(ctx);
        });
      }

      // Draw Logo (big, centered vertically)
      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, currentLogoX, centerY - logoSize / 2, logoSize, logoSize);
      }

      // Trigger completion after 3000ms (a bit longer for the bigger animation)
      if (elapsed > 3000 && !isCompleteTriggered) {
        isCompleteTriggered = true;
        onComplete();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const start = () => {
      initParticles();
      startTime = Date.now();
      render();
    };

    img.onload = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(start);
      } else {
        setTimeout(start, 500);
      }
    };
    
    // Failsafe
    setTimeout(() => {
      if (particles.length === 0 && img.complete) {
        start();
      }
    }, 1000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerdown', handleInteraction);
      canvas.removeEventListener('pointerup', handlePointerLeave);
      canvas.removeEventListener('pointercancel', handlePointerLeave);
    };
  }, [onComplete]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
    />
  );
}
