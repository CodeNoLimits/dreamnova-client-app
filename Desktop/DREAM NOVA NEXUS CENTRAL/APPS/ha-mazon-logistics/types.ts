export interface MicroHub {
  id: string;
  name: string;
  district: string;
  capacity: string;
  status: 'active' | 'maintenance' | 'full';
  coordinates: { x: number; y: number };
}

export interface TimelineEvent {
  time: string;
  label: string;
  description: string;
  shift: 'night' | 'day';
  icon: 'truck' | 'package' | 'bike';
}

export enum ZoneType {
  CRITAIR_3 = 'CRITAIR_3',
  FREE_ACCESS = 'FREE_ACCESS'
}