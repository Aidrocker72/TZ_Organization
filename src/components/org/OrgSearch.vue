<template>
  <div class="ui-search">
    <UIInput
      v-model="local"
      @input="emitChange"
      placeholder="Найти по ФИО..."
      class="ui-search__input"
    />
    <UIButton
      class="ui-search__clear"
      @click="clear"
      :class="{ 'ui-search__clear--visible': local }"
    >
      ✕
    </UIButton>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue';
import type { IOrgSearchProps } from '@/interfaces/props/IOrgSearchProps';
import type { IOrgSearchEmits } from '@/interfaces/emits/IOrgSearchEmits';
import UIButton from '@/components/UI/UIButton.vue';
import UIInput from '@/components/UI/UIInput.vue';

const { query } = defineProps<IOrgSearchProps>();
const emits = defineEmits<IOrgSearchEmits>();
const local = ref(query ?? '');

watch(() => query, (v) => (local.value = v ?? ''));

const emitChange = () => {
  emits('update:query', local.value);
};

const clear = () => {
  local.value = '';
  emitChange();
};
</script>

<style lang="scss">
.ui-search {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  width: 100%;

  &__input {
    flex: 1;
  }

  &__clear {
    background: none;
    border: none;
    cursor: pointer;
    font-size: var(--font-size-md);
    color: var(--color-text-muted);
    visibility: hidden;
    transition: visibility 0s, opacity 0.2s;
    opacity: 0;

    &--visible {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
