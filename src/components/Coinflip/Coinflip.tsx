"use client";

import React, { useState, useEffect, useRef } from "react";
import "./coinflip.css";

// 🔧 SpriteProps uses required types now
interface SpriteProps {
  sprite: string;
  setState: (state: "waiting" | "flip-animation" | "winner") => void;
  setIsWin: (state: true | false | null) => void;
  randomCoin: "head" | "tail";
  state: "waiting" | "flip-animation" | "winner";
}

const Sprite: React.FC<SpriteProps> = ({ sprite, setState, state, randomCoin, setIsWin }) => {
  const [frame, setFrame] = useState<number>(0);
  const totalCols = 10;
  const totalRows = 11;
  const totalFrames = totalCols * totalRows;
  const frameWidth = 256;
  const frameHeight = 256;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (intervalRef.current) return;
 
    if (randomCoin === "head") {
      setState("winner");
      setIsWin(true);
    } else {
      setIsWin(false);
    }

    setFrame(0);

    intervalRef.current = setInterval(() => {
      setFrame((prev) => {
        if (prev + 1 >= totalFrames) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0; // Reset frame
        }
        return prev + 1;
      });
    }, 50);
  };

  const x = -(frame % totalCols) * frameWidth;
  const y = -Math.floor(frame / totalCols) * frameHeight;

  const [pageWidth, setPageWidth] = useState(0)

  useEffect(() => {
    if (state === "waiting") return;
    startAnimation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state]);

  useEffect(() => {
   setPageWidth( window.innerWidth)
  }, []);



   return (
    <div
      className="sprite"
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${sprite})`,
        backgroundPosition: `${x}px ${y}px`,
        backgroundSize: `${frameWidth * totalCols}px ${frameHeight * totalRows}px`,
        transform: `scale(${pageWidth>576 ? 1.8 : pageWidth>400 ? 1.4 : 1 })`
      }}
    />
  );
};

interface CoinflipProps {
  setState: (state: "waiting" | "flip-animation" | "winner") => void;
  setIsWin: (state: true | false | null) => void;
  randomCoin: "head" | "tail";
  state: "waiting" | "flip-animation" | "winner";
  spriteImage: string;
}

const Coinflip: React.FC<CoinflipProps> = ({ state, setState, randomCoin, setIsWin,spriteImage }) => {

 
 
  return (
    <div className="main-wrapper" onClick={() => setState("flip-animation")}>
      <Sprite
        sprite={spriteImage}
        setState={setState}
        state={state}
        randomCoin={randomCoin}
        setIsWin={setIsWin}
      />
    </div>
  );
};

export default Coinflip;
