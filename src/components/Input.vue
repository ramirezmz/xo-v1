<template>
    <div class="input-form"  style="position: relative">
        <div class="label-input">
            <label>{{label}}</label>
            <span v-if="isRequired" class="obrigatory">*</span>
        </div>
        <EyeIcon v-if="isPassword && !isEyeVisible" class="icon button-eye" @click="showPasswordEye"/>
        <EyeOffIcon v-if="isPassword && isEyeVisible" class="icon button-eye" @click="showPasswordEye"/>
        <input :type="inputType" :name="name" :placeholder="placeholder" v-model="inputValue"/>
    </div>
</template>
<script setup lang="ts">
import { defineProps, ref, watch, defineEmits, computed } from 'vue'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'

interface InputProps {
  label: string
  isRequired: boolean
  placeholder: string
  kind: string
  name: string
  modelValue: string
}
const emit = defineEmits(['update:modelValue'])
const props = defineProps<InputProps>()
const showPassword = ref(false)
const isEyeVisible = ref(true)

const isPassword = props.kind === 'password'
const inputType = computed(() => showPassword.value ? 'text' : props.kind)

const inputValue = ref(props.modelValue)
function showPasswordEye () {
  showPassword.value = !showPassword.value
  isEyeVisible.value = !isEyeVisible.value
}

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
<style scoped>
.button-eye {
    position: absolute;
    top: 70%;
    transform: translateY(-50%);
    left: 85%;
    cursor: pointer;
}
</style>
