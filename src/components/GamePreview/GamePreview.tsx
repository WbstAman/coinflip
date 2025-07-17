"use client";

import { useState, type FC } from "react";
import "./GamePreview.css";
import { playSound } from "@/helpers/sound";
import head from '../../assets/Images/head.webp'
import Coinflip from "../Coinflip/Coinflip";

interface GamePreviewProps {
  isWin: boolean | null;
  setIsWin: (value: boolean) => void;
}

const GamePreview: FC<GamePreviewProps> = ({ isWin, setIsWin }) => {
  const [flipped, setFlipped] = useState(false);
  const [currentFace, setCurrentFace] = useState<"head" | "tails" | "none">("head");
  const [state, setState] = useState< 'waiting' | 'flip-animation' | 'winner'>("waiting")
 

        const result: "head" | "tails" = Math.random() < 0.5 ? "head" : "tails";


  const flipCoin = () => {
    if (isWin != null) return;

    setFlipped((prev) => !prev);
    setTimeout(() => {
      const randomCall = "head";
      const result: "head" | "tails" = Math.random() < 0.5 ? "head" : "tails";

      setCurrentFace(result);

      if (randomCall == result) {
        setIsWin(true);
        setState('winner')
      } else {
        setIsWin(false);
        setState('flip-animation')
        playSound("lose");
      }
      setFlipped((prev) => !prev);
    }, 400); // simulate coin flipping time
  };

 
  return (
    <div className="w-full m-auto flex justify-center gameContainer">
      {/* <div className="relative w-full m-auto" onClick={flipCoin}> */}
      <div className="relative w-full m-auto">
        <div className={`coinOuter`}>
          {/* <div className="ryu"></div> */}

    <div>
          <Coinflip  setState={setState} randomCoin={"head"} />
      </div>

      {/* <div className="sprites">
  <div className="sprite catSprite">
    <img src={head.src} alt="Cat Sprite" />
  </div>
</div> */}
        </div>

        {/* <div
          className={`coinOuter`}
          style={{
            // transform: `scale(1) rotateY(${flipped ? 720 : 0}deg)`,
            transform: `scale(${flipped ? 1.3: 1}) rotateY(${flipped ? 720 : 0}deg)`,
          }}
        >
          <figure
            className="absolute w-full h-full left-0 top-0 m-0 goldCoinfigure"
            style={{
              transform:
                currentFace == "head"
                  ? "translateZ(-1px) rotateY(0deg)head"
                  : "translateZ(1px) rotateY(0deg)",
            }}
          />
          <figure
            className="absolute w-full h-full left-0 top-0 m-0 silverCoinfigure"
            style={{
              transform:
                currentFace == "tails"
                  ? "translateZ(1px) rotateY(0deg)"
                  : "translateZ(-1px) rotateY(0deg)",
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default GamePreview;
