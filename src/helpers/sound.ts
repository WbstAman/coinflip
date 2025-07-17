export  const playSound = (key: string) => {
   
    switch (key) {
      case "lose": {
        const loseSound = new Audio("/assets/sounds/lose.mp3");
        loseSound.play();
        break;
      }
      case "win": {
        const winSound = new Audio("/assets/sounds/win.mp3");
        winSound.play();
        break;
      }
      default:
        break;
    }
  };
