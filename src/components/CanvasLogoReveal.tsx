import { useEffect, useRef } from 'react';

export default function CanvasLogoReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // We want a fixed logical size that fits the logo and text
    const logicalWidth = 180;
    const logicalHeight = 40;
    
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = `${logicalWidth}px`;
    canvas.style.height = `${logicalHeight}px`;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.src = '/kindev-logo.png';
    
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
        // Start position is behind the logo initially (x around 45)
        this.x = 45 + (Math.random() - 0.5) * 10;
        this.y = logicalHeight / 2 + (Math.random() - 0.5) * 10;
        
        // Initial explosive velocity
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.color = color;
        this.delay = delay;
        this.active = false;
      }

      update(time: number, logoX: number) {
        if (time < this.delay) return;
        this.active = true;

        const dx = this.originX - this.x;
        const dy = this.originY - this.y;
        
        // Push particles away from the moving logo
        const distToLogo = Math.sqrt((this.x - logoX) ** 2 + (this.y - logicalHeight/2) ** 2);
        let forceX = 0;
        let forceY = 0;
        if (distToLogo < 20) {
          const angle = Math.atan2(this.y - logicalHeight/2, this.x - logoX);
          const force = (20 - distToLogo) * 0.3;
          forceX = Math.cos(angle) * force;
          forceY = Math.sin(angle) * force;
        }

        // Spring force towards origin
        this.vx += dx * 0.04 + forceX;
        this.vy += dy * 0.04 + forceY;
        
        // Friction
        this.vx *= 0.82;
        this.vy *= 0.82;
        
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        ctx.fillStyle = this.color;
        // Optimization: draw rectangle instead of arc for particles
        ctx.fillRect(this.x, this.y, 1.5, 1.5);
      }
    }

    let particles: Particle[] = [];
    
    const initParticles = () => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = logicalWidth;
      offCanvas.height = logicalHeight;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, logicalWidth, logicalHeight);
      
      // Draw text
      offCtx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      offCtx.textBaseline = 'middle';
      
      // Gradient for text to match Kindev style
      const gradient = offCtx.createLinearGradient(40, 0, 140, 0);
      gradient.addColorStop(0, '#06b6d4'); // cyan
      gradient.addColorStop(0.5, '#10b981'); // emerald
      gradient.addColorStop(1, '#8b5cf6'); // purple
      offCtx.fillStyle = gradient;
      
      offCtx.fillText('Kindev', 40, logicalHeight / 2 + 2);

      const imageData = offCtx.getImageData(0, 0, logicalWidth, logicalHeight);
      const data = imageData.data;

      particles = [];
      // Step by 2 for performance, creating a dotted/particle effect
      for (let y = 0; y < logicalHeight; y += 2) {
        for (let x = 0; x < logicalWidth; x += 2) {
          const index = (y * logicalWidth + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 100) {
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const color = `rgba(${r}, ${g}, ${b}, ${alpha/255})`;
            
            // Particles delay is based on their X position so they reveal left-to-right
            // as the logo sweeps past them.
            const delay = (x - 40) * 8 + Math.random() * 100;
            particles.push(new Particle(x, y, color, delay));
          }
        }
      }
    };

    let animationFrameId: number;
    let startTime = Date.now();

    const render = () => {
      const currentTime = Date.now();
      // Start animation 800ms after component mounts (to match Navbar drop down)
      const elapsed = currentTime - startTime - 800;
      
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      // Logo animation: start at x=45, move to x=0 over 800ms
      let logoX = 45;
      if (elapsed > 0) {
        const progress = Math.min(elapsed / 800, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        logoX = 45 - (45 * ease);
      }

      // Update and draw particles
      if (elapsed > 0) {
        // We pass logoX + 16 (approx center of logo) so particles react to it
        particles.forEach(p => {
          p.update(elapsed, logoX + 16);
          p.draw(ctx);
        });
      }

      // Draw Logo
      if (img.complete && img.naturalWidth !== 0) {
        const size = 32;
        // Draw the logo centered vertically
        ctx.drawImage(img, logoX, logicalHeight / 2 - size / 2, size, size);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Ensure fonts are loaded before extracting text pixels
    const start = () => {
      initParticles();
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
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="cursor-pointer"
      onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}
    />
  );
}
