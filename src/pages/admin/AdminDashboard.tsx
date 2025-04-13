
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, FileText, Users, UserCheck, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";

// Mock data for charts
const userActivityData = [
  { month: 'Jan', active: 65, inactive: 12 },
  { month: 'Feb', active: 75, inactive: 15 },
  { month: 'Mar', active: 85, inactive: 18 },
  { month: 'Apr', active: 90, inactive: 20 },
  { month: 'May', active: 100, inactive: 22 },
  { month: 'Jun', active: 120, inactive: 25 },
];

const invoiceVolumeData = [
  { month: 'Jan', volume: 45 },
  { month: 'Feb', volume: 52 },
  { month: 'Mar', volume: 49 },
  { month: 'Apr', volume: 62 },
  { month: 'May', volume: 68 },
  { month: 'Jun', volume: 71 },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of system statistics and platform usage.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,482</div>
            <p className="text-xs text-muted-foreground mt-1">
              +180 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground mt-1">
              60.2% of total users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,395</div>
            <p className="text-xs text-muted-foreground mt-1">
              +1,124 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              System Health
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Uptime this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Active vs Inactive Users</CardTitle>
            <CardDescription>Monthly breakdown of user activity</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" name="Active Users" fill="#8884d8" />
                <Bar dataKey="inactive" name="Inactive Users" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Invoice Volume</CardTitle>
            <CardDescription>Monthly invoice creation trends</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={invoiceVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="volume" name="Invoice Volume" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>Recent system notifications and errors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-md border p-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <h4 className="font-semibold">High CPU Usage</h4>
                <p className="text-sm text-muted-foreground">Database server experiencing high CPU usage during peak hours. Monitoring situation.</p>
                <p className="text-xs text-muted-foreground mt-1">Today at 14:32</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-md border p-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <h4 className="font-semibold">Failed Login Attempts</h4>
                <p className="text-sm text-muted-foreground">Multiple failed login attempts detected from IP 192.168.1.155. Account locked temporarily.</p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday at 23:15</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
