"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  MapPin,
  Award,
  Target,
  AlertCircle,
  Sparkles,
  Rocket,
  TrendingUpIcon,
  ShoppingCart,
  GraduationCap,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

const monthlySpendData = [
  { month: "Jan", total: 1850000, smme: 1420000, bwo: 1180000 },
  { month: "Feb", total: 1950000, smme: 1510000, bwo: 1250000 },
  { month: "Mar", total: 2100000, smme: 1650000, bwo: 1380000 },
  { month: "Apr", total: 1980000, smme: 1560000, bwo: 1300000 },
  { month: "May", total: 2150000, smme: 1720000, bwo: 1450000 },
  { month: "Jun", total: 2250000, smme: 1820000, bwo: 1550000 },
  { month: "Jul", total: 2200000, smme: 1780000, bwo: 1520000 },
  { month: "Aug", total: 2300000, smme: 1880000, bwo: 1620000 },
  { month: "Sep", total: 2350000, smme: 1920000, bwo: 1680000 },
  { month: "Oct", total: 2400000, smme: 1980000, bwo: 1740000 },
  { month: "Nov", total: 2450000, smme: 2030000, bwo: 1800000 },
  { month: "Dec", total: 2520000, smme: 2100000, bwo: 1860000 },
]

const supplierTypeData = [
  { name: "EME", value: 35, amount: 8400000 },
  { name: "QSE", value: 45, amount: 10800000 },
  { name: "Large", value: 20, amount: 4800000 },
]

const categorySpendData = [
  { category: "Equipment Supply", amount: 6500000 },
  { category: "Transport & Logistics", amount: 5200000 },
  { category: "Construction", amount: 4800000 },
  { category: "Maintenance", amount: 3800000 },
  { category: "Catering", amount: 2800000 },
  { category: "Security", amount: 2500000 },
  { category: "Professional Services", amount: 2400000 },
  { category: "Other", amount: 2000000 },
]

const geographicData = [
  { province: "Limpopo", suppliers: 342, spend: 6800000 },
  { province: "North West", suppliers: 298, spend: 5800000 },
  { province: "Gauteng", suppliers: 256, spend: 5200000 },
  { province: "Mpumalanga", suppliers: 187, spend: 4100000 },
  { province: "Northern Cape", suppliers: 164, spend: 3500000 },
]

const monthlySpendTrackingData = [
  { month: "Jan", actual: 1420000, target: 1500000, cumulative: 1420000, cumulativeTarget: 1500000 },
  { month: "Feb", actual: 1510000, target: 1500000, cumulative: 2930000, cumulativeTarget: 3000000 },
  { month: "Mar", actual: 1650000, target: 1550000, cumulative: 4580000, cumulativeTarget: 4550000 },
  { month: "Apr", actual: 1560000, target: 1500000, cumulative: 6140000, cumulativeTarget: 6050000 },
  { month: "May", actual: 1720000, target: 1600000, cumulative: 7860000, cumulativeTarget: 7650000 },
  { month: "Jun", actual: 1820000, target: 1700000, cumulative: 9680000, cumulativeTarget: 9350000 },
  { month: "Jul", actual: 1780000, target: 1650000, cumulative: 11460000, cumulativeTarget: 11000000 },
  { month: "Aug", actual: 1880000, target: 1750000, cumulative: 13340000, cumulativeTarget: 12750000 },
  { month: "Sep", actual: 1920000, target: 1800000, cumulative: 15260000, cumulativeTarget: 14550000 },
  { month: "Oct", actual: 1980000, target: 1850000, cumulative: 17240000, cumulativeTarget: 16400000 },
  { month: "Nov", actual: 2030000, target: 1900000, cumulative: 19270000, cumulativeTarget: 18300000 },
  { month: "Dec", actual: 0, target: 1950000, cumulative: 19270000, cumulativeTarget: 20250000 },
]

const currentMonthIndex = 10 // November (0-indexed)
const currentMonthData = monthlySpendTrackingData[currentMonthIndex]

const COLORS = [
  "hsl(190, 85%, 50%)", // Cyan - matches Bauba branding
  "hsl(220, 85%, 60%)", // Blue
  "hsl(280, 65%, 60%)", // Purple
  "hsl(160, 70%, 50%)", // Teal
  "hsl(35, 85%, 55%)", // Orange
  "hsl(340, 75%, 55%)", // Pink
  "hsl(140, 60%, 50%)", // Green
  "hsl(25, 80%, 55%)", // Red-Orange
]

