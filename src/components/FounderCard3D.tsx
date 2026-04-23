"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface FounderCard3DProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  emoji: string;
  index: number;
}

/**
 * 3D Tilt Founder Card with mouse tracking, glare effect, and sound.
 * Uses CSS transforms for 3D rotation based on mouse position.
 */
export function FounderCard3D({ name, role, bio, image, emoji, index }: FounderCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Initialize audio context on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        setAudioContext(ctx);
      }
    };
    window.addEventListener("click", initAudio, { once: true });
    return () => window.removeEventListener("click", initAudio);
  }, [audioContext]);

  const playHoverSound = useCallback(() => {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Futuristic blip sound
    oscillator.frequency.setValueAtTime(800 + index * 50, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  }, [audioContext, index]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-15 to 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
    
    // Update glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareOpacity(1);
    
    // Update CSS custom properties for glare gradient
    if (cardRef.current) {
      cardRef.current.style.setProperty("--glare-x", `${glareX}%`);
      cardRef.current.style.setProperty("--glare-y", `${glareY}%`);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    playHoverSound();
  }, [playHoverSound]);

  const handleMouseLeave = useCallback(() => {
    setTransform("rotateX(0deg) rotateY(0deg) translateZ(0px)");
    setGlareOpacity(0);
  }, []);

  return (
    <div className="founder-card-3d" style={{ animationDelay: `${index * 0.1}s` }}>
      <div
        ref={cardRef}
        className="founder-card-inner"
        style={{
          transform: transform,
          transition: "transform 0.1s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glare overlay */}
        <div
          className="founder-card-glare"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />
        
        {/* Holographic badge */}
        <div className="founder-holo-badge">{emoji}</div>
        
        {/* Image */}
        <div className="founder-image-wrap">
          <img src={image} alt={name} className="founder-image" loading="lazy" />
        </div>
        
        {/* Info */}
        <div className="founder-info">
          <h3 className="founder-name">{name}</h3>
          <p className="founder-role">{role}</p>
          <p className="founder-bio">{bio}</p>
        </div>
      </div>
    </div>
  );
}
