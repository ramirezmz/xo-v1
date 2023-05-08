<template>
    <div class="message-content" :class="kindOptions">
        <span>{{ message }}</span>
    </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps<{
    message: string,
    kind: string
}>()

const kindOptions = computed(() => {
  const options = ['error', 'alert', 'success']
  return options.includes(props.kind) ? props.kind : 'error'
})
</script>
<style scoped>
.message-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 300px;
}
.error {
    color: #AA4747;
}
.alert {
    color: #D3D089;
}

.success {
    color: #6c9d6f;
}
</style>
