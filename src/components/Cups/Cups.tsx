"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { animationVariant, pickRandom, shuffle } from "../helpers/utils";
import Cup from "./Cup";
import ResultArea from "./ResultArea";
import GamePreview from "../GamePreview/GamePreview";
import { playSound } from "@/helpers/sound";
import Coinflip from "../Coinflip/Coinflip";
import styles from "./Cups.module.css";

import head_coin from "../../assets/Images/head_coin.png";
import tail_coin from "../../assets/Images/tail_coin.png";

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
  const [random, setRandom] = useState(pickRandom([1, 2, 3]));
  const [selectedCupId, setSelectedCupId] = useState<number | null>(random);
  const [showInitialStart, setShowInitialStart] = useState<boolean>(true);
  const [showWinOverlay, setShowWinOverlay] = useState<boolean>(false);
  const shuffleAudioRef = useRef<HTMLAudioElement | null>(null);
  const applaudAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const loseAudioRef = useRef<HTMLAudioElement | null>(null);
  const [randomCoin, setRandomCoin] = useState<"head" | "tails" | "none">(
    "head"
  );

  const [showCoin, setShowCoin] = useState<boolean | null>(null);

  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [state, setState] = useState<"waiting" | "flip-animation" | "winner">(
    "waiting"
  );

  const handleGameStart = () => {
    const result: "head" | "tails" = Math.random() < 0.5 ? "head" : "tails";   
    setRandomCoin(result);
  };

  useEffect(() => {
    if (isWin != null) {
      setShowInitialStart(false);
    }

    if (isWin) {
      setTimeout(() => {
        playSound("win");
        setShuffling(false);
        setResultState({ isShow: true, win: true });
        setShowWinOverlay(isWin);
        setShowCoin(true);
      }, 4500);
    } else {
      setTimeout(() => {

        if (isWin == false) {
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
    if (applaudAudioRef.current) {
      applaudAudioRef.current.pause();
      applaudAudioRef.current.currentTime = 0;
    }
    if (winAudioRef.current) {
      winAudioRef.current.pause();
      winAudioRef.current.currentTime = 0;
    }
    if (loseAudioRef.current) {
      loseAudioRef.current.pause();
      loseAudioRef.current.currentTime = 0;
    }
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
          margin: "0px auto 50px",
          position: "relative",
        }}
      >
        {/* <GamePreview isWin={isWin} setIsWin={setIsWin} /> */}

        <div
          style={{
            pointerEvents: isWin === false || isWin === null ? "auto" : "none",
          }}
          onClick={handleGameStart}
        >
          {/* <Coinflip
            state={state}
            setState={setState}
            randomCoin={randomCoin}
            setIsWin={setIsWin}
          /> */}

          {showCoin == false ? (
            <div>
              {" "}
              <img
                className="tailCoin"
                src={tail_coin.src}
                alt="tail_coin"
              />{" "}
            </div>
          ) : showCoin == true ? (
            <div>
              {" "}
              <img
                className="tailCoin"
                src={head_coin.src}
                alt="head_coin"
              />{" "}
            </div>
          ) : (
            <Coinflip
              state={state}
              setState={setState}
              randomCoin={randomCoin}
              setIsWin={setIsWin}
            />
          )}
        </div>
      </div>
      {/* </div>
      </div> */}
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
