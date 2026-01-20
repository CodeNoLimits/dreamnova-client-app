import { Lead, TickerItem } from './types';

export const TICKER_DATA: TickerItem[] = [
  { id: '1', text: 'LEAD PAC #75011', value: '45€', trend: 'up' },
  { id: '2', text: 'LEAD SOLAIRE #33000', value: 'QUALIFIÉ', trend: 'up' },
  { id: '3', text: 'LEAD ASSURANCE #92000', value: 'EN ATTENTE', trend: 'neutral' },
  { id: '4', text: 'LEAD ISO #69002', value: 'VENDU', trend: 'down' },
  { id: '5', text: 'LEAD CPF #13001', value: '38€', trend: 'up' },
  { id: '6', text: 'LEAD ITE #59000', value: 'NOUVEAU', trend: 'up' },
];

export const INITIAL_LEADS: Lead[] = [
  { id: '#8829', sector: 'Pompe à Chaleur', zip: '69002', status: 'HOT', price: 45, timestamp: '10:42:01' },
  { id: '#8830', sector: 'Panneaux Photovoltaïques', zip: '33000', status: 'HOT', price: 52, timestamp: '10:42:05' },
  { id: '#8831', sector: 'Rénovation Globale', zip: '75011', status: 'WARM', price: 38, timestamp: '10:41:45' },
  { id: '#8832', sector: 'Assurance Pro', zip: '92100', status: 'PENDING', price: 25, timestamp: '10:41:12' },
  { id: '#8833', sector: 'Pompe à Chaleur', zip: '13008', status: 'HOT', price: 48, timestamp: '10:40:55' },
  { id: '#8834', sector: 'Isolation Ext.', zip: '59000', status: 'WARM', price: 35, timestamp: '10:40:30' },
  { id: '#8835', sector: 'Panneaux Photovoltaïques', zip: '44000', status: 'HOT', price: 50, timestamp: '10:39:22' },
  { id: '#8836', sector: 'Audit Énergétique', zip: '67000', status: 'PENDING', price: 29, timestamp: '10:38:10' },
  { id: '#8837', sector: 'Pompe à Chaleur', zip: '31000', status: 'HOT', price: 45, timestamp: '10:37:55' },
  { id: '#8838', sector: 'Menuiserie', zip: '06000', status: 'WARM', price: 32, timestamp: '10:37:15' },
];