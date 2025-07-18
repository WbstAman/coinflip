"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { animationVariant, pickRandom, shuffle } from "../helpers/utils";
import Cup from "./Cup";
import ResultArea from "./ResultArea";
import { playSound } from "@/helpers/sound";
import Coinflip from "../Coinflip/Coinflip";
import styles from "./Cups.module.css";

import head_coin from "../../assets/Images/head_coin.png";
import tail_coin from "../../assets/Images/tail_coin.png";

import headSprite from "../../assets/Images/head.webp";
import tailSprite from "../../assets/Images/tail.webp";


const shuffleSound = "/assets/audio/card-shuffling.mp3";
const applaudSound = "/assets/audio/applaud.mp3";
const winSound = "/assets/audio/win.mp3";
const loseSound = "/assets/audio/lose.mp3";

interface ResultState {
  isShow: boolean;
  win: boolean;
}

const Cups: React.FC = () => {
  const [showCupTransform, setShowCupTransform] = useState<boolean>(true);
  const [shuffling, setShuffling] = useState<boolean>(true);
  const [resultState, setResultState] = useState<ResultState>({
    isShow: false,
    win: false,
  });

  const [cups, setCups] = useState<number[]>(shuffle([1, 2, 3]));
  const [random, setRandom] = useState<number>(pickRandom([1, 2, 3]));
  const [selectedCupId, setSelectedCupId] = useState<number | null>(random);
  const [showInitialStart, setShowInitialStart] = useState<boolean>(true);
  const [showWinOverlay, setShowWinOverlay] = useState<boolean>(false);

  const shuffleAudioRef = useRef<HTMLAudioElement | null>(null);
  const applaudAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const loseAudioRef = useRef<HTMLAudioElement | null>(null);

  const [randomCoin, setRandomCoin] = useState<"head" | "tail">("head");
  const [showCoin, setShowCoin] = useState<boolean | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [state, setState] = useState<"waiting" | "flip-animation" | "winner">("waiting");

  const [spriteImage, setSpriteImage] = useState(headSprite.src)

  // const handleGameStart = () => {
  //   const result: "head" | "tail" = Math.random() < 0.5 ? "head" : "tail";
  //   const result='tail'
  //   const result='head'
  //   setRandomCoin(result);
  // };

  useEffect(() => {
        const result: "head" | "tail" = Math.random() < 0.5 ? "head" : "tail";
      setRandomCoin(result);
      setSpriteImage( result === "head" ? headSprite.src : tailSprite.src)
  }, [])
  

  useEffect(() => {
    if (isWin != null) {
      setShowInitialStart(false);
    }

    if (isWin) {
      setTimeout(() => {
        playSound("win");
        setShuffling(false);
        setResultState({ isShow: true, win: true });
        setShowWinOverlay(true);
        setShowCoin(true);
      }, 4500);
    } else {
      setTimeout(() => {
        if (isWin === false) {
          setShowCoin(false);
          playSound("lose");
          setResultState({ isShow: true, win: false });
        }
      }, 4500);
    }
  }, [isWin]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      shuffleAudioRef.current = new Audio(shuffleSound);
      applaudAudioRef.current = new Audio(applaudSound);
      winAudioRef.current = new Audio(winSound);
      loseAudioRef.current = new Audio(loseSound);
    }
  }, []);

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

  const ballIndex = cups.indexOf(random);

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
          // onClick={handleGameStart}
        >
          {showCoin === false ? (
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
