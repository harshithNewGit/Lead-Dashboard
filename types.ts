
export enum LeadStatus {
  LeadGen = 'Lead Gen',
  Research = 'Research',
  Connection = 'Connection',
  Response = 'Response',
  Closed = 'Closed',
}

export interface StageDetail {
  personInvolved: string;
  description: string;
  date: string;
}

export interface Lead {
  id: number;
  companyName: string;
  contactPerson: string;
  status: LeadStatus;
  isImportant: boolean;
  lastContacted: string;
  stageDetails: Partial<Record<LeadStatus, StageDetail>>;
}

export interface PieChartData {
  name: string;
  value: number;
}

export enum SocialMediaStatus {
  Active = 'Active',
  Approachable = 'Approachable',
  Inactive = 'Inactive',
}

export interface AiLead {
  companyName: string;
  contactPerson: string;
  description: string;
  socialStatus: SocialMediaStatus;
}