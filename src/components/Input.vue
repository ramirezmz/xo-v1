<template>
    <div class="input-form">
        <div class="label-input">
            <label>{{label}}</label>
            <span v-if="isRequired" class="obrigatory">*</span>
        </div>
        <input :type="kind" :name="name" :placeholder="placeholder" v-model="inputValue" @input="updateValue"/>
    </div>
</template>
<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue'

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

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
