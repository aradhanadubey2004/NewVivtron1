import React, { useState } from 'react';
import { Users, Search, Copy, Check, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MyTeamView: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const referralCode = user?.employee_id || 'VT000001';
  const referralLink = `https://login.vivtronevcs.com/register?ref=${referralCode}`;

  // Direct team members matching screenshot 5 exactly
  const teamMembers = [
    {
      name: 'Priya kesarwani',
      email: 'divyanshukumar853@gmail.com',
      referralCode: 'VT000002',
      joinDate: '09-08-2026',
      status: 'Active',
      stationsCount: 4,
    },
    {
      name: 'Garima',
      email: 'garimagarima766@gmail.com',
      referralCode: 'VT000008',
      joinDate: '13-08-2026',
      status: 'Active',
      stationsCount: 2,
    },
  ];

  const filteredMembers = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 max-w-5xl mx-auto space-y-6">
        {/* Header & Search */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1D37] font-heading mb-6">
          Direct Team Members
        </h2>

        {/* Table Matching Screenshot 5 Exactly */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBF3FB] text-[11px] font-bold text-[#0A264D] uppercase tracking-wider font-mono border-b border-slate-200">
                <th className="py-3.5 px-5">NAME</th>
                <th className="py-3.5 px-5">EMAIL</th>
                <th className="py-3.5 px-5 font-mono">REFERRAL CODE</th>
                <th className="py-3.5 px-5">JOIN DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, idx) => (
                <tr
                  key={member.referralCode}
                  className={`border-b border-slate-100 hover:bg-slate-50 text-xs transition ${
                    idx % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                  }`}
                >
                  <td className="py-4 px-5 font-bold text-slate-900">{member.name}</td>
                  <td className="py-4 px-5 text-slate-600 font-medium">{member.email}</td>
                  <td className="py-4 px-5 font-mono font-extrabold text-[#0A1D37]">
                    {member.referralCode}
                  </td>
                  <td className="py-4 px-5 font-medium text-slate-600 font-mono">
                    {member.joinDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
