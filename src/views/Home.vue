<template>
    <div class="home-page-content">
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
            <button class="link-option">criar uma conta</button>
            <span>ou</span>
            <button class="link-option">acessar minha conta</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import Message from '../components/Message.vue'

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
<style scoped>

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

.button-option {
    width: 300px;
    height: 67px;
    margin: 10px 0;
    border: none;
    border-radius: 6px;
    border: 1px solid #6C8E9D;
    background-color: #252525;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 100;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}
.button-option:hover {
    border:1px solid #D3D089;
    transition: background-color 0.2s ease-in-out;
}

.accounts-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.alert-content {
    width: 300px;
    height: 200px;
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
