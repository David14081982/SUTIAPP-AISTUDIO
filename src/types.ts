export interface UnionMember {
  id: string;
  name: string;
  payrollId: string;
  section: string;
  avatar: string;
  membershipDate: string;
  digitalQrUrl: string;
  documents: {
    ine: 'pending' | 'uploaded' | 'rejected' | 'none';
    talon1: 'pending' | 'uploaded' | 'rejected' | 'none';
    talon2: 'pending' | 'uploaded' | 'rejected' | 'none';
  };
}

export type FinancialRequestType = 
  | 'prestamo'
  | 'ahorro'
  | 'adelanto'
  | 'inversion'
  | 'auto'
  | 'terreno'
  | 'tour'
  | 'farmacia'
  | 'cirugia'
  | 'paneles'
  | 'membresia'
  | 'marketplace'
  | 'rifa'
  | 'hogar';

export interface FinancialProgram {
  id: FinancialRequestType;
  title: string;
  description: string;
  category: 'directo' | 'vivienda' | 'comercial' | 'salud-bienestar' | 'social';
  limitAmount: number;
  rate: number; // Annual interest percentage
  maxMonths: number;
  iconName: string;
  color: string;
  eligibilityScore: number; // out of 100
  infoBullets: string[];
}

export interface ApplicationTx {
  id: string;
  type: FinancialRequestType;
  title: string;
  amount: number;
  date: string;
  status: 'review' | 'approved' | 'rejected' | 'missing_docs' | 'disbursed' | 'active';
  progress: number; // 0 to 100
  notes: string;
  months?: number;
}

export interface BusinessAgreement {
  id: string;
  businessName: string;
  category: 'salud' | 'compras' | 'entretenimiento' | 'educacion' | 'gastronomia' | 'servicios';
  discountText: string;
  description: string;
  logo: string;
  isLimitedTime: boolean;
  couponCode: string;
  stars: number;
}

export interface NewsFeed {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: 'asamblea' | 'comunicado' | 'evento' | 'logro';
  image: string;
  link?: string;
}

export interface CommitteeMember {
  name: string;
  role: string;
  photo: string;
  department: string;
}

export interface SavingsTier {
  id: string;
  months: number;
  rate: number;
  minAmount: number;
  maxAmount: number;
}
