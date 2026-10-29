import { User, ChargingStation, Product, Task, OverviewData, EmployeeDashboardData } from '../types';

const API_BASE = '/api';

export function getStoredToken(): string | null {
  return localStorage.getItem('vivtron_token');
}

export function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem('vivtron_token', token);
  } else {
    localStorage.removeItem('vivtron_token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Auth
  auth: {
    login: (identifier: string, password: string) =>
      request<{ success: boolean; token: string; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      }),
    me: () => request<{ success: boolean; user: User }>('/auth/me'),
    changePassword: (currentPassword: string, newPassword: string) =>
      request<{ success: boolean; message: string }>('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      }),
    register: (payload: { name: string; email: string; phone: string; sponsor_code?: string; password: string }) =>
      request<{ success: boolean; message: string; user?: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    forgotPassword: (identifier: string) =>
      request<{ success: boolean; message: string }>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ identifier }),
      }),
  },

  // Admin
  admin: {
    getOverview: () => request<{ success: boolean; data: OverviewData }>('/admin/overview'),
    getEmployees: () => request<{ success: boolean; data: User[] }>('/admin/employees'),
    createEmployee: (employeeData: Partial<User> & { password: string }) =>
      request<{ success: boolean; message: string }>('/admin/employees', {
        method: 'POST',
        body: JSON.stringify(employeeData),
      }),
    updateEmployee: (id: number, employeeData: Partial<User> & { password?: string }) =>
      request<{ success: boolean; message: string }>(`/admin/employees/${id}`, {
        method: 'PUT',
        body: JSON.stringify(employeeData),
      }),
    toggleEmployeeStatus: (id: number) =>
      request<{ success: boolean; message: string; status: 'Active' | 'Inactive' }>(`/admin/employees/${id}/status`, {
        method: 'PATCH',
      }),
    getStations: () => request<{ success: boolean; data: ChargingStation[] }>('/admin/stations'),
    createStation: (stationData: Partial<ChargingStation>) =>
      request<{ success: boolean; message: string }>('/admin/stations', {
        method: 'POST',
        body: JSON.stringify(stationData),
      }),
    updateStation: (id: number, stationData: Partial<ChargingStation>) =>
      request<{ success: boolean; message: string }>(`/admin/stations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(stationData),
      }),
    deleteStation: (id: number) =>
      request<{ success: boolean; message: string }>(`/admin/stations/${id}`, {
        method: 'DELETE',
      }),
    getProducts: () => request<{ success: boolean; data: Product[] }>('/admin/products'),
    createProduct: (productData: Partial<Product>) =>
      request<{ success: boolean; message: string }>('/admin/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      }),
    updateProduct: (id: number, productData: Partial<Product>) =>
      request<{ success: boolean; message: string }>(`/admin/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      }),
    deleteProduct: (id: number) =>
      request<{ success: boolean; message: string }>(`/admin/products/${id}`, {
        method: 'DELETE',
      }),
  },

  // Employee
  employee: {
    getDashboard: () => request<{ success: boolean; data: EmployeeDashboardData }>('/employee/dashboard'),
    getTasks: () => request<{ success: boolean; data: Task[] }>('/employee/tasks'),
    updateTaskStatus: (id: number, status: Task['status'], resolutionNote?: string) =>
      request<{ success: boolean; message: string }>(`/employee/tasks/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, resolutionNote }),
      }),
    getStations: () => request<{ success: boolean; data: ChargingStation[] }>('/employee/stations'),
    reportStationIssue: (stationId: number, issueTitle: string, description: string, severity = 'Medium') =>
      request<{ success: boolean; message: string }>(`/employee/stations/${stationId}/report-issue`, {
        method: 'POST',
        body: JSON.stringify({ issueTitle, description, severity }),
      }),
    getProducts: () => request<{ success: boolean; data: Product[] }>('/employee/products'),
    getProfile: () => request<{ success: boolean; data: User }>('/employee/profile'),
    updateProfile: (profileData: { phone?: string }) =>
      request<{ success: boolean; message: string }>('/employee/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),
  },

  // Public
  public: {
    getStations: () => request<{ success: boolean; data: ChargingStation[] }>('/public/stations'),
    getProducts: () => request<{ success: boolean; data: Product[] }>('/public/products'),
    getNetworkStats: () => request<{ success: boolean; data: { totalStations: number; activeStations: number; totalKwhDispensed: number; totalSessions: number; uptimePercentage: number } }>('/public/network-stats'),
    submitInquiry: (data: { type: string; name: string; email: string; phone?: string; message: string }) =>
      request<{ success: boolean; message: string }>('/public/inquiry', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};
