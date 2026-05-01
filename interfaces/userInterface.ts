// import { IProperty } from "./propertyInterface"

export enum Role {
    AFFILIATE = "AFFILIATE",
    ADMIN = "ADMIN",
    SUPPORT = "SUPPORT",
    SUPERADMIN = "SUPERADMIN",
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
}

export interface INewUser {
  id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	role: 'Agent' | 'Investor';
}

export interface IUserInfo {
	id: string;
	email: string;
	name: string;
	role: string;
	commision: number;
	activeLeads: number;
	dealsClosed: number;
	wallet: WalletInfo;
	transactions: ITransaction[];
	createdAt?: string;
  bankInfo?: IBankInfo;
  status?: 'Active' | 'Suspended';
}

export interface IBankInfo {
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  nin: string;
  bvn: string;
  bankCode: string;
}

export interface WalletInfo {
	availableBalance: number;
	escrowBalance: number;
	totalEarnings: number;
	currency: string;
}

export interface ITransaction {
	id?: string;
	userId: string;
	recipientId?: string;
	propertyId?: string;
	type: 'Deposit' | 'Withdrawal' | 'Income' | 'Escrow';
	transactionType: 'Credit' | 'Debit';
	amount: number;
	status: 'Pending' | 'Completed' | 'Failed';
	description: string;
	createdAt?: string;
}

export interface IContactUs {
    id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    status: boolean;
    message: string;
    createdAt?: Date;
}

export interface IConsultation {
    id?: string;
    service: string;
    meetingDate: Date;
    meetingLocation: string;
    phoneNumber: string;
    email: string;
    organizationName: string;
    name: string;
    details: string;
    preferredModeOfContact: string;
    status: boolean;
    createdAt?: Date;
}

export interface IAffiliate {
  id?: string;
  name: string;
  email: string;
  location: string;
  createdAt?: Date;
}