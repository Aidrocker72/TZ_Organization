<template>
  <form class="org-form" @submit.prevent="submit">
    <div class="org-form__field">
      <label class="org-form__field-label">Название</label>
      <input v-model="model.name" class="org-form__field-input" />
    </div>

    <div class="org-form__field">
      <label class="org-form__field-label">ФИО директора</label>
      <input v-model="model.director" class="org-form__field-input" />
    </div>

    <div class="org-form__field">
      <label class="org-form__field-label">Номер телефона</label>
      <input v-model="model.phone" class="org-form__field-input" />
    </div>

    <div class="org-form__grid org-form__grid--3">
      <div class="org-form__field">
        <label class="org-form__field-label">Город</label>
        <input v-model="model.address.city" class="org-form__field-input" />
      </div>
      <div class="org-form__field">
        <label class="org-form__field-label">Улица</label>
        <input v-model="model.address.street" class="org-form__field-input" />
      </div>
      <div class="org-form__field">
        <label class="org-form__field-label">Дом</label>
        <input v-model="model.address.house" class="org-form__field-input" />
      </div>
    </div>

    <div class="org-form__actions">
      <button type="button" class="org-form__actions-button" @click="emits('update:modelValue', model)">Reset</button>
      <button type="submit" class="org-form__actions-button org-form__actions-button--primary" :disabled="!isValid">OK</button>
    </div>
  </form>

</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue';
import type { IOrganization } from '@/interfaces/IOrganization';
import type { IOrgFormProps } from '@/interfaces/props/IOrgFormProps';
import type { IOrgFormEmits } from '@/interfaces/emits/IOrgFormEmits';

const { modelValue } = defineProps<IOrgFormProps>();
const emits = defineEmits<IOrgFormEmits>();

const model = reactive<IOrganization>(
  modelValue
    ? JSON.parse(JSON.stringify(modelValue))
    : {
        id: String(Date.now()),
        name: '',
        director: '',
        phone: '',
        address: { city: '', street: '', house: '' },
      }
);

watch(
  () => modelValue,
  (v) => {
    if (v) {
      Object.assign(model, JSON.parse(JSON.stringify(v)));
    }
  },
  { immediate: true }
);

const isValid = computed(() => {
  return (
    !!model.name.trim() &&
    !!model.director.trim() &&
    !!model.phone.trim() &&
    !!model.address.city.trim() &&
    !!model.address.street.trim() &&
    !!model.address.house.trim()
  );
});

const submit = () => {
  if (!isValid.value) return;
  emits('submit', JSON.parse(JSON.stringify(model)));
}
</script>

<style lang="scss">
.org-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  &__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    &-label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text);
    }

    &-input {
      width: 100%;
      max-width: 100%;
      padding: var(--space-sm) var(--space-md);
      font-size: var(--font-size-md);
      color: var(--color-text);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-surface);
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;

      &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-focus);
        outline: none;
      }

      &::placeholder {
        color: var(--color-text-muted);
      }
    }
  }

  &__grid {
    display: grid;
    gap: var(--space-sm);

    &--3 {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
    margin-top: var(--space-md);

    &-button {
      padding: var(--space-sm) var(--space-lg);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      border: 1px solid var(--color-border);
      background-color: var(--color-surface);
      color: var(--color-text);
      box-shadow: var(--shadow-sm);
      transition: background-color 0.2s, box-shadow 0.2s, border-color 0.2s;

      &:hover:not(:disabled) {
        background-color: var(--color-bg);
      }

      &:active:not(:disabled) {
        background-color: var(--color-border-muted);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &--primary {
        background-color: var(--color-primary);
        color: #fff;
        border: none;

        &:hover:not(:disabled) {
          background-color: var(--color-primary-hover);
        }

        &:active:not(:disabled) {
          background-color: var(--color-primary-active);
        }
      }
    }
  }
}
</style>

