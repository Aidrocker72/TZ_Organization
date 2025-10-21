import { defineStore } from 'pinia';
import type { IOrganization } from '@/interfaces/IOrganization';
import { watch } from 'vue';
import { STORAGE__ORGANIZATION_KEY } from '@/constants/storage-keys';
import type { IOrganizationState } from '@/interfaces/state/IOrganizationSate';

export const useOrgStore = defineStore('orgStore', {
  state: (): IOrganizationState => ({
    organizations: [],
    sortKey: null,
    query: '',
    pageSize: 5,
    currentPage: 1,
  }),

  getters: {
    filtered(state): IOrganization[] {
      let res = [...state.organizations];

      if (state.query.trim()) {
        const q = state.query.toLowerCase();
        res = res.filter(i => i.director.toLowerCase().includes(q));
      }

      if (state.sortKey) {
        res.sort((a, b) => a[state.sortKey!].localeCompare(b[state.sortKey!]));
      }

      return res;
    },

    totalPages(state): number {
      return Math.max(1, Math.ceil(this.filtered.length / state.pageSize));
    },

    paginated(state): IOrganization[] {
      const start = (state.currentPage - 1) * state.pageSize;
      return this.filtered.slice(start, start + state.pageSize);
    },
  },

  actions: {
    load(): void {
      const raw = localStorage.getItem(STORAGE__ORGANIZATION_KEY);
      this.organizations = raw ? JSON.parse(raw) : [];

      watch(
        () => this.organizations,
        (val) => {
          localStorage.setItem(STORAGE__ORGANIZATION_KEY, JSON.stringify(val));
        },
        { deep: true }
      );
    },

    add(org: IOrganization): void {
      this.organizations.unshift(org);
    },

    update(org: IOrganization): void {
      const idx = this.organizations.findIndex(i => i.id === org.id);
      if (idx >= 0) this.organizations.splice(idx, 1, org);
    },

    remove(id: string): void {
      this.organizations = this.organizations.filter(i => i.id !== id);
    },

    setQuery(q: string): void {
      this.query = q;
      this.currentPage = 1;
    },

    setSort(key: 'name' | 'director' | null): void {
      this.sortKey = this.sortKey === key ? null : key;
    },

    goPage(page: number): void {
      if (page >= 1 && page <= this.totalPages) this.currentPage = page;
    },
  },
});
