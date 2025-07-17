import React from "react";
import Lottie from "react-lottie";
import confettiimage1 from "../../../public/assets/confetti/circular-confetti.json";
import confettiimage2 from "../../../public/assets/confetti/spin-confetti-2.json";
import styles from "./ConfettiRain.module.css";

const confetti1 = {
  loop: true,
  autoplay: true,
  animationData: confettiimage2,
};

const confetti2 = {
  loop: true,
  autoplay: true,
  animationData: confettiimage1,
};

const ConfettiRain: React.FC = () => {
  const ribbons = [
    { className: "confetti1", first: confetti2, second: null },
    // { className: "confetti2", first: confetti1, second: confetti2 },
  ];

  return (
    <>
      {ribbons.map((ribbon) => (
        <div className={styles[ribbon.className]} key={ribbon.className}>
          <Lottie options={ribbon.first} height={800} width="100%" />
          {/* <Lottie options={ribbon.second} height={600} width="100%" /> */}
        </div>
      ))}
    </>
  );
};

export default ConfettiRain;
