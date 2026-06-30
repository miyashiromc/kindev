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

    // Responsive sizing (made significantly larger for desktop)
    const isMobile = logicalWidth < 768;
    const logoSize = isMobile ? 120 : 320; 
    const fontSize = isMobile ? 48 : 150; 
    const textOffsetX = logoSize + (isMobile ? 10 : 30); 
    const centerX = logicalWidth / 2;
    const centerY = logicalHeight / 2;
    // The logo starts centered, then slides left to make room for text
    const totalContentWidth = textOffsetX + (isMobile ? 200 : 650);
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
      randomSeed: number;

      constructor(x: number, y: number, color: string, delay: number) {
        this.originX = x;
        this.originY = y;
        
        // Start exactly from behind the centered logo
        this.x = startLogoX + logoSize / 2;
        this.y = centerY;
        
        // Massive initial explosive velocity in all directions
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 50 + 10;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.color = color;
        this.delay = delay;
        this.active = false;
        this.randomSeed = Math.random() * 100;
      }

      update(time: number, elapsed: number, currentLogoRight: number) {
        // Wait until the logo starts sliding (1000ms) plus individual delay
        if (elapsed < 1000) return;
        const slideTime = elapsed - 1000;
        if (slideTime < this.delay) return;
        
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
          const force = (repelRadius - distToLogoEdge) * 0.6;
          forceX += Math.cos(angle) * force;
          forceY += Math.sin(angle) * force;
        }

        // 2. Mouse Repulsion
        if (mouseX !== -100) {
          const distToMouse = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
          const mouseRadius = isMobile ? 30 : 50;
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

        // Very high spring force combined with high friction ensures a direct snap without bouncing
        this.vx += dx * 0.3 + forceX;
        this.vy += dy * 0.3 + forceY;
        
        // High friction (damping) to kill momentum instantly
        this.vx *= 0.55;
        this.vy *= 0.55;
        
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
      const gradient = offCtx.createLinearGradient(textX, 0, textX + (isMobile ? 200 : 650), 0);
      gradient.addColorStop(0, '#06b6d4');
      gradient.addColorStop(0.5, '#10b981');
      gradient.addColorStop(1, '#8b5cf6');
      offCtx.fillStyle = gradient;
      
      offCtx.fillText('Kindev', textX, centerY + 4);

      const imageData = offCtx.getImageData(0, 0, renderWidth, renderHeight);
      const data = imageData.data;

      particles = [];
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
            
            // Extremely short delay span so the whole word reveals almost instantly
            const delay = (logicalX - textX) * 0.4 + Math.random() * 10;
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

      // Animation Phases
      let logoAlpha = 0;
      let logoScale = 0.5;
      let currentLogoX = startLogoX;
      
      const initialScale = isMobile ? 2.5 : 1.5; // Massive initial size

      // Phase 1: Logo Entrance (0 - 800ms)
      if (elapsed < 800) {
        const p = elapsed / 800;
        // EaseOutBack for a slight overshoot popping effect
        const ease = 1 - Math.pow(1 - p, 3); 
        logoAlpha = ease;
        logoScale = 0.5 + (initialScale - 0.5) * ease;
      } 
      // Phase 2: Pause & Anticipation (800 - 1000ms)
      else if (elapsed >= 800 && elapsed < 1000) {
        logoAlpha = 1;
        logoScale = initialScale;
      }
      // Phase 3: Slide and Explode (1000ms+)
      else if (elapsed >= 1000) {
        logoAlpha = 1;
        const slideElapsed = elapsed - 1000;
        const progress = Math.min(slideElapsed / 800, 1);
        // Exponential ease out for a snappy slide
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        // Shrink down to normal size as it slides
        logoScale = initialScale - (initialScale - 1.0) * ease;
        currentLogoX = startLogoX - (startLogoX - finalLogoX) * ease;
      }

      // Draw Particles
      const logoRight = currentLogoX + (logoSize * logoScale) / 2; // Approximate right edge
      particles.forEach(p => {
        p.update(currentTime, elapsed, logoRight);
        p.draw(ctx);
      });

      // Draw Logo with Alpha and Scale
      if (img.complete && img.naturalWidth !== 0 && logoAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = logoAlpha;
        const currentSize = logoSize * logoScale;
        ctx.drawImage(
          img, 
          currentLogoX - currentSize / 2 + logoSize / 2, // Keep centered on currentLogoX during scale
          centerY - currentSize / 2, 
          currentSize, 
          currentSize
        );
        ctx.restore();
      }

      // Phase 4: Trigger completion after 3200ms
      if (elapsed > 3200 && !isCompleteTriggered) {
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
