'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import CenterImg from '@/assets/Images/center.webp';
import LCDImg from '@/assets/Images/lcd.webp';
import PumpyImg from '@/assets/Images/pumpy.webp';
import HeadImg from '@/assets/Images/heads.png';
import TailImg from '@/assets/Images/tails.png';
import RecreateImg from '@/assets/Images/recreate.svg';
import Coinflip from '../Coinflip/Coinflip'; // Adjust path as needed
import './threeflipAnimation.css';

type StateType = 'waiting' | 'flip-animation' | 'winner';

interface WaitingProps {
  isPlayerJoined: boolean;
  setState: (state: StateType) => void;
}

interface ThreeFlipAnimationProps {
  setState: (state: StateType) => void;
  coin: () => 'head' | 'tail';
  randomCoin: 'head' | 'tail';
}

interface WinnerBlockProps {
  coin: 'head' | 'tail';
}

const paths: ReactNode[] = [
  <path key="1" d="M267.796 444.928H414.163C414.163..." fill="white"></path>,
  <path key="2" d="M315.582 1216.68C315.582 1218..." fill="white"></path>,
  <path key="3" d="M386.777 2053H301L365.332 187..." fill="white"></path>,
];

const Waiting: React.FC<WaitingProps> = ({ isPlayerJoined, setState }) => {
  const [currentPath, setCurrentPath] = useState(0);

  useEffect(() => {
    if (!isPlayerJoined) return;

    if (currentPath >= paths.length - 1) {
      const timeout = setTimeout(() => {
        setState('flip-animation');
      }, 1000);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setCurrentPath((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPath, isPlayerJoined, setState]);

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full z-[3] mix-blend-lighten">
        <div className="h-full enter-dissolve-mask opacity-[1]">
          <svg width="238" height="238" viewBox="0 0 774 774" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              {!isPlayerJoined ? (
                <mask id="open-mask">
                  <rect className="animate-pixel-eye" x="232" y="255" width="109" height="213" rx="54.5" fill="white" />
                  <rect className="animate-pixel-eye delay-[25ms]" x="441" y="255" width="109" height="213" rx="54.5" fill="white" />
                  <path className="animate-pixel-mouth" d="M359 499H421V509C421 520.046 412.046 529 401 529H379C367.954 529 359 520.046 359 509V499Z" fill="white" />
                </mask>
              ) : (
                <mask id="open-mask">
                  {currentPath < paths.length && (
                    <g style={{ transform: `translateY(-${currentPath * 100}%)`, transition: 'transform 0.5s cubic-bezier(.55,.01,.15,1)' }}>
                      {paths[currentPath]}
                    </g>
                  )}
                </mask>
              )}
            </defs>
            <image href={LCDImg.src} mask="url(#open-mask)" />
          </svg>
        </div>
      </div>
    </>
  );
};

const ThreeFlipAnimation: React.FC<ThreeFlipAnimationProps> = ({ setState, coin, randomCoin }) => {
  const videoColored = randomCoin === 'head' ? 'grayscale' : '';
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPlayVideo(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full z-[3] mix-blend-lighten">
        <svg width="238" height="238" viewBox="0 0 774 774" className="w-full h-full">
          <defs>
            <mask id="open-mask">
              <rect x="232" y="255" width="109" height="213" rx="54.5" fill="white" />
              <rect x="441" y="255" width="109" height="213" rx="54.5" fill="white" style={{ animationDelay: "25ms" }} />
              <path d="M359 499H421V509C421 520.046 412.046 529 401 529H379C367.954 529 359 520.046 359 509V499Z" fill="white" />
            </mask>
          </defs>
          <image href={LCDImg.src} mask="url(#open-mask)" />
        </svg>
        {playVideo && (
          <div className={`absolute inset-0 m-auto w-[3em] h-[3em] scale-[2] opacity-25 pointer-events-none ${videoColored}`}>
            {/* Optional: Add <video> element if needed */}
          </div>
        )}
      </div>

      <div className="flip flex three-flip absolute inset-0 m-auto z-[3]">
        <div className="relative flex w-[1.75em] h-[1.75em] items-center justify-center rounded-full">
          <div className="w-full h-full bg-[#303045] rounded-[1003px]">
            <div className="w-full h-full bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A] rounded-[1023px]">
              <div className="w-full h-full bg-black/75 rounded-[1000px]">
                <Coinflip setState={setState} randomCoin={randomCoin} />
              </div>
            </div>
          </div>
          <div className="absolute top-[0.05em] right-[0.05em] infinite-flip z-10">
            {coin() === 'head' ? (
              <>
                <Image src={HeadImg} alt="coin" className="w-[0.45em]" />
                <Image src={HeadImg} alt="coin" className="w-[0.45em]" />
              </>
            ) : (
              <>
                <Image src={TailImg} alt="coin" className="w-[0.45em]" />
                <Image src={TailImg} alt="coin" className="w-[0.45em]" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const WinnerBlock: React.FC<WinnerBlockProps> = ({ coin }) => (
  <>
    <div className="absolute top-0 left-0 h-full w-full z-[3] mix-blend-lighten">
      <svg width="238" height="238" viewBox="0 0 774 774" className="w-full h-full">
        <defs>
          <mask id="open-mask">
            <rect x="232" y="255" width="109" height="213" rx="54.5" fill="white" />
            <rect x="441" y="255" width="109" height="213" rx="54.5" fill="white" />
            <path d="M359 499H421V509C421 520.046 412.046 529 401 529H379C367.954 529 359 520.046 359 509V499Z" fill="white" />
          </mask>
        </defs>
        <image href={LCDImg.src} mask="url(#open-mask)" />
      </svg>
    </div>
    <div className="flip flex three-flip absolute inset-0 m-auto z-[3]">
      <div className="relative flex w-[1.75em] h-[1.75em] items-center justify-center rounded-full">
        <div className="w-full h-full bg-[#303045] rounded-[1003px]">
          <div className="w-full h-full bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A] rounded-[1023px]">
            <div className="w-full h-full bg-black/75 rounded-[1000px]">
              <Image src={PumpyImg} alt="winner" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        <div className="absolute top-[0.05em] right-[0.05em] infinite-flip z-10">
          {coin === 'head' ? (
            <>
              <Image src={HeadImg} alt="coin" className="w-[0.45em]" />
              <Image src={HeadImg} alt="coin" className="w-[0.45em]" />
            </>
          ) : (
            <>
              <Image src={TailImg} alt="coin" className="w-[0.45em]" />
              <Image src={TailImg} alt="coin" className="w-[0.45em]" />
            </>
          )}
        </div>
      </div>
    </div>
  </>
);

const CenterBlock: React.FC = () => {
  const [joinedPlayer, setJoinedPlayer] = useState(false);
  const [state, setState] = useState<StateType>('waiting');

  useEffect(() => {
    const timeout = setTimeout(() => setJoinedPlayer(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const getRandomCoin = (): 'head' | 'tail' => (Math.random() < 0.5 ? 'head' : 'tail');

  return (
    <div className="absolute sm:relative w-[2.6em] text-[60px] md:text-[85px] lg:text-[100px] mt-[6.25rem] sm:mt-0 m-auto z-20">
      {state === 'waiting' && <Waiting isPlayerJoined={joinedPlayer} setState={setState} />}
      {state === 'flip-animation' && <ThreeFlipAnimation setState={setState} coin={getRandomCoin} randomCoin={getRandomCoin()} />}
      {state === 'winner' && <WinnerBlock coin="tail" />}
    </div>
  );
};

export default CenterBlock;
