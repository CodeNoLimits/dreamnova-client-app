export interface DCSMetric {
  subject: string;
  A: number;
  fullMark: number;
}

export interface FeedItemData {
  id: number;
  user: string;
  action: string;
  source: string;
  timestamp: string;
  verified: boolean;
  type: 'code' | 'sport' | 'study';
}

export interface CandidateProfile {
  id: number;
  role: string;
  dcs: number;
  alignment: number;
  price: number;
}