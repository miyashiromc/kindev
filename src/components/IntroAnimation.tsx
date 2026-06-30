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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-kindev-bg transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* 
        To remove the background, we can use mix-blend-mode. 
        If the video has a black background, use 'mix-blend-screen'.
        If the video has a white background, use 'mix-blend-multiply'.
        Adjust accordingly. We use a transparent container so the background color of the app shines through.
      */}
      <video
        ref={videoRef}
        src="/intro_kindev.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleComplete}
        className="w-full h-full object-contain mix-blend-screen max-w-4xl"
      />
    </div>
  );
}
