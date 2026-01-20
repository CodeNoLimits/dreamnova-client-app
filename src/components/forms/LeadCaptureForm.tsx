'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2, Send, Building2, Mail, Phone, Target } from 'lucide-react';

interface LeadCaptureFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  translations: {
    title: string;
    subtitle: string;
    companyName: string;
    email: string;
    phone: string;
    industry: string;
    companySize: string;
    budget: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    industries: string[];
    sizes: string[];
    budgets: string[];
  };
}

export function LeadCaptureForm({ onSuccess, compact = false, translations: t }: LeadCaptureFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    budget: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSuccess(true);
      onSuccess?.();

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          companyName: '',
          email: '',
          phone: '',
          industry: '',
          companySize: '',
          budget: '',
          message: '',
        });
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <div className="text-center py-12 px-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">{t.success}</h3>
        <p className="text-gray-400">We'll contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!compact && (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {t.companyName} *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Acme Inc."
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {t.email} *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="you@company.com"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {t.phone}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <Target className="w-4 h-4" />
            {t.industry}
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-slate-900">Select industry</option>
            {t.industries.map((ind, i) => (
              <option key={i} value={ind} className="bg-slate-900">{ind}</option>
            ))}
          </select>
        </div>

        {/* Company Size */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">{t.companySize}</label>
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-slate-900">Select size</option>
            {t.sizes.map((size, i) => (
              <option key={i} value={size} className="bg-slate-900">{size}</option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">{t.budget}</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-slate-900">Select budget</option>
            {t.budgets.map((b, i) => (
              <option key={i} value={b} className="bg-slate-900">{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      {!compact && (
        <div className="space-y-2">
          <label className="text-sm text-gray-400">{t.message}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your goals..."
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            {t.submit}
          </>
        )}
      </button>
    </form>
  );
}
