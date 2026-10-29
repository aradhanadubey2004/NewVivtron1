import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Command,
  Check,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Maximize2,
  Minimize2,
  Phone,
  Mail,
  Calendar,
  Layers,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface TeamMemberNode {
  id: string;
  name: string;
  role: string;
  level: number;
  earnings: string;
  directReferralsCount?: number;
  initials?: string;
  isRootLogo?: boolean;
  active: boolean;
  email?: string;
  phone?: string;
  joinDate?: string;
  children?: TeamMemberNode[];
}

export const TeamTreeView: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [selectedMember, setSelectedMember] = useState<TeamMemberNode | null>(null);

  // Complete 44-Member Team Hierarchy compiled from all user screenshots
  const fullTeamHierarchy: TeamMemberNode = useMemo(() => ({
    id: 'VT000001',
    name: 'NAVODAYA GROWTH PVT.LTD',
    role: 'Pre Sales Executive',
    level: 0,
    earnings: '₹0',
    directReferralsCount: 2,
    isRootLogo: true,
    active: true,
    email: 'info@navodayagrowth.com',
    phone: '+91 98765 43210',
    joinDate: '01-08-2026',
    children: [
      // ================= BRANCH 1: Priya kesarwani (Level 1) =================
      {
        id: 'VT000002',
        name: 'Priya kesarwani',
        role: 'Sales Executive',
        level: 1,
        earnings: '₹0',
        directReferralsCount: 3,
        initials: 'PK',
        active: true,
        email: 'divyanshukumar853@gmail.com',
        phone: '+91 98111 22334',
        joinDate: '09-08-2026',
        children: [
          {
            id: 'VT000006',
            name: 'suraj kesarwani',
            role: 'Pre Sales Executive',
            level: 2,
            earnings: '₹0',
            initials: 'SK',
            active: true,
            email: 'suraj.k@vivtron.com',
            phone: '+91 98222 33445',
            joinDate: '10-08-2026',
          },
          {
            id: 'VT000007',
            name: 'vaishnavi kesarwani',
            role: 'Pre Sales Executive',
            level: 2,
            earnings: '₹0',
            initials: 'VK',
            active: true,
            email: 'vaishnavi.k@vivtron.com',
            phone: '+91 98333 44556',
            joinDate: '11-08-2026',
          },
          {
            id: 'VT000029',
            name: 'Rashmi k 2026',
            role: 'Pre Sales Executive',
            level: 2,
            earnings: '₹0',
            initials: 'RK',
            active: true,
            email: 'rashmi.k@vivtron.com',
            phone: '+91 98444 55667',
            joinDate: '14-08-2026',
          },
        ],
      },

      // ================= BRANCH 2: Garima (Level 1) =================
      {
        id: 'VT000008',
        name: 'Garima',
        role: 'Pre Sales Executive',
        level: 1,
        earnings: '₹0',
        directReferralsCount: 2,
        initials: 'G',
        active: true,
        email: 'garimagarima766@gmail.com',
        phone: '+91 98555 66778',
        joinDate: '12-08-2026',
        children: [
          // ---------------- SUB-BRANCH 2A: Arvind Kumar (Level 2) ----------------
          {
            id: 'VT000011',
            name: 'Arvind Kumar',
            role: 'Sales Executive',
            level: 2,
            earnings: '₹0',
            directReferralsCount: 5,
            initials: 'AK',
            active: true,
            email: 'arvind.kumar@vivtron.com',
            phone: '+91 98666 77889',
            joinDate: '13-08-2026',
            children: [
              // Uday Bhan -> Narendra Pal Singh -> Geeta yadav
              {
                id: 'VT000013',
                name: 'Uday Bhan',
                role: 'Pre Sales Executive',
                level: 3,
                earnings: '₹0',
                directReferralsCount: 1,
                initials: 'UB',
                active: true,
                email: 'uday.bhan@vivtron.com',
                phone: '+91 98777 88990',
                joinDate: '15-08-2026',
                children: [
                  {
                    id: 'VT000014',
                    name: 'Narendra Pal Singh',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    directReferralsCount: 1,
                    initials: 'NP',
                    active: true,
                    email: 'narendra.singh@vivtron.com',
                    phone: '+91 98888 99001',
                    joinDate: '17-08-2026',
                    children: [
                      {
                        id: 'VT000016',
                        name: 'Geeta yadav',
                        role: 'Pre Sales Executive',
                        level: 5,
                        earnings: '₹0',
                        initials: 'GY',
                        active: true,
                        email: 'geeta.yadav@vivtron.com',
                        phone: '+91 98999 00112',
                        joinDate: '20-08-2026',
                      },
                    ],
                  },
                ],
              },

              // Bhante Sumit Ratan -> Utkarsh Gautam
              {
                id: 'VT000015',
                name: 'Bhante Sumit Ratan',
                role: 'Pre Sales Executive',
                level: 3,
                earnings: '₹0',
                directReferralsCount: 1,
                initials: 'BS',
                active: true,
                email: 'bhante.sumit@vivtron.com',
                phone: '+91 98123 45678',
                joinDate: '16-08-2026',
                children: [
                  {
                    id: 'VT000018',
                    name: 'Utkarsh Gautam',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'UG',
                    active: true,
                    email: 'utkarsh.g@vivtron.com',
                    phone: '+91 98234 56789',
                    joinDate: '18-08-2026',
                  },
                ],
              },

              // Namita Kumari
              {
                id: 'VT000017',
                name: 'Namita Kumari',
                role: 'Pre Sales Executive',
                level: 3,
                earnings: '₹0',
                initials: 'NK',
                active: true,
                email: 'namita.k@vivtron.com',
                phone: '+91 98345 67890',
                joinDate: '16-08-2026',
              },

              // Ajay Kumar Dimpal
              {
                id: 'VT000051',
                name: 'Ajay Kumar Dimpal',
                role: 'Pre Sales Executive',
                level: 3,
                earnings: '₹0',
                initials: 'AD',
                active: true,
                email: 'ajay.dimpal@vivtron.com',
                phone: '+91 98456 01234',
                joinDate: '18-08-2026',
              },

              // SS ASSOCIATS (Level 3) -> 11 Direct Referrals
              {
                id: 'VT000026',
                name: 'SS ASSOCIATS',
                role: 'Sales Executive',
                level: 3,
                earnings: '₹0',
                directReferralsCount: 11,
                initials: 'SA',
                active: true,
                email: 'ss.associates@vivtron.com',
                phone: '+91 98567 12345',
                joinDate: '15-08-2026',
                children: [
                  // 1. Arvind Kumar Sonkar (3 direct referrals)
                  {
                    id: 'VT000027',
                    name: 'Arvind Kumar Sonkar',
                    role: 'Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    directReferralsCount: 3,
                    initials: 'AK',
                    active: true,
                    email: 'arvind.sonkar@vivtron.com',
                    phone: '+91 98678 23456',
                    joinDate: '17-08-2026',
                    children: [
                      {
                        id: 'VT000031',
                        name: 'Virendra Kumar Verma',
                        role: 'Pre Sales Executive',
                        level: 5,
                        earnings: '₹0',
                        initials: 'VK',
                        active: true,
                        email: 'virendra.verma@vivtron.com',
                        phone: '+91 98789 34567',
                        joinDate: '19-08-2026',
                      },
                      {
                        id: 'VT000032',
                        name: 'Anushri Srivastava',
                        role: 'Pre Sales Executive',
                        level: 5,
                        earnings: '₹0',
                        initials: 'AS',
                        active: true,
                        email: 'anushri.s@vivtron.com',
                        phone: '+91 98890 45678',
                        joinDate: '19-08-2026',
                      },
                      {
                        id: 'VT000033',
                        name: 'Anoop Thapa',
                        role: 'Pre Sales Executive',
                        level: 5,
                        earnings: '₹0',
                        directReferralsCount: 1,
                        initials: 'AT',
                        active: true,
                        email: 'anoop.thapa@vivtron.com',
                        phone: '+91 98901 56789',
                        joinDate: '20-08-2026',
                        children: [
                          {
                            id: 'VT000034',
                            name: 'Akbar Hussain Ansari',
                            role: 'Pre Sales Executive',
                            level: 6,
                            earnings: '₹0',
                            initials: 'AH',
                            active: true,
                            email: 'akbar.ansari@vivtron.com',
                            phone: '+91 98012 67890',
                            joinDate: '22-08-2026',
                          },
                        ],
                      },
                    ],
                  },

                  // 2. Ashish Kumar Maurya
                  {
                    id: 'VT000030',
                    name: 'Ashish Kumar Maurya',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'AK',
                    active: true,
                    email: 'ashish.maurya@vivtron.com',
                    phone: '+91 98123 78901',
                    joinDate: '17-08-2026',
                  },

                  // 3. Priyanshi Verama (2 direct referrals)
                  {
                    id: 'VT000035',
                    name: 'Priyanshi Verama',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    directReferralsCount: 2,
                    initials: 'PV',
                    active: true,
                    email: 'priyanshi.verma@vivtron.com',
                    phone: '+91 98234 89012',
                    joinDate: '18-08-2026',
                    children: [
                      {
                        id: 'VT000046',
                        name: 'Virendra Kumar',
                        role: 'Pre Sales Executive',
                        level: 5,
                        earnings: '₹0',
                        initials: 'VK',
                        active: true,
                        email: 'virendra.k@vivtron.com',
                        phone: '+91 98345 90123',
                        joinDate: '20-08-2026',
                      },
                      {
                        id: 'VT000047',
                        name: 'Amit Kumar',
                        role: 'Pre Sales Executive',
                        level: 5,
                        earnings: '₹0',
                        initials: 'AK',
                        active: true,
                        email: 'amit.k@vivtron.com',
                        phone: '+91 98456 01234',
                        joinDate: '21-08-2026',
                      },
                    ],
                  },

                  // 4. GYAN CHAND BHARTI
                  {
                    id: 'VT000036',
                    name: 'GYAN CHAND BHARTI',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'GC',
                    active: true,
                    email: 'gyanchand.b@vivtron.com',
                    phone: '+91 98567 11223',
                    joinDate: '18-08-2026',
                  },

                  // 5. SANDEEP KUMAR GAUTAM
                  {
                    id: 'VT000037',
                    name: 'SANDEEP KUMAR GAUTAM',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'SK',
                    active: true,
                    email: 'sandeep.gautam@vivtron.com',
                    phone: '+91 98678 22334',
                    joinDate: '18-08-2026',
                  },

                  // 6. VIPIN KUMAR
                  {
                    id: 'VT000038',
                    name: 'VIPIN KUMAR',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'VK',
                    active: true,
                    email: 'vipin.kumar@vivtron.com',
                    phone: '+91 98789 33445',
                    joinDate: '18-08-2026',
                  },

                  // 7. AMRENDRA SINGH
                  {
                    id: 'VT000039',
                    name: 'AMRENDRA SINGH',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'AS',
                    active: true,
                    email: 'amrendra.singh@vivtron.com',
                    phone: '+91 98890 44556',
                    joinDate: '19-08-2026',
                  },

                  // 8. Ajay Kumar Raaz
                  {
                    id: 'VT000040',
                    name: 'Ajay Kumar Raaz',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'AK',
                    active: true,
                    email: 'ajay.raaz@vivtron.com',
                    phone: '+91 98901 55667',
                    joinDate: '19-08-2026',
                  },

                  // 9. Amar Bahadur (1 direct referral -> SURAJ KUMAR BHARTI)
                  {
                    id: 'VT000041',
                    name: 'Amar Bahadur',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    directReferralsCount: 1,
                    initials: 'AB',
                    active: true,
                    email: 'amar.bahadur@vivtron.com',
                    phone: '+91 98012 66778',
                    joinDate: '19-08-2026',
                    children: [
                      {
                        id: 'VT000042',
                        name: 'SURAJ KUMAR BHARTI',
                        role: 'Pre Sales Executive',
                        level: 5,
                        earnings: '₹0',
                        initials: 'SK',
                        active: true,
                        email: 'suraj.bharti@vivtron.com',
                        phone: '+91 98123 77889',
                        joinDate: '21-08-2026',
                      },
                    ],
                  },

                  // 10. PRABHAT KUMAR
                  {
                    id: 'VT000043',
                    name: 'PRABHAT KUMAR',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'PK',
                    active: true,
                    email: 'prabhat.kumar@vivtron.com',
                    phone: '+91 98234 88990',
                    joinDate: '20-08-2026',
                  },

                  // 11. GHANSHYAM
                  {
                    id: 'VT000045',
                    name: 'GHANSHYAM',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'G',
                    active: true,
                    email: 'ghanshyam@vivtron.com',
                    phone: '+91 98345 99001',
                    joinDate: '20-08-2026',
                  },

                  // 12. Ram Singhasan Pream
                  {
                    id: 'VT000052',
                    name: 'Ram Singhasan Pream',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'RS',
                    active: true,
                    email: 'ram.singhasan@vivtron.com',
                    phone: '+91 98456 00112',
                    joinDate: '21-08-2026',
                  },
                ],
              },
            ],
          },

          // ---------------- SUB-BRANCH 2B: Richa Bhaskar (Level 2) ----------------
          {
            id: 'VT000012',
            name: 'Richa Bhaskar',
            role: 'Sales Executive',
            level: 2,
            earnings: '₹0',
            directReferralsCount: 3,
            initials: 'RB',
            active: true,
            email: 'richa.bhaskar@vivtron.com',
            phone: '+91 98456 78901',
            joinDate: '13-08-2026',
            children: [
              // Poonam Prasad
              {
                id: 'VT000019',
                name: 'Poonam Prasad',
                role: 'Pre Sales Executive',
                level: 3,
                earnings: '₹0',
                initials: 'PP',
                active: true,
                email: 'poonam.p@vivtron.com',
                phone: '+91 98567 89012',
                joinDate: '17-08-2026',
              },

              // Samundra Devi (Level 3) -> Modh Islam Rahmani -> Kapil Dev -> (Ajay Bhardwaj, Shakuntala Gautam -> Geeta Kushwaha)
              {
                id: 'VT000020',
                name: 'Samundra Devi',
                role: 'Pre Sales Executive',
                level: 3,
                earnings: '₹0',
                directReferralsCount: 1,
                initials: 'SD',
                active: true,
                email: 'samundra.devi@vivtron.com',
                phone: '+91 98678 90123',
                joinDate: '18-08-2026',
                children: [
                  {
                    id: 'VT000021',
                    name: 'Modh Islam Rahmani',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    directReferralsCount: 1,
                    initials: 'MI',
                    active: true,
                    email: 'islam.rahmani@vivtron.com',
                    phone: '+91 98789 01234',
                    joinDate: '21-08-2026',
                    children: [
                      {
                        id: 'VT000022',
                        name: 'Kapil Dev',
                        role: 'Pre Sales Executive',
                        level: 5,
                        earnings: '₹0',
                        directReferralsCount: 2,
                        initials: 'KD',
                        active: true,
                        email: 'kapil.dev@vivtron.com',
                        phone: '+91 98890 12345',
                        joinDate: '22-08-2026',
                        children: [
                          {
                            id: 'VT000023',
                            name: 'Ajay Kumar Bhardwaj',
                            role: 'Pre Sales Executive',
                            level: 6,
                            earnings: '₹0',
                            initials: 'AK',
                            active: true,
                            email: 'ajay.bhardwaj@vivtron.com',
                            phone: '+91 98901 23456',
                            joinDate: '23-08-2026',
                          },
                          {
                            id: 'VT000028',
                            name: 'Shakuntala Gautam',
                            role: 'Pre Sales Executive',
                            level: 6,
                            earnings: '₹0',
                            directReferralsCount: 1,
                            initials: 'SG',
                            active: true,
                            email: 'shakuntala.g@vivtron.com',
                            phone: '+91 98012 34567',
                            joinDate: '24-08-2026',
                            children: [
                              {
                                id: 'VT000044',
                                name: 'Geeta Kushwaha',
                                role: 'Pre Sales Executive',
                                level: 7,
                                earnings: '₹0',
                                initials: 'GK',
                                active: true,
                                email: 'geeta.kushwaha@vivtron.com',
                                phone: '+91 98123 45670',
                                joinDate: '25-08-2026',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Moti Kunwar Ahirwar (Level 3) -> Pushpa Devi (Level 4)
              {
                id: 'VT000024',
                name: 'Moti Kunwar Ahirwar',
                role: 'Pre Sales Executive',
                level: 3,
                earnings: '₹0',
                directReferralsCount: 1,
                initials: 'MK',
                active: true,
                email: 'moti.kunwar@vivtron.com',
                phone: '+91 98890 12345',
                joinDate: '19-08-2026',
                children: [
                  {
                    id: 'VT000025',
                    name: 'Pushpa Devi',
                    role: 'Pre Sales Executive',
                    level: 4,
                    earnings: '₹0',
                    initials: 'PD',
                    active: true,
                    email: 'pushpa.devi@vivtron.com',
                    phone: '+91 98901 23456',
                    joinDate: '22-08-2026',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }), []);

  // State to manage node expansion (all major parent branches expanded by default)
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    VT000001: true,
    VT000002: true,
    VT000008: true,
    VT000011: true,
    VT000012: true,
    VT000013: true,
    VT000014: true,
    VT000015: true,
    VT000020: true,
    VT000021: true,
    VT000022: true,
    VT000024: true,
    VT000026: true,
    VT000027: true,
    VT000028: true,
    VT000033: true,
    VT000035: true,
    VT000041: true,
  });

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const expandAll = () => {
    const allIds: Record<string, boolean> = {};
    const traverse = (node: TeamMemberNode) => {
      allIds[node.id] = true;
      node.children?.forEach(traverse);
    };
    traverse(fullTeamHierarchy);
    setExpandedNodes(allIds);
  };

  const collapseAll = () => {
    setExpandedNodes({ VT000001: true });
  };

  // Count total members recursively
  const totalCount = useMemo(() => {
    let count = 0;
    const traverse = (node: TeamMemberNode) => {
      count++;
      node.children?.forEach(traverse);
    };
    traverse(fullTeamHierarchy);
    return count;
  }, [fullTeamHierarchy]);

  // Render individual tree card matching Screenshots 1 - 10 exactly
  const renderCard = (node: TeamMemberNode) => {
    const isExpanded = !!expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const isMatched = searchQuery
      ? node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.role.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    const isLevelMatch = levelFilter === 'All' || node.level.toString() === levelFilter;

    return (
      <div key={node.id} className="flex flex-col items-center select-none">
        {/* Direct referrals badge above node if children exist (matching all screenshots) */}
        {node.directReferralsCount && node.directReferralsCount > 0 && (
          <div className="mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/95 border border-slate-300 shadow-2xs text-[10px] font-bold text-slate-500 tracking-tight">
              {node.directReferralsCount} direct referrals
            </span>
          </div>
        )}

        {/* Tree Card Box */}
        <div
          onClick={() => setSelectedMember(node)}
          className={`relative pt-7 pb-4 px-4 w-[215px] sm:w-[230px] rounded-[18px] bg-white border border-[#E2E8F0] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-200 cursor-pointer ${
            isMatched
              ? 'ring-2 ring-emerald-500 shadow-emerald-100 scale-105'
              : !isLevelMatch && searchQuery === ''
              ? 'opacity-40 hover:opacity-100'
              : ''
          }`}
        >
          {/* Top Emerald Green Accent Border matching Screenshots */}
          <div className="absolute top-0 inset-x-5 h-[3px] rounded-t-full bg-[#0D8A72]"></div>

          {/* Overlapping Circular Avatar */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center">
            {node.isRootLogo ? (
              <div className="w-11 h-11 rounded-full bg-white border-2 border-[#5B9BD5] shadow-sm flex items-center justify-center overflow-hidden p-0.5">
                {/* Vivtron EVCS Logo as in Screenshot 1 */}
                <div className="w-full h-full rounded-full bg-slate-50 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black leading-tight text-[#0A1D37]">
                    <span className="text-[#0D8A72]">V</span>E
                  </span>
                  <span className="text-[6px] font-bold text-slate-500 uppercase tracking-tighter">
                    VIVTRON
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#6EA8DC] shadow-sm flex items-center justify-center text-xs font-black text-[#1E4E8C] font-heading">
                {node.initials || node.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Active Emerald Status Dot on Top Right */}
          <div className="absolute top-3.5 right-4 w-2 h-2 rounded-full bg-[#10B981]"></div>

          {/* Card Body */}
          <div className="flex flex-col items-center text-center space-y-1">
            {/* Member Name */}
            <h3
              className="text-xs sm:text-[13px] font-black text-[#0A2540] tracking-tight truncate max-w-[190px]"
              title={node.name}
            >
              {node.name}
            </h3>

            {/* Code & Role */}
            <div className="text-[10.5px] font-medium text-slate-500 tracking-tight">
              {node.id} · {node.role}
            </div>

            {/* Earnings */}
            <div className="text-sm font-bold text-[#C27803] pt-0.5 font-sans">
              {node.earnings}
            </div>

            {/* Level Badge matching Screenshot 1-10 */}
            <div className="pt-1">
              <span className="px-3.5 py-0.5 rounded-full bg-[#EAF4FD] text-[#0284C7] font-extrabold text-[11px] tracking-wide inline-block shadow-2xs">
                Level {node.level}
              </span>
            </div>

            {/* Toggle Collapse/Expand Button if node has children */}
            {hasChildren && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                className="mt-2 text-[10px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition"
              >
                <span>{isExpanded ? 'Collapse' : `Expand (${node.children?.length})`}</span>
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}
          </div>
        </div>

        {/* Connectors & Sub-children */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col items-center w-full">
            {/* Vertical connector down from parent card */}
            <div className="w-[1.5px] h-8 bg-[#8CB6D9]"></div>

            {/* Horizontal Branch Bar */}
            <div className="relative flex justify-center w-full">
              {node.children!.length > 1 && (
                <div
                  className="absolute top-0 h-[1.5px] bg-[#8CB6D9]"
                  style={{
                    left: `${100 / (node.children!.length * 2)}%`,
                    right: `${100 / (node.children!.length * 2)}%`,
                  }}
                ></div>
              )}

              {/* Children Row */}
              <div className="flex items-start justify-center gap-6 sm:gap-10 pt-8">
                {node.children!.map((child) => (
                  <div key={child.id} className="relative flex flex-col items-center">
                    {/* Top connector bar to parent horizontal line */}
                    <div className="absolute -top-8 w-[1.5px] h-8 bg-[#8CB6D9]"></div>
                    {renderCard(child)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* ================= PAGE HEADER MATCHING SCREENSHOT 1 ================= */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-[#0D8A72] uppercase tracking-wider font-mono mb-1">
            VIVTRON EVCS - WORKSPACE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1D37] font-heading tracking-tight">
            Team Tree
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your referral network, team levels, and multilevel partner hierarchy across all 7 levels.
          </p>
        </div>

        {/* Top-Right Badge: Network live */}
        <div className="self-start">
          <span className="px-3.5 py-1.5 rounded-full bg-[#EBF7F2] text-[#0D8A72] border border-[#A7E3CD] text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0D8A72] animate-pulse"></span>
            <span>Network live</span>
          </span>
        </div>
      </div>

      {/* ================= 4 METRIC CARDS MATCHING SCREENSHOT 1 ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total members */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold shrink-0">
            <Command className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Total members</div>
            <div className="text-2xl font-black text-[#0A1D37] font-mono leading-tight mt-0.5">
              {totalCount}
            </div>
          </div>
        </div>

        {/* Card 2: Active members */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold shrink-0">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Active members</div>
            <div className="text-2xl font-black text-[#0A1D37] font-mono leading-tight mt-0.5">
              {totalCount}
            </div>
          </div>
        </div>

        {/* Card 3: Team incentive */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold shrink-0 text-xl font-mono">
            ₹
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Team incentive</div>
            <div className="text-2xl font-black text-[#0A1D37] font-mono leading-tight mt-0.5">
              ₹0
            </div>
          </div>
        </div>

        {/* Card 4: Direct referrals */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold shrink-0">
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Direct referrals</div>
            <div className="text-2xl font-black text-[#0A1D37] font-mono leading-tight mt-0.5">
              2
            </div>
          </div>
        </div>
      </div>

      {/* ================= REFERRAL NETWORK TREE CONTAINER ================= */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Network Header with Controls, Filter & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0A1D37] font-heading">
              Referral network
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Each connector shows a direct sponsor relationship.
            </p>
          </div>

          {/* Action Tools & Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Level Filter Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-bold text-slate-700 text-xs"
              >
                <option value="All">All Levels (0 - 7)</option>
                <option value="0">Level 0</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
                <option value="5">Level 5</option>
                <option value="6">Level 6</option>
                <option value="7">Level 7</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search member or VT ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 bg-white placeholder:text-slate-400 outline-none w-44 sm:w-52 focus:border-[#0D8A72]"
              />
            </div>

            {/* Expand / Collapse All */}
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand All</span>
            </button>

            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </button>
          </div>
        </div>

        {/* Legend Row matching Screenshot 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#8CB6D9]"></span>
              <span className="text-slate-600 font-medium">Sponsor relationship</span>
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 font-medium">Active member</span>
            </span>

            <span className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-[#EAF4FD] text-[#0284C7] font-bold text-[10px]">
                7 Depth Levels
              </span>
            </span>
          </div>

          <div className="font-semibold text-slate-600">
            Showing {totalCount} members
          </div>
        </div>

        {/* Tree Canvas with Horizontal Scroll */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#F6F9FD]/60 border border-slate-200/80 overflow-x-auto min-h-[440px] flex justify-center">
          <div className="inline-flex justify-center min-w-max">
            {renderCard(fullTeamHierarchy)}
          </div>
        </div>
      </div>

      {/* Member Details Popover Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAF4FD] text-[#0284C7] font-bold text-xs">
                  Level {selectedMember.level}
                </span>
                <h3 className="text-lg font-black text-[#0A2540] mt-1.5">
                  {selectedMember.name}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  {selectedMember.id} · {selectedMember.role}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active Member
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Incentive / Earnings</span>
                <span className="font-extrabold text-[#C27803] font-sans">
                  {selectedMember.earnings}
                </span>
              </div>
              {selectedMember.directReferralsCount !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Direct Referrals</span>
                  <span className="font-bold text-slate-800">
                    {selectedMember.directReferralsCount}
                  </span>
                </div>
              )}
              {selectedMember.email && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium text-slate-700 truncate max-w-[180px]">
                    {selectedMember.email}
                  </span>
                </div>
              )}
              {selectedMember.joinDate && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Join Date</span>
                  <span className="font-mono text-slate-700">{selectedMember.joinDate}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="w-full py-2.5 rounded-xl bg-[#0D8A72] hover:bg-[#0A735E] text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
