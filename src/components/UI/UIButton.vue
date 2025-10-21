<template>
  <button   
    class="ui-button" 
    @click="emits('click')"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { UIButtonEmits } from '@/interfaces/emits/UI/UIButtonEmits';
import type { UIButtonProps } from '@/interfaces/props/UI/UIButtonProps';

const {disabled} = defineProps<UIButtonProps>();
const emits = defineEmits<UIButtonEmits>();
</script>

<style lang="scss">
.ui-button {
  display: inline-block;
  padding: var(--space-md) var(--space-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.5s, border-color 0.5s, transform 0.1s;

  &:hover:not(:disabled) {
    background-color: var(--color-border-muted);
    border-color: var(--color-border);
  }

  &:active:not(:disabled) {
    background-color: var(--color-border);
    border-color: var(--color-border-muted);
    transform: translateY(1px);
  }

  &:disabled {
    background-color: var(--color-bg);
    border-color: var(--color-border-muted);
    color: var(--color-text-muted);
    cursor: not-allowed;
    box-shadow: none;
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
}
</style>