import { useEffect, useRef } from 'react';

export default function CanvasLogoReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Increased logical size to accommodate larger logo and text
    const logicalWidth = 240;
    const logicalHeight = 60;
    
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
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

      // Original click behavior (smooth scroll to top)
      document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('pointerdown', handleInteraction);
    
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
        // Start position is behind the logo initially (x around 55)
        this.x = 55 + (Math.random() - 0.5) * 15;
        this.y = logicalHeight / 2 + (Math.random() - 0.5) * 15;
        
        // Initial explosive velocity
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
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

        // 1. Push particles away from the moving logo
        const distToLogo = Math.sqrt((this.x - logoX) ** 2 + (this.y - logicalHeight/2) ** 2);
        if (distToLogo < 25) {
          const angle = Math.atan2(this.y - logicalHeight/2, this.x - logoX);
          const force = (25 - distToLogo) * 0.4;
          forceX += Math.cos(angle) * force;
          forceY += Math.sin(angle) * force;
        }

        // 2. Mouse Repulsion
        if (mouseX !== -100) {
          const distToMouse = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
          if (distToMouse < 25) {
            const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
            const force = (25 - distToMouse) * 0.8; // stronger repulsion
            forceX += Math.cos(angle) * force;
            forceY += Math.sin(angle) * force;
          }
        }

        // 3. Wave effect on tap (massively increased force for visibility)
        waves.forEach(wave => {
          const distToWaveCenter = Math.sqrt((this.x - wave.x) ** 2 + (this.y - wave.y) ** 2);
          const distFromWaveFront = Math.abs(distToWaveCenter - wave.radius);
          if (distFromWaveFront < 20) { // wider wave band
            const angle = Math.atan2(this.y - wave.y, this.x - wave.x);
            // Push outwards and upwards for a huge splash effect
            const force = (20 - distFromWaveFront) * 3.0; // much stronger force
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
        // Optimization: draw rectangle instead of arc for particles
        ctx.fillRect(this.x, this.y, 2, 2);
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
      
      // Draw text - Thicker (800) and bigger (30px)
      offCtx.font = '800 30px "Plus Jakarta Sans", sans-serif';
      offCtx.textBaseline = 'middle';
      
      // Gradient for text to match Kindev style
      const gradient = offCtx.createLinearGradient(55, 0, 180, 0);
      gradient.addColorStop(0, '#06b6d4'); // cyan
      gradient.addColorStop(0.5, '#10b981'); // emerald
      gradient.addColorStop(1, '#8b5cf6'); // purple
      offCtx.fillStyle = gradient;
      
      offCtx.fillText('Kindev', 55, logicalHeight / 2 + 2);

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
            const delay = (x - 55) * 8 + Math.random() * 100;
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

      // Update waves (slightly slower so force applies longer)
      waves.forEach(w => w.radius += 4);
      waves = waves.filter(w => w.radius < logicalWidth * 1.5); // Remove dead waves

      // Logo animation: start at x=55, move to x=0 over 800ms
      let logoX = 55;
      if (elapsed > 0) {
        const progress = Math.min(elapsed / 800, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        logoX = 55 - (55 * ease);
      }

      // Update and draw particles
      if (elapsed > 0) {
        // We pass logoX + 22 (approx center of the larger logo) so particles react to it
        particles.forEach(p => {
          p.update(elapsed, logoX + 22);
          p.draw(ctx);
        });
      }

      // Draw Logo
      if (img.complete && img.naturalWidth !== 0) {
        const size = 44; // Bigger logo
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
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('pointerdown', handleInteraction);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="cursor-pointer"
    />
  );
}
