import { useState, useEffect, useRef } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Failsafe in case video doesn't play or end event doesn't fire
    const timer = setTimeout(() => {
      handleComplete();
    }, 8000); // 8 seconds failsafe, adjust if video is longer

    return () => clearTimeout(timer);
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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md transition-opacity duration-500 cursor-pointer ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <video
        ref={videoRef}
        src="/i2ntro_kindev.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleComplete}
        // mix-blend-multiply makes pure white transparent.
        // We use brightness(1.05) contrast(1.1) to force near-whites (due to mp4 compression) into pure white so they disappear completely.
        className="w-full h-full object-cover mix-blend-multiply"
        style={{ filter: 'brightness(1.05) contrast(1.1)' }}
      />
    </div>
  );
}
