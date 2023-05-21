<template>
    <RouterLink to="/" class="go-back">
        <ChevronLeftIcon class="icon icon-chevron-left" />
        <span>Voltar</span>
    </RouterLink>
</template>
<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/solid'
</script>
<style scoped>

.go-back{
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 20px -30px 24px;
}
</style>
