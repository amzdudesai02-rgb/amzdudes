// ClientMax Pro Types

export type ClientType = 'brand_owner' | 'reseller' | 'wholesaler' | 'product_launcher' | '3p_seller';

export type HealthStatus = 'excellent' | 'good' | 'warning' | 'critical';

export type AlertSeverity = 'critical' | 'warning' | 'opportunity';

export type AlertStatus = 'active' | 'acknowledged' | 'in_progress' | 'resolved' | 'snoozed';

export type UserRole = 'owner' | 'manager' | 'specialist' | 'client';

export interface Client {
  id: string;
  name: string;
  companyName: string;
  type: ClientType;
  healthScore: number;
  healthStatus: HealthStatus;
  revenue30Days: number;
  adSpend30Days: number;
  roas: number;
  assignedManager: string;
  package: string;
  mrr: number;
  lastContactDate: string;
  alertsActive: number;
  activeSince: string;
}

export interface Alert {
  id: string;
  clientId: string;
  clientName: string;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  createdAt: string;
  actionRequired: string;
  estimatedImpact?: string;
}

export interface Activity {
  id: string;
  clientId: string;
  type: 'optimization' | 'listing' | 'strategy' | 'alert_response' | 'report';
  title: string;
  description: string;
  impact?: string;
  timestamp: string;
  performedBy: string;
}

export interface Opportunity {
  id: string;
  clientId: string;
  clientName: string;
  type: 'quick_win' | 'medium_play' | 'big_opportunity';
  title: string;
  description: string;
  potentialRevenue: number;
  investment: string;
  timeline: string;
  status: 'identified' | 'pitched' | 'accepted' | 'declined' | 'deferred';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  activeClients: number;
}

export interface DashboardMetrics {
  totalClients: number;
  totalMRR: number;
  avgHealthScore: number;
  activeAlerts: number;
  resolvedAlerts7Days: number;
  revenueGenerated30Days: number;
  opportunitiesPipeline: number;
  teamUtilization: number;
}
