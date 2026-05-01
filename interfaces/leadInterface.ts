export interface ILead {
    id: string;
    name: string;
    email: string;
    phone: string;
    userId: string;
    propertyId: string;
    budget: number;
    source: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    currency: string;
    notes: string;
}