const journeyStageData = [
  {
    stage: "Foundation\n(Incubation)",
    count: 45,
    percentage: 9,
    description: "Early stage - ideation & setup",
    icon: Sparkles,
    color: "#22d3ee",
  },
  {
    stage: "Growth\n(Acceleration)",
    count: 128,
    percentage: 26,
    description: "Established with proven revenue",
    icon: Rocket,
    color: "#10b981",
  },
  {
    stage: "Advance\n(Scaling)",
    count: 156,
    percentage: 31,
    description: "High-growth potential",
    icon: TrendingUpIcon,
    color: "#f59e0b",
  },
  {
    stage: "Take-off\n(Integration)",
    count: 134,
    percentage: 27,
    description: "Integrated into supply chain",
    icon: ShoppingCart,
    color: "#8b5cf6",
  },
  {
    stage: "Exit\n(Independence)",
    count: 37,
    percentage: 7,
    description: "Fully independent",
    icon: GraduationCap,
    color: "#ef4444",
  },
]

const journeyProgressionData = [
  { month: "Jan", foundation: 48, growth: 115, advance: 142, takeoff: 128, exit: 32 },
  { month: "Feb", foundation: 50, growth: 118, advance: 145, takeoff: 130, exit: 33 },
  { month: "Mar", foundation: 47, growth: 122, advance: 148, takeoff: 131, exit: 34 },
  { month: "Apr", foundation: 49, growth: 125, advance: 150, takeoff: 132, exit: 35 },
  { month: "May", foundation: 46, growth: 127, advance: 152, takeoff: 132, exit: 35 },
  { month: "Jun", foundation: 48, growth: 126, advance: 154, takeoff: 133, exit: 36 },
  { month: "Jul", foundation: 47, growth: 128, advance: 155, takeoff: 133, exit: 36 },
  { month: "Aug", foundation: 46, growth: 127, advance: 155, takeoff: 134, exit: 37 },
  { month: "Sep", foundation: 45, growth: 129, advance: 156, takeoff: 134, exit: 37 },
  { month: "Oct", foundation: 46, growth: 128, advance: 156, takeoff: 133, exit: 37 },
  { month: "Nov", foundation: 45, growth: 128, advance: 156, takeoff: 134, exit: 37 },
]

