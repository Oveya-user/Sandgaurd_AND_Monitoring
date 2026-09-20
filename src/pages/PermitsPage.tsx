import { THEME, permitStatusColor, permitStatusBg } from '../theme';
import { PERMITS } from '../mockData';
import type { Permit } from '../types';
import { FileCheck, Search } from 'lucide-react';
import { useState } from 'react';

function StatusBadge({ status }: { status: Permit['status'] }) {
  return (
    <span className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: permitStatusBg(status), color: permitStatusColor(status) }}>
      {status.toUpperCase()}
    </span>
  );
}

export default function PermitsPage() {
  const [search, setSearch] = useState('');

  const filtered = PERMITS.filter(
    (p) =>
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.operator.toLowerCase().includes(search.toLowerCase()) ||
      p.zone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Permit Verification Hub</h1>
        <p className="text-sm text-gray-500">Regulatory sand extraction permit ledger — Tamil Nadu</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: THEME.textMuted }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Permit ID, Operator, or Zone..."
            className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors"
            style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}
          />
        </div>
        <div className="flex items-center gap-2 rounded-lg border px-4 py-2.5" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
          <FileCheck size={16} style={{ color: THEME.emerald }} />
          <span className="text-sm text-gray-400">{PERMITS.filter((p) => p.status === 'Active').length} Active</span>
          <span className="text-gray-700">·</span>
          <span className="text-sm" style={{ color: THEME.amber }}>{PERMITS.filter((p) => p.status === 'Expired').length} Expired</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
                {['Permit ID', 'Operator Name', 'Target Allotted Zone', 'Permitted Activity Scope', 'Vehicle/Equipment Bound', 'Status'].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: THEME.textMuted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-[#212128]" style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <td className="px-4 py-3 text-sm font-mono text-white">{p.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{p.operator}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{p.zone}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{p.scope}</td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-300">{p.vehicleBound}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="py-12 text-center text-sm text-gray-600">No permits matching search</div>}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border p-4" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
          <div className="text-xs text-gray-500">Total Permits</div>
          <div className="mt-1 text-2xl font-bold text-white">{PERMITS.length}</div>
        </div>
        <div className="rounded-xl border p-4" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
          <div className="text-xs text-gray-500">Active Permits</div>
          <div className="mt-1 text-2xl font-bold" style={{ color: THEME.emerald }}>{PERMITS.filter((p) => p.status === 'Active').length}</div>
        </div>
        <div className="rounded-xl border p-4" style={{ backgroundColor: THEME.surface, borderColor: THEME.border }}>
          <div className="text-xs text-gray-500">Expired Permits</div>
          <div className="mt-1 text-2xl font-bold" style={{ color: THEME.amber }}>{PERMITS.filter((p) => p.status === 'Expired').length}</div>
        </div>
      </div>
    </div>
  );
}
