import React from "react";
import { winningList } from "../helpers/constants";
import styles from "./Cups.module.css";
import BonusAnimation from "../BonusAnimation/BonusAnimation";

interface ResultAreaProps {
  showInitialStart: boolean;
  resultState: { isShow: boolean; win: boolean };
  shuffling: boolean;
  showWinOverlay?: boolean;
  onCloseWinOverlay?: () => void;
}

const ResultArea: React.FC<ResultAreaProps> = ({
  showInitialStart,
  resultState,
  shuffling,
  showWinOverlay,
  onCloseWinOverlay,
}) => {
  const randomIndex = Math.floor(Math.random() * winningList.length);
  const randomWinText = winningList[randomIndex];
 
 
   return (
    <div className={styles.resultArea}>
      {showInitialStart ? (
        <div className={styles.instructions}>Click on coin to start.</div>
      ) : resultState.isShow ? (
        resultState.win && showWinOverlay ? (
          <BonusAnimation
            onCloseWinOverlay={onCloseWinOverlay || (() => {})}
            randomWinText={randomWinText}
          />
        ) : resultState.win==false ? (
          <p className={styles.loseText}>You Lose</p>
        ) : null
      ) : shuffling ? (
        <div className={styles.instructions}>Watch closely.</div>
      ) : (
        <div className={styles.instructions}>Pick the right cup.</div>
      )}

      {/* <div className={styles.buttonArea}>
        {resultState.isShow && (
          <button
            className={`${resultState.win ? styles.won : styles.loss} ${
              styles.playAgainButton
            }`}
            onClick={onPlayAgain}
          >
            Play Again
          </button>
        )}
      </div> */}
    </div>
  );
};

export default ResultArea;
