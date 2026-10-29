export type Role = 'Admin' | 'Employee';

export interface User {
  id: number;
  employee_id: string;
  name: string;
  email: string;
  role: Role;
  designation?: string;
  department?: string;
  phone?: string;
  status: 'Active' | 'Inactive';
  created_at?: string;
  updated_at?: string;
}

export interface ChargingStation {
  id: number;
  station_code: string;
  name: string;
  location: string;
  city: string;
  type: string;
  power_output: string;
  connectors: string;
  status: 'Online' | 'In Use' | 'Maintenance' | 'Offline';
  total_sessions?: number;
  energy_dispensed_kwh?: number;
  uptime_pct?: number;
  last_inspected?: string;
  created_at?: string;
}

export interface Product {
  id: number;
  product_code: string;
  name: string;
  category: string;
  power_rating: string;
  price: number;
  stock_status: 'In Stock' | 'Pre-Order' | 'Built to Order';
  description?: string;
  specs?: string | Record<string, string>;
  created_at?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  assigned_to?: number;
  station_id?: number;
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed';
  due_date?: string;
  station_name?: string;
  station_code?: string;
  location?: string;
  city?: string;
  created_at?: string;
}

export interface Activity {
  id: number;
  user_id?: number;
  user_name?: string;
  user_role?: string;
  action: string;
  details?: string;
  timestamp: string;
}

export interface OverviewData {
  totalEmployees: number;
  activeEmployees: number;
  totalStations: number;
  onlineStations: number;
  totalProducts: number;
  pendingTasks: number;
  totalKwhDispensed: number;
  totalSessions: number;
  recentActivities: Activity[];
  stationStatusBreakdown: { status: string; count: number }[];
}

export interface NotificationItem {
  id: number;
  title: string;
  text: string;
  time: string;
  type: 'info' | 'warning' | 'success';
}

export interface EmployeeDashboardData {
  profile: User;
  stats: {
    totalAssigned: number;
    pendingTasksCount: number;
    inProgressTasksCount: number;
    completedTasksCount: number;
  };
  tasks: Task[];
  activeStations: ChargingStation[];
  notifications: NotificationItem[];
}
