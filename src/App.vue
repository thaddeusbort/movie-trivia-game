<script setup>
import VideoPlayer from './components/VideoPlayer.vue';

import { useGameStore } from '@/stores/game';
const game = useGameStore();
</script>

<template>
  <v-container fluid style="height:100vh;" align="center">
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <!----  <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->

    <v-row v-if="game.notStarted" @click="game.startGame" class="full-row">
      <!-- <v-img src="main.jpeg"></v-img> -->
      <v-col>
        <div class="text-h1">Middle Earth Trivia</div>
        <div class="text-h5">Click to begin your journey.</div>
      </v-col>
    </v-row>
    <div v-else-if="game.questionState">
      <v-row class="half-row">
        <div class="text-h2">{{ game.questionNum}}. {{ game.question.question }}</div>
      </v-row>

      <!-- <v-row align="center">
        <div v-for="(answer, index) in game.question.answers" :key="index">
          <AnswerButton :index="index" :text="answer.text" @click="game.guess(index)" />
        </div>
      </v-row> -->
      <v-row class="half-row" @click="game.showAnswer">
        <v-progress-circular :model-value="game.timerProgress" size="200" width="25" indeterminate="true" color="blue">
          <div class="text-h2">{{ game.timer }}</div>
        </v-progress-circular>
      </v-row>
    </div>
    <div v-else-if="game.answerState">
      <v-row class="half-row">
        <!-- <v-alert type="success" v-if="game.result">Correct!</v-alert>
        <v-alert type="error" v-else>Sorry, that was incorrect.</v-alert> -->
        <div class="text-h3">{{ game.question.answer }}</div>
      </v-row>

      <v-row class="half-row">
        <v-btn @click="game.next">Next</v-btn>
      </v-row>
    </div>
    <div v-else-if="game.videoState">
      <VideoPlayer :videoSource="game.videoSource" @video-ended="game.videoEnded" />
      <v-btn @click="game.videoEnded">Skip</v-btn>
    </div>
    <div v-else-if="game.gameOver">
      <v-row class="half-row">
        <div class="text-h1">Well done. Your journey has come to an end but the adventure has just begun.</div>
      </v-row>
      <!-- <v-row>
        <p>Your score was {{ game.score }}</p>
      </v-row> -->

      <v-row class="half-row">
        <v-btn @click="game.startGame">Play again</v-btn>
      </v-row>
    </div>

  <!-- <RouterView /> -->
  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Goudy+Bookletter+1911');

html, body {
  overflow-y: hidden;
}
.text-h1 {
  font-family: 'Goudy Bookletter 1911' !important;
}

.v-row.full-row {
  height:100vh;
  align-items: center;
}
.v-row.half-row {
  height:50vh;
  align-items: center;
  justify-content: center;
}
</style>
