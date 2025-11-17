import { useState } from "react";

export const useFadeModal = (closeFn: () => void, duration = 300) => {
  const [fadeState, setFadeState] = useState("fade-in");

  const handleAnimatedClose = () => {
    setFadeState("fade-out");

    setTimeout(() => {
      closeFn();
    }, duration);
  };

  return { fadeState, handleAnimatedClose };
};
