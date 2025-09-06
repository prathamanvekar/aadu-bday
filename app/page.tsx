"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import chad from "@/public/images/chad.jpg";
import cool from "@/public/images/cool.jpg";
import pinkul from "@/public/images/pinkul.jpg";
import clashBg from "@/public/images/cr.jpg";
import clashBgMobile from "@/public/images/cr_mob.jpg";

export default function BirthdayPage() {
  const [rotating, setRotating] = useState<number | null>(null);
  const [bgImage, setBgImage] = useState(clashBg.src);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const funny = "/funny.mp3";

  useEffect(() => {
    // ✅ Choose background based on screen size
    const updateBg = () => {
      if (window.innerWidth < 768) {
        setBgImage(clashBgMobile.src);
      } else {
        setBgImage(clashBg.src);
      }
    };

    updateBg();
    window.addEventListener("resize", updateBg);

    // ✅ Launch fancy confetti when page loads
    const shootConfetti = () => {
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(200 * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.5 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    };

    shootConfetti();

    return () => window.removeEventListener("resize", updateBg);
  }, []);

  const handleImageClick = (index: number) => {
    setRotating(index);
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.7 } });

    if (index === 1 && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    setTimeout(() => setRotating(null), 1000);
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-6 text-center space-y-4 sm:space-y-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src={funny} preload="auto" />

      {/* Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-5xl md:text-6xl font-bold text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      >
        🎉 Happy Birthday, Aadu Paadu! 🎉
      </motion.h1>

      {/* Image 1 + warning + stop button */}
      <div className="flex flex-col items-center space-y-2">
        <motion.div
          animate={rotating === 1 ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1 }}
          onClick={() => handleImageClick(1)}
          className="cursor-pointer w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-blue-400 shadow-xl hover:scale-110 transition-transform"
        >
          <Image
            src={chad}
            alt="Goofy Pic 1"
            width={300}
            height={300}
            className="object-cover"
          />
        </motion.div>
        <p className="text-xs text-red-300 italic animate-pulse">
          ⚠️ Click the above image at your own risk!
        </p>

        <Button
          variant="destructive"
          size="sm"
          onClick={handleStopAudio}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md px-3 py-1.5 text-xs sm:text-sm"
        >
          ⏹ Stop Playing
        </Button>
      </div>

      {/* Personal message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-md sm:max-w-lg bg-black/60 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 text-base sm:text-lg text-yellow-100 border border-yellow-400"
      >
        Happy birthday, Aarush! Hope your day is more stacked than your deck
        after a Mirror and Elixir Collector start. May your wishes come true
        faster than a Miner sneaks past a distracted Princess. Don’t let any Log
        push ruin your party—just zap those worries away and hee-hee-haw with
        style. Clash on, Pinkul!
      </motion.div>

      {/* Image 2 */}
      <motion.div
        animate={rotating === 2 ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 1 }}
        onClick={() => handleImageClick(2)}
        className="cursor-pointer rotate-6 hover:-rotate-3 transition-transform bg-yellow-200 rounded-xl p-1.5 sm:p-2 shadow-md w-40 sm:w-52 hover:scale-110"
      >
        <Image
          src={cool}
          alt="Goofy Pic 2"
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />
      </motion.div>

      {/* Image 3 */}
      <motion.div
        animate={rotating === 3 ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 1 }}
        onClick={() => handleImageClick(3)}
        className="cursor-pointer mt-4 sm:mt-6 w-44 sm:w-56 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg hover:scale-110 transition-transform"
      >
        <Image
          src={pinkul}
          alt="Goofy Pic 3"
          width={400}
          height={400}
          className="object-cover"
        />
      </motion.div>

      {/* Footer */}
      <p className="text-xs sm:text-sm text-yellow-200 drop-shadow-md">
        Made while playing hog cycle by Guruji
      </p>
    </div>
  );
}
