<script setup>
defineProps({
  videoSource: {
    type: String,
  }
})
</script>

<template>
  <div>
    <video ref="videoPlayer" class="video-js" autoplay="autoplay" @ended="$emit('videoEnded')">
      <source :src="videoSource" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style scoped>
video {
  width: 100%;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
