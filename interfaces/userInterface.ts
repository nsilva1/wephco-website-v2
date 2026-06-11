// import { IProperty } from "./propertyInterface"

export enum Role {
    AFFILIATE = "AFFILIATE",
    ADMIN = "ADMIN",
    SUPPORT = "SUPPORT",
    SUPERADMIN = "SUPERADMIN",
}

export interface IAdminUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified?: boolean;
  photoURL?: string | null;
  role: Role;
  createdAt?: Date | string;
  updatedAt?: Date | string;
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
  kycStatus?: 'pending' | 'verified' | 'flagged';
  kycFlagReason?: string;
  state?: string;
  city?: string;
  country?: string;
  address?: string;
  phone: string;
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
	rejectedReason?: string;
	approvedAt?: string;
	approvedBy?: string;
	user?: IUserInfo;
}

export interface IContactUs {
    id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    message?: string;
    status: boolean;
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

export interface ISupportTicket {
  id?: string;
  userId: string;
  subject: string;
  message: string;
  category: string;
  status: 'open' | 'resolved';
  responseNotes?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  createdAt?: string;
  user?: IUserInfo;
}