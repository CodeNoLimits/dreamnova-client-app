'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Mail,
  Phone,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';

interface Lead {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  industry: string;
  company_size: string;
  budget: string;
  status: string;
  lead_source: string;
  created_at: string;
  notes: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  qualified: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  proposal: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  negotiation: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  client: 'bg-green-500/20 text-green-400 border-green-500/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = filter
        ? `/api/leads/capture?status=${filter}`
        : '/api/leads/capture';
      const response = await fetch(url);
      const data = await response.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId: string, newStatus: string) => {
    try {
      await fetch(`/api/leads/capture/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchLeads();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const exportCSV = () => {
    const headers = ['Company', 'Email', 'Phone', 'Industry', 'Status', 'Created'];
    const rows = leads.map(l => [
      l.company_name,
      l.email,
      l.phone || '',
      l.industry || '',
      l.status,
      new Date(l.created_at).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-400" />
                Lead Management
              </h1>
              <p className="text-gray-400 mt-1">{total} total leads</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchLeads}
              className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'New', status: 'new', color: 'blue' },
            { label: 'Qualified', status: 'qualified', color: 'purple' },
            { label: 'In Pipeline', status: 'proposal', color: 'cyan' },
            { label: 'Clients', status: 'client', color: 'green' },
          ].map(({ label, status, color }) => (
            <div
              key={status}
              className={`p-4 bg-${color}-500/10 border border-${color}-500/30 rounded-xl cursor-pointer hover:bg-${color}-500/20 transition-colors`}
              onClick={() => setFilter(filter === status ? '' : status)}
            >
              <p className="text-2xl font-bold text-white">
                {leads.filter(l => l.status === status).length}
              </p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span>Filter:</span>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white appearance-none cursor-pointer"
          >
            <option value="">All Leads</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="client">Client</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Leads Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-purple-400 mx-auto" />
              <p className="text-gray-400 mt-4">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No leads yet. They will appear here once captured.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{lead.company_name}</p>
                          <p className="text-sm text-gray-500">{lead.company_size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-400 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {lead.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {lead.industry || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {lead.budget || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group">
                        <button
                          className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[lead.status]} flex items-center gap-1`}
                        >
                          {lead.status}
                          <ChevronDown className="w-3 h-3" />
                        </button>
                        <div className="absolute top-full left-0 mt-1 bg-slate-800 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          {Object.keys(statusColors).map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(lead.id, s)}
                              className="block w-full px-4 py-2 text-left text-sm hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
