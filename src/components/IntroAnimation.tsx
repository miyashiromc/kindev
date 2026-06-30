import { useState, useEffect, useRef } from 'react';
import CanvasIntroReveal from './CanvasIntroReveal';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'video' | 'logo' | 'done'>('video');
  const [isVisible, setIsVisible] = useState(true);
  const [bgColor, setBgColor] = useState('var(--color-kindev-bg)');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Increased failsafe timer because the total animation now takes video duration + 2.5s logo reveal
    const timer = setTimeout(() => {
      handleFinalComplete();
    }, 12000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Grab the background color from the first pixel of the video to camouflage it
    const handleLoadedData = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 100;
      canvas.height = video.videoHeight || 100;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          const pixel = ctx.getImageData(0, 0, 1, 1).data;
          if (pixel[3] > 0) {
            setBgColor(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
          }
        } catch (e) {
          console.error("Could not sample video color", e);
        }
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('playing', handleLoadedData);
    
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('playing', handleLoadedData);
    };
  }, []);

  const handleVideoEnd = () => {
    // Instead of finishing completely, transition to the giant logo reveal phase
    setPhase('logo');
  };

  const handleFinalComplete = () => {
    if (phase === 'done') return;
    setPhase('done');
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500); // Wait for fade out animation
  };

  return (
    <div
      onClick={handleFinalComplete}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 cursor-pointer ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: bgColor }}
    >
      {phase === 'video' && (
        <>
          <video
            ref={videoRef}
            src="/i2ntro_kindev.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-[50vh] md:h-full object-cover"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}
          />
          {/* Camouflage box to hide the Gemini watermark in the bottom right on desktop */}
          <div 
            className="hidden md:block absolute bottom-0 right-0 w-[350px] h-[100px]" 
            style={{ backgroundColor: bgColor }} 
          />
        </>
      )}

      {phase === 'logo' && (
        <div className="flex items-center justify-center w-full h-full animate-in fade-in duration-500">
          <CanvasIntroReveal onComplete={handleFinalComplete} />
        </div>
      )}
    </div>
  );
}
