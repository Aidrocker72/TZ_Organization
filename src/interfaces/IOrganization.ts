import type { IAddress } from "@/interfaces/IAddress";

export interface IOrganization {
  id: string;
  name: string;
  director: string;
  phone: string;
  address: IAddress;
}
