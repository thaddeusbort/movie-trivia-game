import { defineStore } from 'pinia'

import gameData from '../assets/data.json';

const TIMER_DEFAULT = 15;

const GameStates = {
  NotStarted: 0,
  PreVideo: 1,
  Question: 2,
  PostVideo: 3,
  Answer: 4,
  GameOver: 5,
}

export const useGameStore = defineStore('game', {
  state: () => ({
    name: gameData.Name,
    gameState: GameStates.NotStarted,
    index: 0,
    questions: [],
    result: false,
    videoSource: null,
    score: 0,
    maxTimer: TIMER_DEFAULT,
    timer: 0
  }),
  getters: {
    // questionCount: (state) => {
    //   return state.questions.length;
    // },
    questionNum: (state) => {
      return state.index+1;
    },
    question: (state) => {
      if (state.questions.length == 0) return null;
      return state.questions[state.index];
    },
    // videoSource: (state) => {
    //   if (state.gameState == GameStates.PreVideo && this.question && this.question.preVideo)
    //     // return this.question.preVideo;
    //     return "/videos/" + this.question.preVideo;
    //   else if (state.gameState == GameStates.PostVideo  && this.question && this.question.postVideo)
    //     // return this.question.postVideo;
    //     //return "/videos/previewVideo.mp4";
    //     return "/videos/" + this.question.postVideo;
    //   return null;
    // },
    notStarted: (state) => {
      return state.gameState == GameStates.NotStarted;
    },
    questionState: (state) => {
      return state.gameState == GameStates.Question;
    },
    answerState: (state) => {
      return state.gameState == GameStates.Answer;
    },
    videoState: (state) => {
      return state.gameState == GameStates.PreVideo
        || state.gameState == GameStates.PostVideo;
    },
    gameOver: (state) => {
      return state.gameState == GameStates.GameOver;
    },
    timerProgress: (state) => {
      return (state.timer/state.maxTimer)*100;
    }
  },
  actions: {
    startGame() {
      // console.log(gameData);
      this.index = 0;
      this.score = 0;

      // randomize questions
      this.questions = gameData.questions
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      // // randomize answers
      // for (var q=0; q<this.questions.length; q++) {
      //   this.questions[q].answers = this.questions[q].answers
      //   .map(value => ({ value, sort: Math.random() }))
      //   .sort((a, b) => a.sort - b.sort)
      //   .map(({ value }) => value);
      // }

      this.showQuestion();
    },
    showQuestion() {
      if ('timer' in this.question)
        this.timerMax = this.question.timer;
      else
        this.timerMax = TIMER_DEFAULT;
      this.timer = this.timerMax;
      this.gameState = GameStates.Question;
      this.questionTimer();
    },
    questionTimer() {
      if (this.gameState != GameStates.Question) return;
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer -= 1;
          this.questionTimer();
        }, 1000);
      } else {
        if (this.question.postVideo) {
          this.gameState = GameStates.PostVideo;
          this.videoSource = "/videos/" + this.question.postVideo;
        } else
          this.gameState = GameStates.Answer;
      }
    },
    showAnswer() {
      if (this.question.postVideo) {
        this.gameState = GameStates.PostVideo;
        this.videoSource = "/videos/" + this.question.postVideo;
      } else
        this.gameState = GameStates.Answer;
    },
    // guess(idx) {
    //   this.result = this.question.answers[idx].correct;
    //   if (this.result) this.score++;
    //   if (this.question.postVideo) {
    //     this.gameState = GameStates.PostVideo;
    //     this.videoSource = "/videos/" + this.question.postVideo;
    //   } else
    //     this.gameState = GameStates.Answer;
    // },
    videoEnded() {
      if (this.gameState == GameStates.PreVideo)
        this.showQuestion();
      else if (this.gameState == GameStates.PostVideo)
        this.gameState = GameStates.Answer;
    },
    next() {
      if (++this.index < this.questions.length) {
        if (this.question.preVideo) {
          this.gameState = GameStates.PreVideo;
          this.videoSource = "/videos/" + this.question.preVideo;
        } else
          this.showQuestion();
      } else {
        this.gameState = GameStates.GameOver;
      }
    }
  }
})
