import { useState } from 'react';
import CanvasIntroReveal from './CanvasIntroReveal';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleFinalComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500); // Wait for fade out animation
  };

  return (
    <div
      onClick={handleFinalComplete}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 cursor-pointer bg-white ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <CanvasIntroReveal onComplete={handleFinalComplete} />
    </div>
  );
}
