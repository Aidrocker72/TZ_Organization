<template>
  <div class="org-table">
    <table class="org-table__table">
      <thead>
        <tr>
          <th @click="toggleSort('name')">
            Название <span v-if="sortKey === 'name'">↓</span>
          </th>
          <th @click="toggleSort('director')">
            ФИО директора <span v-if="sortKey === 'director'">↓</span>
          </th>
          <th>Номер телефона</th>
          <th>Адрес</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="it in items"
          :key="it.id"
          class="org-table__row"
          @click="rowClick(it, $event)"
        >
          <td class="org-table__cell">{{ it.name }}</td>
          <td class="org-table__cell">{{ it.director }}</td>
          <td class="org-table__cell">{{ it.phone }}</td>
          <td class="org-table__cell">{{ formatAddress(it.address) }}</td>
          <td class="org-table__cell">
            <button class="org-table__delete" @click.stop="remove(it.id)">✕</button>
          </td>
        </tr>

      </tbody>
      <div v-if="items.length === 0" class="org-table__no-data">
        Нет данных
      </div>
    </table>

    <div class="org-table__pagination">
      <UIButton
        :disabled="currentPage === 1"
        @click="emits('page-change', currentPage - 1)"
      >
        ‹ Prev
      </UIButton>
      <span>Стр. {{ currentPage }} / {{ totalPages }}</span>
      <UIButton
        :disabled="currentPage === totalPages"
        @click="emits('page-change', currentPage + 1)"
      >
        Next ›
      </UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import type { IOrganization } from '@/interfaces/IOrganization';
import type { IOrgTableProps } from '@/interfaces/props/IOrgTableProps';
import type { IOrgTableEmits } from '@/interfaces/emits/IOrgTableEmits';
import UIButton from '@/components/UI/UIButton.vue';

const { items, totalPages, sortKey, currentPage } = defineProps<IOrgTableProps>();

const emits = defineEmits<IOrgTableEmits>();

watch(
  () => items.length,
  () => {
    if (currentPage > totalPages) {
      emits('page-change', totalPages);
    }
  }
);

const remove = (id: string) => {
  emits('delete', id);
}

const rowClick = (item: IOrganization, ev: Event) => {
  emits('row-click', item);
}

const formatAddress = (addr: IOrganization['address']) => {
  return `${addr.city}, ${addr.street}, д. ${addr.house}`;
}

const toggleSort = (key: 'name' | 'director') => {
  const newKey = sortKey === key ? null : key;
  emits('sort-change', newKey);
}
</script>

<style lang="scss">
.org-table {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  max-height: 400px;
  min-height: 400px;
  overflow-y: auto;

  &__table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    position: relative;
    font-size: var(--font-size-sm);
    color: var(--color-text);
  }

  th,
  td {
    padding: var(--space-sm) var(--space-md);
    text-align: left;
    border-bottom: 1px solid var(--color-border-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: var(--font-weight-regular);
  }

  th {
    cursor: pointer;
    background-color: var(--color-bg);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-border-muted);
    }
  }

  &__row {
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--color-bg);
    }

    &--empty td {
      background-color: transparent;
      border: none;
    }
  }

  &__delete {
    background: none;
    border: none;
    color: var(--color-danger);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-danger-hover);
    }

    &:active {
      color: var(--color-danger-active);
    }
  }


  &__no-data {
    text-align: center;
    color: var(--color-text-muted);
    border-bottom: none;
    background-color: transparent;
    padding: var(--space-lg);
    white-space: normal;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    font-size: var(--font-size-md);
  }

  &__pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    margin-top: auto;
    border-top: 1px solid var(--color-border-muted);
    background-color: var(--color-surface);

    &-button {
      padding: var(--space-xs) var(--space-md);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      border: 1px solid var(--color-border);
      background-color: var(--color-bg);
      color: var(--color-text);
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background-color: var(--color-surface);
        border-color: var(--color-border-muted);
      }

      &:active:not(:disabled) {
        background-color: var(--color-border-muted);
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
