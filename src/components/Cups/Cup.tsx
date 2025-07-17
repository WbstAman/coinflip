import React from "react";
import { motion } from "framer-motion";
import styles from "./Cups.module.css";
interface CupProps {
  cupId: number;
  isSelectedLift: boolean;
  showCupTransform: boolean;
  showBall: boolean;
  ballIndex: number;
  index: number;
  cupVariants: any;
  shadowVariants: any;
  onClick: () => void;
}

const Cup: React.FC<CupProps> = ({
  cupId,
  isSelectedLift,
  showCupTransform,
  showBall,
  ballIndex,
  index,
  cupVariants,
  shadowVariants,
  onClick,
}) => (
  <motion.div className={styles.cupBox} key={cupId} layout>
    <motion.div
      initial={"normal"}
      animate={isSelectedLift ? "lift" : "normal"}
      variants={cupVariants}
      className={`${styles.cup} ${
        !showCupTransform ? styles.noTransition : ""
      }`}
      onClick={onClick}
    />
    {showBall && ballIndex === index && <div className={styles.ball} />}
    <motion.div
      animate={isSelectedLift ? "lift" : "normal"}
      variants={shadowVariants}
      className={styles.cupShadow}
    />
  </motion.div>
);

export default Cup;
