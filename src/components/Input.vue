<template>
    <div class="input-form">
        <div class="label-input">
            <label for="name">{{label}}</label>
            <span v-if="isObrigatory" class="obrigatory">*</span>
        </div>
        <input :type="kind" :name="name" :placeholder="placeholder" />
    </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted } from 'vue'

const props = defineProps<{
    label: string
    isObrigatory: boolean
    placeholder: string
    kind: string
    name: string
}>()

onMounted(() => {
  console.log(props)
})
</script>
