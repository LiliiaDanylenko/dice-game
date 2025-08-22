<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f0f0f0;
}

* {
  box-sizing: border-box;
}

button {
  padding: 10px 40px;
    font-size: 16px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover:not(:disabled) {
  opacity: 0.8;
}

button:disabled {
  background-color: #666;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
