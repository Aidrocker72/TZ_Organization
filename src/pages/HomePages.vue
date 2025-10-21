<template>
  <div class="home-page">
    <UIHeader>
      <h1 class="home-page__header-title">Справочник организаций</h1>
      <UIButton @click="openAdd">Добавить</UIButton>
    </UIHeader>

    <OrgSearch v-model:query="orgStore.query" class="mb-4" />

    <OrgTable
      :items="orgStore.paginated"
      :sortKey="orgStore.sortKey"
      @delete="onDelete"
      @row-click="onEdit"
      @sort-change="orgStore.setSort"
      :pageSize="orgStore.pageSize"
      :currentPage="orgStore.currentPage"
      @page-change="orgStore.goPage"
      :totalPages="orgStore.totalPages"
    />

    <UIModal v-model:modelValue="isModalOpen">
      <template #title>{{ editing ? 'Редактировать организацию' : 'Добавить организацию' }}</template>
      <OrgForm
        :modelValue="editingItem"
        @update:modelValue="editingItem = $event"
        @submit="onFormSubmit"
      />
    </UIModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useOrgStore } from '@/store/organizationStore';
import UIHeader from '@/components/UI/UIHeader.vue';
import UIButton from '@/components/UI/UIButton.vue';
import OrgSearch from '@/components/org/OrgSearch.vue';
import OrgTable from '@/components/org/OrgTable.vue';
import UIModal from '@/components/UI/UIModal.vue';
import OrgForm from '@/components/org/OrgForm.vue';
import type { IOrganization } from '@/interfaces/IOrganization';

const orgStore = useOrgStore();
const isModalOpen = ref<boolean>(false);
const editing = ref<boolean>(false);
const editingItem = ref<IOrganization | null>(null);

onMounted(() => {
  orgStore.load();
});

const openAdd = () => {
  editing.value = false;
  editingItem.value = {
    id: String(Date.now()),
    name: '',
    director: '',
    phone: '',
    address: { city: '', street: '', house: '' },
  };
  isModalOpen.value = true;
}

const onEdit = (item: IOrganization) => {
  editing.value = true;
  editingItem.value = JSON.parse(JSON.stringify(item));
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
  editingItem.value = null;
}

const onFormSubmit = (org: IOrganization) => {
  if (editing.value) {
    orgStore.update(org);
  } else {
    orgStore.add(org);
  }
  closeModal();
}

const onDelete = (id: string) => {
  orgStore.remove(id);
}
</script>

<style lang="scss">
.home-page {
  display: grid;
  gap: 25px;
}
</style>
