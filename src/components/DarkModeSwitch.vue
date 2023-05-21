<template>
    <div class="dark-mode-switch-content">
        <input class="checkbox" type="checkbox" id="checkbox" v-model="checked"/>
        <label @click="handleDarkMode" class="label-swich-dark-mode" for="darkModeSwitch">
            <MoonIcon class="icon-moon" />
            <SunIcon class="icon-sun" />
            <div class="ball" ></div>
        </label>
    </div>
</template>
<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'

const checked = ref(false)

function handleDarkMode () {
  checked.value = !checked.value
  if (checked.value) {
    document.documentElement.classList.add('light')
  } else {
    document.documentElement.classList.remove('light')
    checked.value = false
  }
}

</script>
<style scoped>
.label-swich-dark-mode {
  background-color: #111;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 16px;
  width: 40px;
  transform: scale(1.5);
}

.label-swich-dark-mode .ball {
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 22px;
  width: 22px;
  transform: translateX(0px);
  transition: transform 0.2s linear;
}

.checkbox {
  opacity: 0;
  position: absolute;
}

.icon-sun,
.icon-moon {
  width: 24px;
  color: #d3d089;
}

.checkbox:checked + .label-swich-dark-mode .ball {
    transform: translateX(24px);
}

</style>
