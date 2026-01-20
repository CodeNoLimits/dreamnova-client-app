export interface Lead {
  id: string;
  sector: string;
  zip: string;
  status: 'HOT' | 'WARM' | 'PENDING';
  price: number;
  timestamp: string;
  isSold?: boolean;
}

export interface TickerItem {
  id: string;
  text: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

export enum PackageType {
  DISCOVERY = 'DISCOVERY',
  GROWTH = 'GROWTH'
}