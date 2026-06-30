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
    // Doubled dimensions for giant intro reveal
    const logicalWidth = 480;
    const logicalHeight = 120;
    
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = `${logicalWidth}px`;
    canvas.style.height = `${logicalHeight}px`;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.src = '/kindev-logo.png';

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
      const clientX = e.clientX;
      const clientY = e.clientY;
      
      waves.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
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
        // Start position is behind the logo initially (x around 110)
        this.x = 110 + (Math.random() - 0.5) * 30;
        this.y = logicalHeight / 2 + (Math.random() - 0.5) * 30;
        
        // Initial explosive velocity
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 0.5) * 20;
        this.color = color;
        this.delay = delay;
        this.active = false;
      }

      update(time: number, logoX: number) {
        if (time < this.delay) return;
        this.active = true;

        const dx = this.originX - this.x;
        const dy = this.originY - this.y;
        
        let forceX = 0;
        let forceY = 0;

        // 1. Push particles away from the moving logo (scaled up)
        const distToLogo = Math.sqrt((this.x - logoX) ** 2 + (this.y - logicalHeight/2) ** 2);
        if (distToLogo < 50) {
          const angle = Math.atan2(this.y - logicalHeight/2, this.x - logoX);
          const force = (50 - distToLogo) * 0.4;
          forceX += Math.cos(angle) * force;
          forceY += Math.sin(angle) * force;
        }

        // 2. Mouse Repulsion
        if (mouseX !== -100) {
          const distToMouse = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
          if (distToMouse < 24) {
            const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
            const force = (24 - distToMouse) * 1.5;
            forceX += Math.cos(angle) * force;
            forceY += Math.sin(angle) * force;
          }
        }

        // 3. Wave effect on tap
        waves.forEach(wave => {
          const distToWaveCenter = Math.sqrt((this.x - wave.x) ** 2 + (this.y - wave.y) ** 2);
          const distFromWaveFront = Math.abs(distToWaveCenter - wave.radius);
          if (distFromWaveFront < 40) { 
            const angle = Math.atan2(this.y - wave.y, this.x - wave.x);
            const force = (40 - distFromWaveFront) * 1.5; 
            forceX += Math.cos(angle) * force;
            forceY += Math.sin(angle) * force - force * 0.5;
          }
        });

        // Spring force towards origin
        this.vx += dx * 0.05 + forceX;
        this.vy += dy * 0.05 + forceY;
        
        // Friction
        this.vx *= 0.80;
        this.vy *= 0.80;
        
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        ctx.fillStyle = this.color;
        // Particle size scaled up slightly, but still keeping high density
        ctx.fillRect(this.x, this.y, 1.8, 1.8);
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
      
      // Draw text - Giant size
      offCtx.font = '800 60px "Plus Jakarta Sans", sans-serif';
      offCtx.textBaseline = 'middle';
      
      // Gradient for text to match Kindev style
      const gradient = offCtx.createLinearGradient(110, 0, 360, 0);
      gradient.addColorStop(0, '#06b6d4'); // cyan
      gradient.addColorStop(0.5, '#10b981'); // emerald
      gradient.addColorStop(1, '#8b5cf6'); // purple
      offCtx.fillStyle = gradient;
      
      offCtx.fillText('Kindev', 110, logicalHeight / 2 + 4);

      const imageData = offCtx.getImageData(0, 0, renderWidth, renderHeight);
      const data = imageData.data;

      particles = [];
      const step = dpr > 1 ? 2 : 1;

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
            
            const delay = (logicalX - 110) * 8 + Math.random() * 100;
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
      // NO INITIAL DELAY: Starts immediately
      const elapsed = currentTime - startTime;
      
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      // Update waves (scaled up wave speed)
      waves.forEach(w => w.radius += 8);
      waves = waves.filter(w => w.radius < logicalWidth * 1.5);

      // Logo animation: start at x=110, move to x=0 over 1200ms (slower for big version)
      let logoX = 110;
      if (elapsed > 0) {
        const progress = Math.min(elapsed / 1200, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        logoX = 110 - (110 * ease);
      }

      // Update and draw particles
      if (elapsed > 0) {
        // We pass logoX + 44 (approx center of the giant logo) so particles react to it
        particles.forEach(p => {
          p.update(elapsed, logoX + 44);
          p.draw(ctx);
        });
      }

      // Draw Logo
      if (img.complete && img.naturalWidth !== 0) {
        const size = 88; // Giant logo
        // Draw the logo centered vertically
        ctx.drawImage(img, logoX, logicalHeight / 2 - size / 2, size, size);
      }

      // Trigger completion after 2500ms
      if (elapsed > 2500 && !isCompleteTriggered) {
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
      className="cursor-pointer max-w-[90vw] object-contain"
    />
  );
}
