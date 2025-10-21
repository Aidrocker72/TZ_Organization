import type { IOrganization } from "@/interfaces/IOrganization";

export interface IOrganizationState {
  organizations: IOrganization[];
  sortKey: 'name' | 'director' | null;
  query: string;
  pageSize: number;
  currentPage: number;
}
