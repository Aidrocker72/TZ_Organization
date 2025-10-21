<template>
<transition name="ui-modal-fade">
    <div v-if="open" class="ui-modal">
      <div class="ui-modal__backdrop" @click="close"></div>

        <div class="ui-modal__content" v-show="open">
          <div class="ui-modal__header">
            <h3 class="ui-modal__title"><slot name="title" /></h3>
            <button class="ui-modal__close" @click="close">✕</button>
          </div>
          <div class="ui-modal__body">
            <slot />
          </div>
        </div>
   
    </div> 
  </transition>
</template>

<script setup lang="ts">
import type { UIModalEmits } from '@/interfaces/emits/UI/UIModalEmits';
import type { UIModalProps } from '@/interfaces/props/UI/UIModalProps';
import { defineEmits, defineProps, ref, watch } from 'vue';

const { modelValue } = defineProps<UIModalProps>();

const emits = defineEmits<UIModalEmits>();

const open = ref(modelValue);

watch(
  () => modelValue,
  (v) => {
    open.value = v;
  }
);

const close = () =>  {
  emits('update:modelValue', false);
  emits('close');
}
</script>

<style lang="scss">
.ui-modal {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;

  &__backdrop {
    position: absolute;
    inset: 0;
    background-color: var(--color-backdrop);
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  &__content {
    position: relative;
    background-color: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    z-index: 50;
    width: 100%;
    max-width: 32rem;
    padding: var(--space-lg);
    transform-origin: center;
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 2px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
  }

  &__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
  }

  &__close {
    background: none;
    border: none;
    font-size: var(--font-size-lg);
    color: var(--color-text-muted);
    cursor: pointer;
    padding: var(--space-xs);
    border-radius: var(--radius-sm);
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover {
      color: var(--color-text);
      background-color: var(--color-bg);
    }

    &:active {
      background-color: var(--color-border-muted);
    }
  }

  &__body {
    font-size: var(--font-size-md);
    color: var(--color-text);
  }
}

.ui-modal-fade-enter-from,
.ui-modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.ui-modal-fade-enter-to,
.ui-modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.ui-modal-fade-enter-active,
.ui-modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>

