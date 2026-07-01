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

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch moves to prevent stuck hover on mobile, or handle them via pointerType
      if (e.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      startLoop();
    };

    const handlePointerLeave = () => {
      mouseX = -100;
      mouseY = -100;
      startLoop();
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

      startLoop();
    };

    // Use modern pointer events to handle both mouse and touch correctly
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerdown', handleInteraction);
    canvas.addEventListener('pointerup', handlePointerLeave);
    canvas.addEventListener('pointercancel', handlePointerLeave);

    let isRunning = false;
    let lastActiveTime = Date.now();

    const startLoop = () => {
      lastActiveTime = Date.now();
      if (!isRunning) {
        isRunning = true;
        render();
      }
    };
    
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
        // Will track the logo while waiting
        this.x = 55;
        this.y = logicalHeight / 2;
        
        // Initial explosive velocity
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.color = color;
        this.delay = delay;
        this.active = false;
      }

      update(time: number, logoX: number) {
        if (time < this.delay) {
          // Track the logo while waiting to spawn so particles always emerge from the hummingbird
          this.x = logoX;
          this.y = logicalHeight / 2;
          return;
        }
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
          if (distToMouse < 12) {
            const angle = Math.atan2(this.y - mouseY, this.x - mouseX);
            const force = (12 - distToMouse) * 1.5; // stronger force for smaller radius
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
            const force = (20 - distFromWaveFront) * 1.5; // Smooth splash force
            forceX += Math.cos(angle) * force;
            forceY += Math.sin(angle) * force - force * 0.2;
          }
        });

        // Spring force towards origin (smooth and fast)
        this.vx += dx * 0.12 + forceX;
        this.vy += dy * 0.12 + forceY;
        
        // Friction (optimized to prevent infinite jittering)
        this.vx *= 0.70;
        this.vy *= 0.70;
        
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        ctx.fillStyle = this.color;
        // Optimization: draw rectangle instead of arc for particles
        // Use a smaller size for higher perceived resolution
        ctx.fillRect(this.x, this.y, 1.2, 1.2);
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

      const imageData = offCtx.getImageData(0, 0, renderWidth, renderHeight);
      const data = imageData.data;

      particles = [];
      // Adjust step based on DPR to maintain high resolution without lagging
      // step=2 on dpr=2 gives 1 particle per logical pixel (super high res)
      const step = dpr > 1 ? 2 : 1;

      for (let y = 0; y < renderHeight; y += step) {
        for (let x = 0; x < renderWidth; x += step) {
          const index = (y * renderWidth + x) * 4;
          const alpha = data[index + 3];
          // Lower alpha threshold includes anti-aliasing edges for smoother text
          if (alpha > 30) {
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const color = `rgba(${r}, ${g}, ${b}, ${alpha/255})`;
            
            // Map device coordinates back to logical coordinates for physics
            const logicalX = x / dpr;
            const logicalY = y / dpr;
            
            // Particles delay is based on their X position so they reveal left-to-right
            const delay = (logicalX - 55) * 8 + Math.random() * 100;
            particles.push(new Particle(logicalX, logicalY, color, delay));
          }
        }
      }
    };

    let animationFrameId: number;
    let startTime = Date.now();
    let lastRenderTime = Date.now();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      
      const currentTime = Date.now();
      if (currentTime - lastRenderTime < 15) return; // Cap at ~60fps for consistent physics
      lastRenderTime = currentTime;

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
      let allSettled = true;
      if (elapsed > 0) {
        // We pass logoX + 22 (approx center of the larger logo) so particles react to it
        particles.forEach(p => {
          p.update(elapsed, logoX + 22);
          p.draw(ctx);
          
          if (p.active && (Math.abs(p.x - p.originX) > 0.5 || Math.abs(p.y - p.originY) > 0.5 || Math.abs(p.vx) > 0.1 || Math.abs(p.vy) > 0.1)) {
            allSettled = false;
          }
        });
      } else {
        allSettled = false;
      }

      // Draw Logo
      if (img.complete && img.naturalWidth !== 0) {
        const size = 44; // Bigger logo
        // Draw the logo centered vertically
        ctx.drawImage(img, logoX, logicalHeight / 2 - size / 2, size, size);
      }

      // Check if we can pause the animation loop
      // Conditions for idle: >2.5s since start, no waves, no mouse, and particles have physically settled
      if (elapsed > 2500 && waves.length === 0 && mouseX === -100 && allSettled && (currentTime - lastActiveTime > 1500)) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        return; // Exit loop
      }
    };

    // Ensure fonts are loaded before extracting text pixels
    const start = () => {
      initParticles();
      startLoop();
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
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="cursor-pointer"
    />
  );
}
