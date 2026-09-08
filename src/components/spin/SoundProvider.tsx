"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { soundFx } from "./audio";
import { Volume2, VolumeX } from "lucide-react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playScanPing: () => void;
  playScanSuccess: () => void;
  playWheelTick: (pitch?: number) => void;
  playWinnerReveal: () => void;
  playRedemptionSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playClick: () => {},
  playScanPing: () => {},
  playScanSuccess: () => {},
  playWheelTick: () => {},
  playWinnerReveal: () => {},
  playRedemptionSuccess: () => {},
});

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundFx.getIsMuted());
  }, []);

  const toggleMute = () => {
    const nextState = soundFx.toggleMute();
    setIsMuted(nextState);
  };

  const playClick = () => soundFx.playButtonClick();
  const playScanPing = () => soundFx.playScannerPing();
  const playScanSuccess = () => soundFx.playScanSuccess();
  const playWheelTick = (pitch?: number) => soundFx.playWheelTick(pitch);
  const playWinnerReveal = () => soundFx.playWinnerReveal();
  const playRedemptionSuccess = () => soundFx.playRedemptionSuccess();

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playClick,
        playScanPing,
        playScanSuccess,
        playWheelTick,
        playWinnerReveal,
        playRedemptionSuccess,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function SoundToggle() {
  const { isMuted, toggleMute } = useSound();

  const handleToggle = () => {
    toggleMute();
    if (isMuted) {
      soundFx.playButtonClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="p-2 rounded-xl border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 hover:text-black transition-all duration-200 backdrop-blur-md cursor-pointer shadow-xs"
      title={isMuted ? "Unmute sound" : "Mute sound"}
      aria-label="Toggle Sound"
    >
      {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-neutral-800" />}
    </button>
  );
}
