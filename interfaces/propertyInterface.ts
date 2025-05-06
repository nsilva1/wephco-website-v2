import { IUser } from "./userInterface";

export interface IProperty {
  id?: string;
  name: string;
  description: string;
  images: Array<string>;
  price: number;
  country: string;
  city: string;
  address: string;
  location: string;
  agent?: IUser;
  agentId?: string;
  createdAt: Date
}