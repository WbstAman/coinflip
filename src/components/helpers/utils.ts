export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    const titip = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = titip;
  }

  if (array[0] === newArray[0] && array[1] === newArray[1]) {
    return shuffle(array);
  } else {
    return newArray;
  }
}

export function animationVariant() {
  const height = typeof window !== "undefined" && window.innerHeight < 500;
  const width = typeof window !== "undefined" && window.innerWidth < 500;
  return {
    cupVariants: {
      lift: {
        y: height ? -60 : width ? -80 : -100,
        x: -40,
        rotate: height ? "-30deg" : "-25deg",
      },
      normal: { y: 0, x: 0, rotate: "0deg" },
    },
    shadowVariants: {
      lift: { x: -20, scale: 0.75 },
      normal: { x: 0, scale: 1 },
    },
  };
}

export function pickRandom<T>(array: T[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