const JOURNEY_COLORS = ["#22d3ee", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"]

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("ytd")
  const [region, setRegion] = useState("all")
  const [supplierType, setSupplierType] = useState("all")
  const [bwoIncrease, setBwoIncrease] = useState([0])
  const [trackingView, setTrackingView] = useState<"monthly" | "ytd">("ytd")

  const ytdActual = currentMonthData.cumulative
  const ytdTarget = currentMonthData.cumulativeTarget
  const annualTarget = 20250000
  const ytdProgress = (ytdActual / ytdTarget) * 100
  const annualProgress = (ytdActual / annualTarget) * 100
  const variance = ytdActual - ytdTarget
  const variancePercent = ((variance / ytdTarget) * 100).toFixed(1)
  const isAhead = variance >= 0

  const monthlyActual = currentMonthData.actual
  const monthlyTarget = currentMonthData.target
  const monthlyProgress = (monthlyActual / monthlyTarget) * 100
  const monthlyVariance = monthlyActual - monthlyTarget
  const monthlyVariancePercent = ((monthlyVariance / monthlyTarget) * 100).toFixed(1)
  const isMonthAhead = monthlyVariance >= 0

  const totalSpend = 26500000
  const smmeSpend = 21000000
  const bwoSpend = 18500000
  const activeSuppliers = 1247
  const jobsSupported = 5680

  const predictedImpact = Math.round(bwoSpend * (1 + bwoIncrease[0] / 100) - bwoSpend)

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">ESD Impact Dashboard</h1>
            <p className="text-muted-foreground text-lg">Transformation & Supplier Development Analytics</p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="q4">Q4 2024</SelectItem>
                <SelectItem value="q3">Q3 2024</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>

            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="limpopo">Limpopo</SelectItem>
                <SelectItem value="northwest">North West</SelectItem>
                <SelectItem value="gauteng">Gauteng</SelectItem>
              </SelectContent>
            </Select>

            <Select value={supplierType} onValueChange={setSupplierType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suppliers</SelectItem>
                <SelectItem value="bwo">BWO Only</SelectItem>
                <SelectItem value="youth">Youth-Owned</SelectItem>
                <SelectItem value="women">Women-Owned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="mb-8 border-2 border-accent/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Rocket className="w-6 h-6 text-accent" />
              SME Development Journey Tracker
            </CardTitle>
            <CardDescription>Track supplier progression through ESD development stages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Journey Stage Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {journeyStageData.map((stage, index) => {
                const Icon = stage.icon
                return (
                  <Card key={stage.stage} className="border-2" style={{ borderColor: `${stage.color}30` }}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${stage.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: stage.color }} />
                        </div>
                      </div>
                      <CardTitle className="text-xs font-semibold leading-tight whitespace-pre-line">
                        {stage.stage}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold mb-1">{stage.count}</p>
                      <p className="text-xs text-muted-foreground">{stage.percentage}% of suppliers</p>
                      <p className="text-xs text-muted-foreground mt-2 leading-tight">{stage.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Journey Distribution Visualization */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-4">Journey Stage Distribution</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={journeyStageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ stage, percentage }) => `${percentage}%`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {journeyStageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={JOURNEY_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string, props: any) => [
                        `${value} suppliers (${props.payload.percentage}%)`,
                        props.payload.stage.replace("\n", " "),
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {journeyStageData.map((item, index) => (
                    <div key={item.stage} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.stage.replace("\n", " ")}</span>
                      </div>
                      <span className="font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-4">Stage Progression Over Time</h4>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={journeyProgressionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                    <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Area
                      type="monotone"
                      dataKey="exit"
                      stackId="1"
                      stroke={JOURNEY_COLORS[4]}
                      fill={JOURNEY_COLORS[4]}
                      name="Exit"
                    />
                    <Area
                      type="monotone"
                      dataKey="takeoff"
                      stackId="1"
                      stroke={JOURNEY_COLORS[3]}
                      fill={JOURNEY_COLORS[3]}
                      name="Take-off"
                    />
                    <Area
                      type="monotone"
                      dataKey="advance"
                      stackId="1"
                      stroke={JOURNEY_COLORS[2]}
                      fill={JOURNEY_COLORS[2]}
                      name="Advance"
                    />
                    <Area
                      type="monotone"
                      dataKey="growth"
                      stackId="1"
                      stroke={JOURNEY_COLORS[1]}
                      fill={JOURNEY_COLORS[1]}
                      name="Growth"
                    />
                    <Area
                      type="monotone"
                      dataKey="foundation"
                      stackId="1"
                      stroke={JOURNEY_COLORS[0]}
                      fill={JOURNEY_COLORS[0]}
                      name="Foundation"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              <Card className="bg-green-500/5 border-green-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-400">
                    Progression Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">23%</p>
                  <p className="text-xs text-muted-foreground">SMEs progressed to next stage (YTD)</p>
                </CardContent>
              </Card>

              <Card className="bg-orange-500/5 border-orange-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-400">
                    Avg. Time per Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">18 months</p>
                  <p className="text-xs text-muted-foreground">Before progressing to next level</p>
                </CardContent>
              </Card>

              <Card className="bg-purple-500/5 border-purple-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-400">
                    Graduation Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">37</p>
                  <p className="text-xs text-muted-foreground">SMEs achieved independence (Exit stage)</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* ESD Spend Target Tracking Section */}
        <Card className="mb-8 border-2 border-accent/30 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="w-6 h-6 text-accent" />
                ESD Spend Target Tracker
              </CardTitle>
              <Tabs value={trackingView} onValueChange={(v) => setTrackingView(v as "monthly" | "ytd")}>
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="ytd">Year to Date</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {trackingView === "ytd" ? (
              <div className="space-y-6">
                {/* YTD Overview */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground font-normal">Annual Target</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">R {(annualTarget / 1000000).toFixed(2)}M</p>
                      <p className="text-sm text-muted-foreground mt-1">2024 Goal</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground font-normal">YTD Target</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">R {(ytdTarget / 1000000).toFixed(2)}M</p>
                      <p className="text-sm text-muted-foreground mt-1">Through November</p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`border-2 ${isAhead ? "border-green-500/50 bg-green-500/5" : "border-orange-500/50 bg-orange-500/5"}`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground font-normal">YTD Actual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">R {(ytdActual / 1000000).toFixed(2)}M</p>
                      <div className="flex items-center gap-2 mt-1">
                        {isAhead ? (
                          <Badge variant="default" className="bg-green-500">
                            <TrendingUp className="w-3 h-3 mr-1" />+{variancePercent}%
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {variancePercent}%
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {isAhead ? "Ahead" : "Behind"} by R {Math.abs(variance / 1000000).toFixed(0)}M
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress to YTD Target</span>
                      <span className="text-sm font-bold text-accent">{ytdProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={ytdProgress} className="h-3" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress to Annual Target</span>
                      <span className="text-sm font-bold">{annualProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={annualProgress} className="h-3" />
                  </div>
                </div>

                {/* YTD Cumulative Chart */}
                <div>
                  <h4 className="text-sm font-semibold mb-4">Year-to-Date Cumulative Performance</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlySpendTrackingData.slice(0, currentMonthIndex + 1)}>
                      <defs>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => `R${(value / 1000000).toFixed(1)}M`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => `R ${(value / 1000000).toFixed(1)}M`}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="cumulative"
                        stroke="hsl(var(--accent))"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorActual)"
                        name="Actual Spend"
                      />
                      <Area
                        type="monotone"
                        dataKey="cumulativeTarget"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fillOpacity={1}
                        fill="url(#colorTarget)"
                        name="Target"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Projection Alert */}
                <Card
                  className={`border-2 ${isAhead ? "bg-green-500/5 border-green-500/30" : "bg-orange-500/5 border-orange-500/30"}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      {isAhead ? (
                        <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold mb-1">
                          {isAhead ? "On Track to Exceed Annual Target" : "Action Required to Meet Target"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isAhead
                            ? `Current pace projects year-end spend of R ${(((ytdActual / (currentMonthIndex + 1)) * 12) / 1000000).toFixed(2)}M, which would exceed the annual target of R ${(annualTarget / 1000000).toFixed(2)}M.`
                            : `To meet the annual target of R ${(annualTarget / 1000000).toFixed(2)}M, December spend needs to be R ${((annualTarget - ytdActual) / 1000000).toFixed(0)}M.`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Monthly Overview */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground font-normal">Current Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">November</p>
                      <p className="text-sm text-muted-foreground mt-1">2024</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground font-normal">Monthly Target</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">R {(monthlyTarget / 1000000).toFixed(0)}M</p>
                      <p className="text-sm text-muted-foreground mt-1">November Goal</p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`border-2 ${isMonthAhead ? "border-green-500/50 bg-green-500/5" : "border-orange-500/50 bg-orange-500/5"}`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground font-normal">Monthly Actual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">R {(monthlyActual / 1000000).toFixed(0)}M</p>
                      <div className="flex items-center gap-2 mt-1">
                        {isMonthAhead ? (
                          <Badge variant="default" className="bg-green-500">
                            <TrendingUp className="w-3 h-3 mr-1" />+{monthlyVariancePercent}%
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {monthlyVariancePercent}%
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {isMonthAhead ? "Ahead" : "Behind"} by R {Math.abs(monthlyVariance / 1000000).toFixed(0)}M
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Monthly Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">November Progress</span>
                    <span className="text-sm font-bold text-accent">{monthlyProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={monthlyProgress} className="h-3" />
                </div>

                {/* Monthly Performance Chart */}
                <div>
                  <h4 className="text-sm font-semibold mb-4">Monthly Target vs Actual Performance</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlySpendTrackingData.slice(0, currentMonthIndex + 1)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        tickFormatter={(value) => `R${(value / 1000000).toFixed(0)}M`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => `R ${(value / 1000000).toFixed(1)}M`}
                      />
                      <Legend />
                      <Bar
                        dataKey="target"
                        fill="hsl(var(--muted-foreground))"
                        name="Target"
                        opacity={0.5}
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar dataKey="actual" fill="hsl(var(--accent))" name="Actual Spend" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Monthly Performance History */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">Monthly Performance History</h4>
                  <div className="space-y-2">
                    {monthlySpendTrackingData
                      .slice(0, currentMonthIndex + 1)
                      .reverse()
                      .slice(0, 6)
                      .map((month) => {
                        const variance = month.actual - month.target
                        const isAhead = variance >= 0
                        return (
                          <div key={month.month} className="flex items-center justify-between py-2 border-b">
                            <span className="font-medium">{month.month}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">
                                Target: R {(month.target / 1000000).toFixed(0)}M
                              </span>
                              <span className="text-sm font-semibold">
                                Actual: R {(month.actual / 1000000).toFixed(0)}M
                              </span>
                              {month.actual > 0 && (
                                <Badge
                                  variant={isAhead ? "default" : "destructive"}
                                  className={isAhead ? "bg-green-500" : ""}
                                >
                                  {isAhead ? "+" : ""}
                                  {((variance / month.target) * 100).toFixed(1)}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-8">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">Total ESD Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold">R {(totalSpend / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-muted-foreground">+12% vs LY</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">Spend to SMMEs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold">R {(smmeSpend / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-muted-foreground">79% of total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">BWO Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold">R {(bwoSpend / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-muted-foreground">70% of total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">Active Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{activeSuppliers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">+145 this year</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">Jobs Supported</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{jobsSupported.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">+8% vs LY</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Monthly Spend Trend */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Monthly Spend to SMMEs & BWO Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlySpendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `R${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => `R ${(value / 1000000).toFixed(1)}M`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="smme"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="SMME Spend"
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bwo"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="BWO Spend"
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Supplier Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Spend by Supplier Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={supplierTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {supplierTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `R ${(props.payload.amount / 1000000).toFixed(0)}M`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {supplierTypeData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">R {(item.amount / 1000000).toFixed(0)}M</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Spend */}
          <Card>
            <CardHeader>
              <CardTitle>Spend by Procurement Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categorySpendData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `R${(value / 1000000).toFixed(0)}M`}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    stroke="hsl(var(--muted-foreground))"
                    width={140}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => `R ${(value / 1000000).toFixed(1)}M`}
                  />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {categorySpendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Geographic Distribution */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Geographic Distribution of Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {geographicData.map((item, index) => (
                <Card key={item.province} className="border-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{item.province}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold text-accent">{item.suppliers}</p>
                      <p className="text-xs text-muted-foreground">Suppliers</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">R {(item.spend / 1000000).toFixed(0)}M</p>
                      <p className="text-xs text-muted-foreground">Total Spend</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="border-2 border-accent/50">
            <CardHeader>
              <CardTitle className="text-lg">Transformation Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">BWO Suppliers</span>
                <Badge variant="default">82%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Youth-Owned</span>
                <Badge variant="default">28%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Women-Owned</span>
                <Badge variant="default">45%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Disability-Owned</span>
                <Badge variant="default">12%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/50">
            <CardHeader>
              <CardTitle className="text-lg">Supplier Growth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Suppliers (YTD)</span>
                <span className="text-xl font-bold">145</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Contract Growth</span>
                <span className="text-xl font-bold text-accent">+24%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">EME to QSE Transitions</span>
                <span className="text-xl font-bold">18</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/50">
            <CardHeader>
              <CardTitle className="text-lg">Localisation Footprint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Community Suppliers</span>
                <span className="text-xl font-bold">387</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Local Spend</span>
                <span className="text-xl font-bold">R 1.2B</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Provinces Covered</span>
                <span className="text-xl font-bold">9/9</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenario Planning Widget */}
        <Card className="border-2 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Transformation Scenario Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Increase BWO Spend by: <span className="text-accent">{bwoIncrease[0]}%</span>
                </label>
                <span className="text-sm text-muted-foreground">Current: R {(bwoSpend / 1000000).toFixed(0)}M</span>
              </div>

              <Slider value={bwoIncrease} onValueChange={setBwoIncrease} max={50} step={5} className="py-4" />

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Predicted Additional Impact</p>
                  <p className="text-3xl font-bold text-accent">+R {(predictedImpact / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Est. {Math.round((predictedImpact / bwoSpend) * 1000)} additional jobs created
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground mb-1">New BWO Target</p>
                <p className="text-lg font-bold">R {((bwoSpend + predictedImpact) / 1000000).toFixed(0)}M</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground mb-1">Mining Charter Alignment</p>
                <p className="text-lg font-bold text-accent">
                  {Math.min(100, Math.round(((bwoSpend + predictedImpact) / totalSpend) * 100))}%
                </p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground mb-1">Target Suppliers</p>
                <p className="text-lg font-bold">+{Math.round((predictedImpact / bwoSpend) * activeSuppliers * 0.1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
