import React, { useEffect, useState } from "react";
import styles from "./BonusAnimation.module.css";
import ConfettiRain from "../ConfettiRain/ConfettiRain";
import { StaticImageData } from "next/image";

interface BonusAnimationProps {
  onCloseWinOverlay: () => void;
  randomWinText: StaticImageData;
}

const BonusAnimation: React.FC<BonusAnimationProps> = ({
  onCloseWinOverlay,
  randomWinText,
}) => {
  const [isOverlayEnabled, setIsOverlayEnabled] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOverlayEnabled(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={styles.winTextContainer}>
        <div
          className={`${styles.winTextOverlay} ${
            !isOverlayEnabled ? styles.disabled : ""
          }`}
          onClick={() => isOverlayEnabled && onCloseWinOverlay()}
        />
        {/* <p className={styles.wonText}>{randomWinText}</p> */}
        <div className={styles.cardBox}>
          <div className={styles.card}>
            <div className={styles.content}>
              <div className={styles.front}>
                <img
                  src={"/assets/images/center.webp"}
                  alt="card-front"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.back}>
                <div className={styles.wonPriceBox}>
                  <img
                    src={randomWinText.src}
                    alt="card-back"
                    className={styles.cardImage}
                  />
                  <div className={styles.shine} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.confettiContainer}>
        <ConfettiRain />
      </div>
    </>
  );
};

export default BonusAnimation;
