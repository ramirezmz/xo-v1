<template>
    <div>
        <GoBack />
        <h1 class="title">Criar minha conta</h1>
        <section class="form">
          <Input
              label="Meu nome"
              :is-required="true"
              placeholder="Digite seu nome"
              kind="input"
              name="name"
              v-model="firstName"
          />
          <Input
              label="Meu email"
              :is-required="true"
              placeholder="Digite seu email"
              kind="input"
              name="email"
              v-model="email"
          />
          <Input
              label="Minha senha"
              :is-required="true"
              placeholder="Digite sua senha"
              kind="password"
              name="password"
              v-model="password"
          />
          <Input
              label="Confirmar minha senha"
              :is-required="true"
              placeholder="Digite novamente sua senha"
              kind="password"
              name="passwordConfirm"
              v-model="passwordConfirm"
          />
            <button class="button-option" @click="xxx">
                criar minha conta
            </button>
        </section>
    </div>
</template>
<script setup lang="ts">
import GoBack from '../components/GoBack.vue'
import Input from '../components/Input.vue'
import { ref } from 'vue'

const firstName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

function xxx () {
  console.log(firstName.value)
  console.log(email.value)
  console.log(password.value)
  console.log(passwordConfirm.value)
}
</script>
<style>
</style>
