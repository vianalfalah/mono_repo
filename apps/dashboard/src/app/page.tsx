import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@mono/ui'
import { Badge } from '@mono/ui'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Projects', value: '12', change: '+2 this month' },
    { label: 'Total Views', value: '8.4K', change: '+18% from last month' },
    { label: 'Visitors', value: '1.2K', change: '+5% from last week' },
    { label: 'Avg. Session', value: '4m 32s', change: '+12s from last week' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Top Navigation */}
      <nav className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Home
            </Link>
            <h1 className="text-xl font-bold">Analytics Dashboard</h1>
          </div>
          <Badge variant="outline">Live Demo</Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Daily visitors for the past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {[
                  { day: 'Mon', value: 65 },
                  { day: 'Tue', value: 45 },
                  { day: 'Wed', value: 78 },
                  { day: 'Thu', value: 52 },
                  { day: 'Fri', value: 85 },
                  { day: 'Sat', value: 92 },
                  { day: 'Sun', value: 70 },
                ].map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary rounded-t-md transition-all hover:opacity-80"
                      style={{ height: `${item.value * 2}px` }}
                    />
                    <span className="text-xs text-muted-foreground">{item.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects by Status */}
          <Card>
            <CardHeader>
              <CardTitle>Projects Status</CardTitle>
              <CardDescription>Distribution of project statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { status: 'Live', count: 8, color: 'bg-green-500' },
                  { status: 'In Progress', count: 3, color: 'bg-yellow-500' },
                  { status: 'Planned', count: 1, color: 'bg-slate-500' },
                ].map((item) => (
                  <div key={item.status} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-muted-foreground">{item.status}</div>
                    <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-500`}
                        style={{ width: `${(item.count / 12) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-sm font-medium">{item.count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { project: 'Landing Page', action: 'Deployed to production', time: '2 hours ago' },
                { project: 'Dashboard', action: 'Added new chart component', time: '5 hours ago' },
                { project: 'Game 2048', action: 'Fixed mobile responsiveness', time: '1 day ago' },
                { project: 'Portfolio', action: 'Updated project descriptions', time: '2 days ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <div className="font-medium">{activity.project}</div>
                    <div className="text-sm text-muted-foreground">{activity.action}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
