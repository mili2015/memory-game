const cards = document.querySelectorAll('.card');

let isFirstCardFlipped = false;
let firstCard, secondCard;

let totalFlippedCards = 0;
const totalCards = 12;

let timeleft = 40;
let timerIsRunning = true;
let countdownTimer;

function startCountdown() {
  countdownTimer = setInterval(function(){
    timeleft--;

    let minutes = Math.floor(timeleft / 60);
    let seconds = timeleft % 60;
    let formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    let countdown = document.getElementById("countdown")
    countdown.textContent = formattedTime;

    if(timeleft == 10)
      countdown.classList.add("piscar-tempo");

    validateWin();

  }, 1000);
}

function pauseCountdown() {
  clearInterval(countdownTimer);
  timerIsRunning = false;
}

startCountdown();

cards.forEach(card => {
  card.style.order = Math.floor(Math.random() * totalCards);
});

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  if (firstCard != null && secondCard != null) 
    return;

  if (this === firstCard) 
    return;

  flipCardAnimation(this);

  if (! isFirstCardFlipped) 
  {
    isFirstCardFlipped = true;
    firstCard = this;
  }
  else 
  {
    secondCard = this;
  }
  
  checkForMatch();
}

function flipCardAnimation(card) {
  card.classList.add('flip');
}

function checkForMatch() {
  if(firstCard == null || secondCard == null)
    return;

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCardPair() : unflipCardPair();
}

function disableCardPair() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetVariables();
  totalFlippedCards += 2;

  animalsJump();
  explosionsEffects();

  validateWin();
}

function animalsJump() {
  let lion = document.getElementById("lion");
  lion.classList.add("jump");
  let owl = document.getElementById("owl");
  owl.classList.add("jump");
  setTimeout(() => {
    lion.classList.remove("jump");
    owl.classList.remove("jump");
  }, 700);
}

function explosionsEffects() {
  explosions();
  setTimeout(() => {
    tsparticles.style.display = 'none';
  }, 2000);
}

function validateWin() {
  if(totalFlippedCards == totalCards) {
    pauseCountdown();
    document.body.style.opacity = 0;
    setTimeout(() => {
      window.open('win.html', '_self');
    }, 1500);
  }
  else if(timeleft == 0 && timerIsRunning) {
      pauseCountdown();
      cards.forEach(card => card.removeEventListener('click', flipCard));
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.open('loss.html', '_self');
      }, 1500);
    }
}

function unflipCardPair() {
  setTimeout(() => {
    unflipCardPairAnimation();
    resetVariables();
  }, 1500);
}

function unflipCardPairAnimation() {
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
}

function resetVariables() {
  isFirstCardFlipped = false;
  [firstCard, secondCard] = [null, null];
}

const particlesInstance = tsParticles

function explosions() {
  tsparticles.style.display = 'block';
  particlesInstance.load("tsparticles", {
    "fullScreen": {
      "zIndex": 1
    },
    "particles": {
      "number": {
        "value": 0
      },
      "color": {
        "value": [
          "#00FFFC",
          "#FC00FF",
          "#fffc00"
        ]
      },
      "shape": {
        "type": [
          "circle",
          "square"
        ],
        "options": {}
      },
      "opacity": {
        "value": 1,
        "animation": {
          "enable": true,
          "minimumValue": 0,
          "speed": 2,
          "startValue": "max",
          "destroy": "min"
        }
      },
      "size": {
        "value": 4,
        "random": {
          "enable": true,
          "minimumValue": 2
        }
      },
      "links": {
        "enable": false
      },
      "life": {
        "duration": {
          "sync": true,
          "value": 5
        },
        "count": 1
      },
      "move": {
        "enable": true,
        "gravity": {
          "enable": true,
          "acceleration": 10
        },
        "speed": {
          "min": 10,
          "max": 20
        },
        "decay": 0.1,
        "direction": "none",
        "straight": false,
        "outModes": {
          "default": "destroy",
          "top": "none"
        }
      },
      "rotate": {
        "value": {
          "min": 0,
          "max": 360
        },
        "direction": "random",
        "move": true,
        "animation": {
          "enable": true,
          "speed": 60
        }
      },
      "tilt": {
        "direction": "random",
        "enable": true,
        "move": true,
        "value": {
          "min": 0,
          "max": 360
        },
        "animation": {
          "enable": true,
          "speed": 60
        }
      },
      "roll": {
        "darken": {
          "enable": true,
          "value": 25
        },
        "enable": true,
        "speed": {
          "min": 15,
          "max": 25
        }
      },
      "wobble": {
        "distance": 30,
        "enable": true,
        "move": true,
        "speed": {
          "min": -15,
          "max": 15
        }
      }
    },
    "emitters": {
      "life": {
        "count": 0,
        "duration": 0.1,
        "delay": 0.4
      },
      "rate": {
        "delay": 0.1,
        "quantity": 150
      },
      "size": {
        "width": 0,
        "height": 0
      }
    }
  });
}