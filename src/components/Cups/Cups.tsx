"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { animationVariant, pickRandom, shuffle } from "../helpers/utils";
import ResultArea from "./ResultArea";
import { playSound } from "@/helpers/sound";
import Coinflip from "../Coinflip/Coinflip";
import styles from "./Cups.module.css";

import head_coin from "../../assets/Images/head_coin.png";
import tail_coin from "../../assets/Images/tail_coin.png";
import headSprite from "../../assets/Images/head.webp";
import tailSprite from "../../assets/Images/tail.webp";
import { motion } from "motion/react"

interface ResultState {
  isShow: boolean;
  win: boolean;
}

const Cups: React.FC = () => {
  const [shuffling, setShuffling] = useState<boolean>(true);
  const [resultState, setResultState] = useState<ResultState>({
    isShow: false,
    win: false,
  });

  const [showInitialStart, setShowInitialStart] = useState<boolean>(true);
  const [showWinOverlay, setShowWinOverlay] = useState<boolean>(false);
   const applaudAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const loseAudioRef = useRef<HTMLAudioElement | null>(null);

  const [randomCoin, setRandomCoin] = useState<"head" | "tail">("head");
  const [showCoin, setShowCoin] = useState<boolean | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [state, setState] = useState<"waiting" | "flip-animation" | "winner">("waiting");
  const [spriteImage, setSpriteImage] = useState(headSprite.src)
  const [image, setImage] = useState(headSprite.src)
 
  useEffect(() => {
      const result: "head" | "tail" = Math.random() < 0.5 ? "head" : "tail";
      setRandomCoin(result);
      setSpriteImage( result === "head" ? headSprite.src : tailSprite.src)
      setImage( result === "head" ? head_coin.src : tail_coin.src)
  }, [])
  

  useEffect(() => {
    if (isWin != null) {
      setShowInitialStart(false);
    }

    if (isWin) {

      // setImage(head_coin.src)
 
      setTimeout(() => {
        playSound("win");
        setShuffling(false);
        setResultState({ isShow: true, win: true });
        setShowWinOverlay(true);
        setShowCoin(true);
      }, 4000);
    } else {
      setTimeout(() => {
        if (isWin === false) {
          setShowCoin(false);
          playSound("lose");
          setResultState({ isShow: true, win: false });
        }
      }, 4000);
    }
  }, [isWin]);

  const stopSounds = useCallback(() => {
    [applaudAudioRef, winAudioRef, loseAudioRef].forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  }, []);

  const handleCloseWinOverlay = useCallback(() => {
    setShowWinOverlay(false);
    stopSounds();
  }, [stopSounds]);

 
  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>FLIP COIN TO WIN A PRIZE!</h1>

      <div
        className="max-w-[300px] w-full m-auto"
        style={{
          maxWidth: "400px",
          height: "200px",
          width: "100%",
          margin: "-70px auto 70px",
          position: "relative",
        }}
      >
        <div
          style={{
            pointerEvents: isWin === false || isWin === null ? "auto" : "none",
          }}
         >
          {/* {showCoin === false ? (
            <div>
              <img className="tailCoin" src={tail_coin.src} alt="tail coin" />
            </div>
          ) : showCoin === true ? (
            <div>
              <img className="tailCoin" src={head_coin.src} alt="head coin" />
            </div>
          ) : (
            <Coinflip
              setState={setState}
              randomCoin={randomCoin}
              setIsWin={setIsWin}
              state={state}
              spriteImage={spriteImage}
            />
          )} */}
                 {/* {showCoin === false ? (
            <div>
              <img className="tailCoin" src={image} alt="tail coin" />
            </div>
          ) : showCoin === true ? (
            <div>
              <img className="tailCoin" src={image} alt="head coin" />
            </div>
          ) : (
            <Coinflip
              setState={setState}
              randomCoin={randomCoin}
              setIsWin={setIsWin}
              state={state}
              spriteImage={spriteImage}
            />
          )} */}


            {showCoin !== null ? (
       

            <motion.img
  key={image}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 1.05 }}
  transition={{ duration: 0.5 }}
  className="tailCoin"
  src={image}
  alt="coin"
/>
        
          ) : (
            <Coinflip
              setState={setState}
              randomCoin={randomCoin}
              setIsWin={setIsWin}
              state={state}
              spriteImage={spriteImage}
            />
          )} 
   
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <ResultArea
          showInitialStart={showInitialStart}
          resultState={resultState}
          shuffling={shuffling}
          showWinOverlay={showWinOverlay}
          onCloseWinOverlay={handleCloseWinOverlay}
        />
      </div>
    </div>
  );
};

export default Cups;
