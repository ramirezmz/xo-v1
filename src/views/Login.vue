<template>
    <div class="content">
      <GoBack class="move"/>
    <h1 class="title">Accessar minha conta</h1>
      <section class="form">
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
          <button class="button-option" @click="xxx">
              entrar
          </button>
      </section>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Input from '../components/Input.vue'
import GoBack from '../components/GoBack.vue'

const email = ref('')
const password = ref('')

function xxx () {
  console.log(email.value)
  console.log(password.value)
}
</script>
<style scoped>
.move {
    margin-left: -332px;
}

</style>
