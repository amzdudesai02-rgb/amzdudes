import { AppLayout } from '@/components/layout/AppLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ClientList } from '@/components/dashboard/ClientList';
import { AlertList } from '@/components/dashboard/AlertList';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { OpportunityCards } from '@/components/dashboard/OpportunityCards';
import { 
  mockClients, 
  mockAlerts, 
  mockActivities, 
  mockOpportunities,
  mockDashboardMetrics 
} from '@/data/mockData';
import { 
  Users, 
  DollarSign, 
  Heart, 
  Bell, 
  TrendingUp,
  CheckCircle2,
  Briefcase,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  // Sort clients by health score for at-risk display
  const atRiskClients = [...mockClients]
    .filter(c => c.healthStatus === 'warning' || c.healthStatus === 'critical')
    .sort((a, b) => a.healthScore - b.healthScore);

  // Get critical and warning alerts only
  const urgentAlerts = mockAlerts.filter(a => a.severity === 'critical' || a.severity === 'warning');

  return (
    <AppLayout 
      title="Dashboard" 
      subtitle="Welcome back, John. Here's what's happening with your agency."
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Clients"
          value={mockDashboardMetrics.totalClients}
          change={{ value: '+3 this month', positive: true }}
          icon={Users}
          variant="primary"
        />
        <MetricCard
          title="Monthly Recurring Revenue"
          value={formatCurrency(mockDashboardMetrics.totalMRR)}
          change={{ value: '+12% vs last month', positive: true }}
          icon={DollarSign}
          variant="success"
        />
        <MetricCard
          title="Avg Health Score"
          value={`${mockDashboardMetrics.avgHealthScore}%`}
          change={{ value: '-2% vs last week', positive: false }}
          icon={Heart}
          variant="default"
        />
        <MetricCard
          title="Active Alerts"
          value={mockDashboardMetrics.activeAlerts}
          change={{ value: `${mockDashboardMetrics.resolvedAlerts7Days} resolved this week`, positive: true }}
          icon={Bell}
          variant={mockDashboardMetrics.activeAlerts > 10 ? 'danger' : 'warning'}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Revenue Generated (30d)"
          value={formatCurrency(mockDashboardMetrics.revenueGenerated30Days)}
          icon={TrendingUp}
        />
        <MetricCard
          title="Opportunities Pipeline"
          value={mockDashboardMetrics.opportunitiesPipeline}
          change={{ value: '$127K potential', positive: true }}
          icon={Briefcase}
        />
        <MetricCard
          title="Team Utilization"
          value={`${mockDashboardMetrics.teamUtilization}%`}
          icon={BarChart3}
        />
        <MetricCard
          title="Alerts Resolved (7d)"
          value={mockDashboardMetrics.resolvedAlerts7Days}
          icon={CheckCircle2}
          variant="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Clients & Alerts */}
        <div className="xl:col-span-2 space-y-8">
          {/* At-Risk Clients */}
          {atRiskClients.length > 0 && (
            <ClientList 
              clients={atRiskClients} 
              title="⚠️ Clients Needing Attention" 
            />
          )}

          {/* Urgent Alerts */}
          <AlertList 
            alerts={urgentAlerts.slice(0, 5)} 
            title="Urgent Alerts" 
          />

          {/* All Clients */}
          <ClientList 
            clients={mockClients.slice(0, 6)} 
            title="All Clients" 
          />
        </div>

        {/* Right Column - Activity & Opportunities */}
        <div className="space-y-8">
          {/* Activity Feed */}
          <ActivityFeed activities={mockActivities} />

          {/* Growth Opportunities */}
          <OpportunityCards opportunities={mockOpportunities} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
