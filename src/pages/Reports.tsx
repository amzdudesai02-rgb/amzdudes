import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Calendar, 
  Download, 
  Send, 
  Clock,
  CheckCircle2,
  Plus
} from 'lucide-react';

const mockReports = [
  {
    id: '1',
    name: 'Weekly Snapshot - NaturaCare Supplements',
    type: 'Weekly',
    client: 'NaturaCare Supplements',
    status: 'sent',
    sentDate: '2026-01-10',
    scheduledDate: null,
  },
  {
    id: '2',
    name: 'Monthly Business Review - January 2026',
    type: 'Monthly',
    client: 'TechGear Pro',
    status: 'scheduled',
    sentDate: null,
    scheduledDate: '2026-02-01',
  },
  {
    id: '3',
    name: 'Weekly Snapshot - HomeStyle Living',
    type: 'Weekly',
    client: 'HomeStyle Living',
    status: 'draft',
    sentDate: null,
    scheduledDate: null,
  },
  {
    id: '4',
    name: 'Quarterly Strategic Review - Q4 2025',
    type: 'Quarterly',
    client: 'Seoul Snacks Co',
    status: 'sent',
    sentDate: '2026-01-05',
    scheduledDate: null,
  },
];

const Reports = () => {
  return (
    <AppLayout 
      title="Reports" 
      subtitle="Generate and manage client reports"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Reports Sent This Month</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Scheduled Reports</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Time Saved (est.)</CardDescription>
            <CardTitle className="text-3xl">48 hrs</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Reports</h2>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {mockReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.client}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{report.type}</Badge>
                  <Badge 
                    variant={
                      report.status === 'sent' ? 'default' : 
                      report.status === 'scheduled' ? 'secondary' : 'outline'
                    }
                    className={
                      report.status === 'sent' ? 'bg-success text-success-foreground' :
                      report.status === 'scheduled' ? 'bg-primary/10 text-primary' : ''
                    }
                  >
                    {report.status === 'sent' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {report.status === 'scheduled' && <Clock className="w-3 h-3 mr-1" />}
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {report.sentDate || report.scheduledDate}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default Reports;
