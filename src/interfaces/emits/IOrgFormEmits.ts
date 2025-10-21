import type { IOrganization } from "@/interfaces/IOrganization";

export interface IOrgFormEmits {
  (e: 'update:modelValue', v: IOrganization | null): void;
  (e: 'submit', v: IOrganization): void;
}
