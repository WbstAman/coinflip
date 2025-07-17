import { create } from "zustand";
interface CounterState {
  walletAmt: number;
  betAmt: number;

  isGameStart: boolean;
  gameRunning: boolean;

  isWinning: boolean;
  coinFace: string;
  rotationCount: number;
  score: number;
  flipCoinStatus: boolean;
  isSound: boolean;
  isMovieMode: boolean;
  isTurbo: boolean;
  winlooseCount: {
    win: number;
    lose: number;
  };
  totalPlays: {
    isWin: boolean;
    totalPoints: number;
  }[];

  coinFaceSelections: string[];

  isStar: boolean;
  isLiked: boolean;
  isMusic: boolean;

  winningAmt: number;
  setWinningAmt: (value: number) => void;

  soundAction: () => void;
  turboAction: () => void;
  setMovieMode: () => void;
  selectCoinsActions: (value: string) => void;
  gameRunningAction: (value: boolean) => void;
  isWinningAction: (value: boolean) => void;
  rotationAction: (value: number) => void;
  totalScoreAction: (value: number) => void;
  resetGameAction: () => void;
  updateWinLooseCountAction: (type: "win" | "lose") => void;
  resetWinLooseCountAction: () => void;
  totalPlaysAction: (value: { isWin: boolean; totalPoints: number }) => void;

  setIsGameStart: () => void;

  setIsStar: (value: boolean) => void;
  setIsLiked: () => void;
  setIsMusic: () => void;

  setWalletAmt: (value: number) => void;
  setBetAmt: (value: number) => void;
}

const useCounterStore = create<CounterState>((set) => ({
  isGameStart: false,
  gameRunning: false,
  coinFace: "",
  isWinning: false,
  rotationCount: 0,
  flipCoinStatus: false,
  coinFaceSelections: [],
  isSound: true,
  score: 0,
  isTurbo: false,
  loseCount: 0,
  winCount: 0,
  winlooseCount: { win: 0, lose: 0 },
  totalPlays: [],

  // Wallet Amt
  walletAmt: 0,
  betAmt: 0,

  // Winning Amt
  winningAmt: 0,

  // Footer
  isStar: false,
  isLiked: false,
  isMovieMode: false,
  isMusic: false,

  setWinningAmt: (value: number) => set(() => ({ winningAmt: parseFloat(value.toFixed(2)) })),

  setWalletAmt: (value: number) => set(() => ({ walletAmt: value })),

  setBetAmt: (value: number) => set(() => ({ betAmt: value })),

  setIsMusic: () => set((state) => ({ isMusic: !state.isMusic })),
  setIsStar: () => set((state) => ({ isStar: !state.isStar })),
  setIsLiked: () => set((state) => ({ isLiked: !state.isLiked })),
  setMovieMode: () => set((state) => ({ isMovieMode: !state.isMovieMode })),

  setIsGameStart: () => set((state) => ({ isGameStart: !state.isGameStart })),
  gameRunningAction: (value: boolean) => set(() => ({ gameRunning: value })),
  isWinningAction: (value: boolean) => set(() => ({ isWinning: value })),
  rotationAction: (value: number) => set(() => ({ rotationCount: value })),
  flipCoinStatusAction: () =>
    set((state) => ({ flipCoinStatus: !state.flipCoinStatus })),
  selectCoinsActions: (value) =>
    set((state) => ({
      coinFaceSelections: [...state.coinFaceSelections, value],
    })),
  resetGameAction: () =>
    set(() => ({
      coinFace: "",
      coinFaceSelections: [],
      gameRunning: false,
      isWinning: false,
    })),
  soundAction: () => set((state) => ({ isSound: !state.isSound })),
  totalScoreAction: (value: number) => set(() => ({ score: value })),
  turboAction: () => set((state) => ({ isTurbo: !state.isTurbo })),
  updateWinLooseCountAction: (type: "win" | "lose") =>
    set((state) => ({
      winlooseCount: {
        ...state.winlooseCount,
        [type]: state.winlooseCount[type] + 1,
      },
    })),

  resetWinLooseCountAction: () =>
    set(() => ({ winlooseCount: { win: 0, lose: 0 } })),
  totalPlaysAction: (value) =>
    set((state) => {
      const updatedPlays = [...state.totalPlays, value];
      if (updatedPlays.length > 9) {
        updatedPlays.shift(); // remove first element
      }
      return { totalPlays: updatedPlays };
    }),
}));

export default useCounterStore;
