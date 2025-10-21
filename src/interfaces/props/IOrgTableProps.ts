import type { IOrganization } from "@/interfaces/IOrganization";

export interface IOrgTableProps {
  items: IOrganization[];
  sortKey?: 'name' | 'director' | null;
  pageSize?: number;
  currentPage: number;
  totalPages: number;
}
