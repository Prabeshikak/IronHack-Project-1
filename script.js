"use strict";

class DiceGame {
  constructor() {
    this.player0El = document.querySelector(".player--0");
    this.player1El = document.querySelector(".player--1");
    this.score0El = document.getElementById("score--0");
    this.score1El = document.getElementById("score--1");
    this.current0El = document.getElementById("current--0");
    this.current1El = document.getElementById("current--1");

    this.diceEl = document.querySelector(".dice");
    this.btnNew = document.querySelector(".btn--new");
    this.btnRoll = document.querySelector(".btn--roll");
    this.btnHold = document.querySelector(".btn--hold");

    // test
    this.btnGoBack = document.querySelector(".go_back");
    this.btnGameRule = document.querySelector(".game_rule");
    this.sectionGameMain = document.querySelector(".game_main");
    this.sectionRuleSet = document.querySelector(".rule_set");
    // test

    this.winningSound = new Audio(
      "./mixkit-animated-small-group-applause-523.wav"
    );

    this.scores = [0, 0];
    this.currentScore = 0;
    this.activePlayer = 0;
    this.playing = true;

    this.init();
    this.setupEventListeners();
  }

  init() {
    this.score0El.textContent = 0;
    this.score1El.textContent = 0;
    this.current0El.textContent = 0;
    this.current1El.textContent = 0;

    this.diceEl.classList.add("hidden");
    this.player0El.classList.remove("player--winner");
    this.player1El.classList.remove("player--winner");
    this.player0El.classList.add("player--active");
    this.player1El.classList.remove("player--active");
  }

  toggleGameRules() {
    this.gameRulesSection.classList.toggle("hidden");
  }
  switchPlayer() {
    document.getElementById(`current--${this.activePlayer}`).textContent = 0;
    this.currentScore = 0;
    this.activePlayer = this.activePlayer === 0 ? 1 : 0;
    this.player0El.classList.toggle("player--active");
    this.player1El.classList.toggle("player--active");
  }

  setupEventListeners() {
    this.btnRoll.addEventListener("click", () => this.rollDice());
    this.btnHold.addEventListener("click", () => this.holdScore());
    this.btnNew.addEventListener("click", () => this.init());
  }

  rollDice() {
    if (this.playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;

      this.diceEl.classList.remove("hidden");
      this.diceEl.src = `dice-${dice}.png`;

      if (dice !== 1) {
        this.currentScore += dice;
        document.getElementById(`current--${this.activePlayer}`).textContent =
          this.currentScore;
      } else {
        this.switchPlayer();
      }
    }
  }

  holdScore() {
    if (this.playing) {
      this.scores[this.activePlayer] += this.currentScore;
      document.getElementById(`score--${this.activePlayer}`).textContent =
        this.scores[this.activePlayer];

      if (this.scores[this.activePlayer] >= 100) {
        this.playing = false;
        this.diceEl.classList.add("hidden");
        document
          .querySelector(`.player--${this.activePlayer}`)
          .classList.add("player--winner");
        document
          .querySelector(`.player--${this.activePlayer}`)
          .classList.remove("player--active");

        this.winningSound.play();
      } else {
        this.switchPlayer();
      }
    }
  }
  /*showRules() {
    document.querySelector(".popuptext").classList.remove("hiderules");
    document.querySelector(".popuptext").classList.add("showrules");
  }

  hideRules() {
    document.querySelector(".popuptext").classList.remove("showrules");
    document.querySelector(".popuptext").classList.add("hiderules");
  }*/
}

const game = new DiceGame();
