import { useState, useEffect, useRef } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [bgColor, setBgColor] = useState('var(--color-kindev-bg)');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Failsafe in case video doesn't play or end event doesn't fire
    const timer = setTimeout(() => {
      handleComplete();
    }, 8000); // 8 seconds failsafe, adjust if video is longer

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
        // We draw the first frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          // Grab top-left pixel (usually the background color)
          const pixel = ctx.getImageData(0, 0, 1, 1).data;
          // Only set if we actually got a valid pixel
          if (pixel[3] > 0) {
            setBgColor(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
          }
        } catch (e) {
          // Ignore cross-origin canvas tainting issues if any
          console.error("Could not sample video color", e);
        }
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    // Also try playing event in case loadeddata already fired
    video.addEventListener('playing', handleLoadedData);
    
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('playing', handleLoadedData);
    };
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500); // Wait for fade out animation
  };

  return (
    <div
      onClick={handleComplete}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 cursor-pointer ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <video
        ref={videoRef}
        src="/i2ntro_kindev.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleComplete}
        className="w-full h-[50vh] md:h-full object-cover"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      />
      {/* Camouflage box to hide the Gemini watermark in the bottom right on desktop */}
      <div 
        className="hidden md:block absolute bottom-0 right-0 w-48 h-24" 
        style={{ 
          background: `linear-gradient(to top left, ${bgColor} 40%, transparent 100%)` 
        }} 
      />
    </div>
  );
}
