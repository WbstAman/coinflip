"use client";

import React, { useState, useEffect, useRef } from "react";
import headSprite from "../../assets/Images/head.webp";
import tailSprite from "../../assets/Images/tail.webp";
import "./coinflip.css";
import { pre } from "framer-motion/client";

// Update: Added missing `triggerGame` to props
interface SpriteProps {
  sprite: string;
  setState?: (state: "waiting" | "flip-animation" | "winner" ) => void;
  setIsWin: (state: true | false | null) => void;
  randomCoin: "head" | "tail";
  state:"waiting" | "flip-animation" | "winner"
 }

const Sprite: React.FC<SpriteProps> = ({ sprite, setState ,state,randomCoin,setIsWin}) => {

  const [frame, setFrame] = useState<number>(0);

  const totalCols = 10;
  const totalRows = 11;
  const totalFrames = totalCols * totalRows;
  const frameWidth = 256;
  const frameHeight = 256;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (intervalRef.current) return;

     if(  randomCoin === "head" ) {
        setState('winner');
         setIsWin(true)
    } else{
        setIsWin(false)
    }

    setFrame(0);

    intervalRef.current = setInterval(() => {
      setFrame((prev) => {
        if (prev + 1 >= totalFrames) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

        //   if (setState) {
        //     setTimeout(() => {
        //       setState("winner");
        //     }, 400);
        //   }

        // return prev
          return 0; // Reset frame to start
        }
        return prev + 1;
      });
    }, 50); // 50ms per frame
  };

  const x = -(frame % totalCols) * frameWidth;
  const y = -Math.floor(frame / totalCols) * frameHeight;

  useEffect(() => {
    if(state=='waiting') return 
 
      startAnimation();
   
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state]);
 
  return (
    <div
      className="sprite"
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${sprite})`,
        backgroundPosition: `${x}px ${y}px`,
        backgroundSize: `${frameWidth * totalCols}px ${
          frameHeight * totalRows
        }px`,
      }}
    />
  );
};

interface CoinflipProps {
  setState: (state: "waiting" | "flip-animation" | "winner") => void;
  setIsWin: (state: true | false | null) => void;
  randomCoin: "head" | "tail" ;
  state:"waiting" | "flip-animation" | "winner"
}

const Coinflip: React.FC<CoinflipProps> = ({state, setState, randomCoin,setIsWin}) => {
  const spriteImage = randomCoin === "head" ? headSprite.src : tailSprite.src;
 
  return (
    <div className="main-wrapper" onClick={()=>setState('flip-animation')}>
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
