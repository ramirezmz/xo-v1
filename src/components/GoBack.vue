<template>
    <RouterLink to="/" class="go-back">
        <img src="../assets/ArrowBackIosNewFilled.svg"/>
        <span>Voltar</span>
    </RouterLink>
</template>
<style scoped>

.go-back{
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 20px -30px 24px;
}
.go-back img {
    width: 24px;
    height: 24px;
    margin: 0 8px 0 0;
}
.go-back span {
    margin-left: -5px;
    color: #ffffff;
}
</style>
