import type { IOrganization } from "@/interfaces/IOrganization";

export interface IOrgTableEmits {
  (e: 'delete', id: string): void;
  (e: 'row-click', item: IOrganization): void;
  (e: 'sort-change', key: 'name' | 'director' | null): void;
  (e: 'page-change', page: number): void;
}
