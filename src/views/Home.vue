<template>
    <div class="home-page-content">
        <DarkModeSwitch />
        <h1 class="title-home-page">
            <span>O</span>
            <span>X</span>
        </h1>
        <div class="button-content">
            <button class="button-option" @click="navigateToGame">jogo local</button>
            <button class="button-option" @click="navigateToRealTimeGame">jogo em tempo real</button>
            <button class="button-option" @click="navigateToShareToFriends">convidar amigos</button>
        </div>
        <div class="alert-content">
            <Message v-if="alert" :message="message.title" :kind="message.kind"/>
        </div>
        <div class="accounts-options">
            <RouterLink to="/register" class="link-option">criar uma conta</RouterLink>
            <span>ou</span>
            <RouterLink to="/login" class="link-option">acessar minha conta</RouterLink>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import Message from '../components/Message.vue'
import DarkModeSwitch from '../components/DarkModeSwitch.vue'

const message = reactive({
  title: '',
  kind: ''
})
const alert = ref(false)
const router = useRouter()
const isLogged = ref(false)
function navigateToGame () {
  router.push({ name: 'Game' })
}

function navigateToRealTimeGame () {
  if (isLogged.value) {
    router.push({ name: 'RealTimeGame' })
  } else {
    message.title = 'Você precisa estar logado para jogar em tempo real'
    message.kind = 'error'
    alert.value = true
  }
}

function navigateToShareToFriends () {
  if (isLogged.value) {
    router.push({ name: 'ShareToFriends' })
  } else {
    message.title = 'Você precisa estar logado para convidar amigos'
    message.kind = 'error'
    alert.value = true
  }
}

</script>
<style>

.home-page-content {
    margin-top: 70px;
}
.title-home-page {
    font-size: 4.5rem;
    font-weight: 600;
}
.title-home-page span:first-child {
    color: #6C8E9D;
}
.title-home-page span:last-child {
    color: #D3D089;
}

.button-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

.accounts-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.alert-content {
    width: 300px;
    height: 100px;
}

.link-option {
    border: none;
    background-color: transparent;
    color: #ffffff;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
}
.link-option:hover {
    color: #D3D089;
    transition: color 0.2s ease-in-out;
}
</style>
