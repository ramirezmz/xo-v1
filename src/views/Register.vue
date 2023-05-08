<template>
    <div class="register-content">
        <GoBack />
        <h1 class="title">Criar minha conta</h1>
        <section class="form">
            <div class="input-form">
                <div class="label-input">
                    <label for="name">Meu nome</label>
                <span class="obrigatory">*</span>
                </div>
                <input type="text" name="name" placeholder="Digite seu nome" />
            </div>
            <div class="input-form">
                <div class="label-input">
                    <label for="email">Meu email</label>
                    <span class="obrigatory">*</span>
                </div>
                <input type="email" name="email" placeholder="Digite seu email" />
            </div>
            <div class="input-form">
                <div class="label-input">
                    <label for="password">Minha senha</label>
                <span class="obrigatory">*</span>
                </div>
                <input type="password" name="password" placeholder="Digite sua senha" />
            </div>
            <div class="input-form">
                <div class="label-input">
                    <label for="password-confirm">Confirmar minha senha</label>
                    <span class="obrigatory">*</span>
                </div>
                <input type="password" name="password-confirm" placeholder="Digite novamente sua senha" />
            </div>
            <button class="button-option">
                criar minha conta
            </button>
        </section>
    </div>
</template>
<script setup lang="ts">
import GoBack from '../components/GoBack.vue'

</script>
<style>
.input-form{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1.3rem;
}
.input-form input {
    width: 300px;
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid #6C8E9D;
    font-size: 1.2rem;
    color: #6C8E9D;
    margin-top: 0.5rem;
}
</style>
