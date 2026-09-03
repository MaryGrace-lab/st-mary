"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [forceShowPoster, setForceShowPoster] = useState(true);

  // Use remote Vercel Blob URL if set, otherwise local file for development
  const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/consecration.mp4";

  // The poster is visible if we're within the first 5 seconds, OR if the video hasn't started yet
  const showPoster = forceShowPoster || !videoPlaying;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ── Autoplay handling ──
    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const handleInteraction = () => video.play();
          document.addEventListener("click", handleInteraction, { once: true });
          document.addEventListener("touchstart", handleInteraction, { once: true });
        });
      }
    };

    // When the video actually starts playing
    const handlePlaying = () => {
      setVideoPlaying(true);
    };

    // ── 5‑second timer for forced poster display ──
    const posterTimer = setTimeout(() => {
      setForceShowPoster(false);
    }, 5000);

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("loadedmetadata", attemptPlay);
    attemptPlay();

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("loadedmetadata", attemptPlay);
      clearTimeout(posterTimer);
    };
  }, []); // run once on mount

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-950 z-0">
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        controlsList="nodownload nofullscreen"
        disablePictureInPicture
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Poster overlay – fades out after 5s if video is playing */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-1000 ${
          showPoster ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/altar.png"
          alt="Church altar"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark gradients for text readability */}
      <div className="absolute inset-0 z-[2] bg-black/45" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    </div>
  );
}