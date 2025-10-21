<template>
  <div class="ui-input">
    <input
      :value="modelValue"
      @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :disabled="disabled"
      class="ui-input__field"
    />
    <button
      v-if="modelValue && clearable"
      type="button"
      class="ui-input__clear"
      @click="emits('update:modelValue', '')"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import type { UIInputEmits } from '@/interfaces/emits/UI/UIInputEmits';
import type { UIInputProps } from '@/interfaces/props/UI/UIInputProps';

const {modelValue, placeholder, disabled, clearable} = defineProps<UIInputProps>();

const emits = defineEmits<UIInputEmits>();
</script>

<style lang="scss">
.ui-input {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  position: relative;

  &__field {
    flex: 1;
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-regular);
    color: var(--color-text);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-focus);
    }

    &:disabled {
      background-color: var(--color-bg);
      color: var(--color-text-muted);
      cursor: not-allowed;
    }
  }

  &__clear {
    background: none;
    border: none;
    font-size: var(--font-size-md);
    color: var(--color-text-muted);
    cursor: pointer;
    padding: var(--space-xs);

    &:hover {
      color: var(--color-text);
    }
  }
}
</style>
