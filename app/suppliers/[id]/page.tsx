"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Users,
  FileText,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Calendar,
  Briefcase,
  ArrowLeft,
  RefreshCw,
  Shield,
  Database,
  Plus,
  Eye,
  Upload,
  Clock,
  GraduationCap,
  Award,
  Target,
  AlertTriangle,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"

const spendData = [
  { month: "Jan", amount: 120000 },
  { month: "Feb", amount: 150000 },
  { month: "Mar", amount: 180000 },
  { month: "Apr", amount: 165000 },
  { month: "May", amount: 200000 },
  { month: "Jun", amount: 195000 },
]

const performanceData = [
  { month: "Jan", score: 4.5 },
  { month: "Feb", score: 4.6 },
  { month: "Mar", score: 4.7 },
  { month: "Apr", score: 4.8 },
  { month: "May", score: 4.8 },
  { month: "Jun", score: 4.9 },
]

// Mock interventions data
const interventionsData = [
  {
    id: 1,
    date: "2024-11-15",
    type: "Mentorship Session",
    description: "Quarterly business review with assigned mentor. Discussed cash flow management and scaling operations. Supplier demonstrated improved financial literacy.",
    practitioner: "Sarah Molefe",
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-10-22",
    type: "Training",
    description: "Health & Safety compliance training for mining operations. 8 employees attended the 2-day workshop. All participants certified.",
    practitioner: "James Nkosi",
    status: "Completed",
  },
  {
    id: 3,
    date: "2024-09-05",
    type: "Financial Injection",
    description: "Working capital facility of R250,000 approved and disbursed to support inventory build-up for Q4 contracts.",
    practitioner: "Finance Team",
    status: "Completed",
  },
  {
    id: 4,
    date: "2024-12-10",
    type: "Site Visit",
    description: "Scheduled operational assessment to evaluate production capacity and quality control processes.",
    practitioner: "Quality Assurance",
    status: "Planned",
  },
  {
    id: 5,
    date: "2024-11-28",
    type: "Procurement Referral",
    description: "Referred to Anglo American procurement team for upcoming tender on safety equipment supply.",
    practitioner: "Sarah Molefe",
    status: "In Progress",
  },
]

// Enhanced compliance documents with expiry tracking
const complianceDocuments = [
  {
    id: 1,
    name: "BEE Certificate",
    uploadDate: "2024-01-15",
    expiryDate: "2025-06-30",
    status: "Valid",
    documentType: "beeCertificate",
  },
  {
    id: 2,
    name: "Tax Clearance Pin",
    uploadDate: "2024-03-20",
    expiryDate: "2025-01-15",
    status: "Expiring Soon",
    documentType: "taxClearance",
  },
  {
    id: 3,
    name: "CIPC Registration",
    uploadDate: "2023-06-10",
    expiryDate: "2024-06-10",
    status: "Expired",
    documentType: "cipcRegistration",
  },
  {
    id: 4,
    name: "COIDA Letter of Good Standing",
    uploadDate: "2024-02-28",
    expiryDate: "2025-12-31",
    status: "Valid",
    documentType: "coida",
  },
  {
    id: 5,
    name: "Banking Confirmation Letter",
    uploadDate: "2024-04-01",
    expiryDate: "2025-04-01",
    status: "Valid",
    documentType: "bankLetter",
  },
]

// Skills development data
const skillsTrainingData = [
  {
    id: 1,
    programme: "Mining Safety Management",
    nqfLevel: 5,
    beneficiaries: 12,
    spend: 85000,
    date: "2024-09-15",
    accreditationStatus: "Accredited",
    provider: "TETA",
  },
  {
    id: 2,
    programme: "Financial Literacy for Business Owners",
    nqfLevel: 4,
    beneficiaries: 3,
    spend: 25000,
    date: "2024-07-22",
    accreditationStatus: "Accredited",
    provider: "Services SETA",
  },
  {
    id: 3,
    programme: "Supply Chain Management",
    nqfLevel: 6,
    beneficiaries: 5,
    spend: 45000,
    date: "2024-05-10",
    accreditationStatus: "Accredited",
    provider: "CETA",
  },
  {
    id: 4,
    programme: "Equipment Maintenance Certification",
    nqfLevel: 4,
    beneficiaries: 8,
    spend: 35000,
    date: "2024-03-18",
    accreditationStatus: "Accredited",
    provider: "MQA",
  },
]

const nqfBreakdown = [
  { level: "NQF 4", count: 11, spend: 60000 },
  { level: "NQF 5", count: 12, spend: 85000 },
  { level: "NQF 6", count: 5, spend: 45000 },
]

// Contract renewal history
const contractHistory = [
  { year: "2021", value: "R 500,000", status: "Completed", renewed: true },
  { year: "2022", value: "R 850,000", status: "Completed", renewed: true },
  { year: "2023", value: "R 1.2M", status: "Completed", renewed: true },
  { year: "2024", value: "R 2.5M", status: "Active", renewed: true },
]

// Dispute history
const disputeHistory = [
  {
    id: 1,
    date: "2024-02-15",
    description: "Delivery delay dispute",
    status: "Resolved",
    resolution: "Credit note issued, delivery terms amended",
  },
  {
    id: 2,
    date: "2023-08-20",
    description: "Quality specification mismatch",
    status: "Resolved",
    resolution: "Product replaced, QA process updated",
  },
]

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isVerifying, setIsVerifying] = useState(false)
  const [lastVerified, setLastVerified] = useState(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000))
  const [showInterventionForm, setShowInterventionForm] = useState(false)
  const [preferredStatus, setPreferredStatus] = useState("Active")

  const supplier = {
    id: params.id,
    name: "Thabo Mining Supplies",
    registrationNumber: "2018/123456/07",
    taxNumber: "9876543210",
    covidaNumber: "U123456",
    bankAccountNumber: "1234567890",
    category: "Equipment Supply",
    location: "Rustenburg, North West",
    email: "info@thabomining.co.za",
    phone: "+27 14 555 0123",
    bwoOwned: true,
    verified: true,
    rating: 4.8,
    stage: "Growth",
    classification: "QSE",
    description:
      "Thabo Mining Supplies is a leading provider of high-quality mining equipment and supplies. With over 6 years of experience, we specialize in drill bits, safety gear, pumps, and ventilation systems for the mining industry.",
    equipment:
      "Full range of mining equipment including drill bits, safety gear, pumps, and ventilation systems. ISO 9001 certified facilities.",
    services: [
      "Drill Bits & Consumables",
      "Safety Equipment",
      "Pumps & Valves",
      "Ventilation Systems",
      "Maintenance Services",
      "Emergency Supply",
    ],
    employees: 45,
    maxContract: "R 2.5M",
    yearEstablished: 2018,
    performance: {
      deliveryScore: 4.9,
      qualityScore: 4.8,
      onTimeRate: 96,
      qualityAcceptanceRate: 98.5,
    },
    automatedVerifications: {
      cipc: {
        status: "verified",
        lastChecked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: "Company registered and in good standing",
        companyStatus: "Active",
        registrationDate: "2018-04-15",
      },
      sars: {
        status: "verified",
        lastChecked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: "Tax compliant - Valid tax clearance",
        taxStatus: "Compliant",
        expiryDate: "2025-03-15",
      },
      coida: {
        status: "verified",
        lastChecked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: "COIDA registration active and up to date",
        coverageStatus: "Active",
        expiryDate: "2025-12-31",
      },
      bank: {
        status: "verified",
        lastChecked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: "Bank account verified and active",
        accountStatus: "Active",
        bankName: "First National Bank",
      },
      homeAffairs: {
        status: "verified",
        lastChecked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: "Director ID verification successful",
        directorName: "Thabo Mokoena",
        idVerified: true,
      },
    },
  }

  const handleRunVerifications = async () => {
    setIsVerifying(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsVerifying(false)
    setLastVerified(new Date())
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "failed":
        return <XCircle className="w-5 h-5 text-destructive" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-500/30">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "Valid":
        return <Badge className="bg-green-500/10 text-green-700 border-green-500/30">Valid</Badge>
      case "Expiring Soon":
        return <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/30">Expiring Soon</Badge>
      case "Expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getInterventionStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500/10 text-green-700 border-green-500/30">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/30">In Progress</Badge>
      case "Planned":
        return <Badge className="bg-purple-500/10 text-purple-700 border-purple-500/30">Planned</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const totalSkillsSpend = skillsTrainingData.reduce((acc, item) => acc + item.spend, 0)
  const totalBeneficiaries = skillsTrainingData.reduce((acc, item) => acc + item.beneficiaries, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/suppliers">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Suppliers
            </Button>
          </Link>
          <Link href={`/supplier-portal?id=${params.id}`}>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Supplier View
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Company Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{supplier.name}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" />
                      {supplier.location}
                    </p>
                    <p className="text-muted-foreground text-sm">Reg: {supplier.registrationNumber}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {supplier.verified ? (
                      <Badge className="bg-accent w-fit">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-500/30 w-fit">
                        Pending Verification
                      </Badge>
                    )}
                    <div className="flex items-center gap-2 bg-accent/10 px-3 py-2 rounded-lg">
                      <Star className="w-5 h-5 fill-accent text-accent" />
                      <span className="font-bold text-lg">{supplier.rating}</span>
                      <span className="text-muted-foreground">/5.0</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{supplier.category}</span>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-semibold text-sm">Classifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {supplier.bwoOwned && <Badge variant="secondary">BWO</Badge>}
                    <Badge variant="secondary">{supplier.classification}</Badge>
                    <Badge
                      variant="outline"
                      className={
                        supplier.stage === "Foundation"
                          ? "bg-blue-500/10 text-blue-700 border-blue-500/30"
                          : supplier.stage === "Growth"
                            ? "bg-green-500/10 text-green-700 border-green-500/30"
                            : supplier.stage === "Advance"
                              ? "bg-purple-500/10 text-purple-700 border-purple-500/30"
                              : supplier.stage === "Take-off"
                                ? "bg-orange-500/10 text-orange-700 border-orange-500/30"
                                : "bg-gray-500/10 text-gray-700 border-gray-500/30"
                      }
                    >
                      {supplier.stage} Stage
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">{supplier.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area - Tabs */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="interventions">Interventions</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Business Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium">{supplier.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Classification:</span>
                        <span className="font-medium">{supplier.classification}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stage:</span>
                        <span className="font-medium">{supplier.stage}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Transformation Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Black-Owned (BWO)</span>
                        {supplier.bwoOwned ? (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        ) : (
                          <XCircle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Spend Trend (Last 6 Months)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={spendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`R ${value.toLocaleString()}`, "Spend"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="hsl(var(--accent))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--accent))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-center">
                      <p className="text-2xl font-bold">R 1.01M</p>
                      <p className="text-sm text-muted-foreground">Total Spend (YTD)</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interventions Tab */}
              <TabsContent value="interventions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Development Interventions</CardTitle>
                        <CardDescription>Chronological log of ESD development activities</CardDescription>
                      </div>
                      <Button onClick={() => setShowInterventionForm(!showInterventionForm)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Log Intervention
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {showInterventionForm && (
                      <Card className="bg-muted/50 border-dashed">
                        <CardHeader>
                          <CardTitle className="text-base">New Intervention</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Date</Label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <Label>Intervention Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mentorship">Mentorship Session</SelectItem>
                                  <SelectItem value="training">Training</SelectItem>
                                  <SelectItem value="financial">Financial Injection</SelectItem>
                                  <SelectItem value="site-visit">Site Visit</SelectItem>
                                  <SelectItem value="procurement">Procurement Referral</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea placeholder="Describe the intervention details..." rows={3} />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>ESD Practitioner</Label>
                              <Input placeholder="Name of practitioner" />
                            </div>
                            <div className="space-y-2">
                              <Label>Status</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="planned">Planned</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button>Save Intervention</Button>
                            <Button variant="outline" onClick={() => setShowInterventionForm(false)}>
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="space-y-3">
                      {interventionsData.map((intervention) => (
                        <div key={intervention.id} className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-accent" />
                              </div>
                              <div>
                                <p className="font-medium">{intervention.type}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(intervention.date).toLocaleDateString("en-ZA", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            {getInterventionStatusBadge(intervention.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 ml-13">{intervention.description}</p>
                          <p className="text-xs text-muted-foreground ml-13">
                            Logged by: <span className="font-medium">{intervention.practitioner}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Compliance Tab */}
              <TabsContent value="compliance" className="space-y-4">
                {/* Automated Verifications Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="w-5 h-5 text-accent" />
                          Automated Verifications
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Real-time compliance checks via government and financial integrations
                        </p>
                      </div>
                      <Button onClick={handleRunVerifications} disabled={isVerifying} size="sm">
                        <RefreshCw className={`w-4 h-4 mr-2 ${isVerifying ? "animate-spin" : ""}`} />
                        {isVerifying ? "Verifying..." : "Run Checks"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-xs text-muted-foreground mb-4">
                      Last verified: {lastVerified.toLocaleString()}
                    </div>

                    {/* CIPC Verification */}
                    <div className="flex items-start justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        {getVerificationIcon(supplier.automatedVerifications.cipc.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">CIPC (Companies Registration)</p>
                            {getVerificationBadge(supplier.automatedVerifications.cipc.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {supplier.automatedVerifications.cipc.details}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Status:</span>{" "}
                              <span className="font-medium">{supplier.automatedVerifications.cipc.companyStatus}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Registered:</span>{" "}
                              <span className="font-medium">
                                {supplier.automatedVerifications.cipc.registrationDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Database className="w-4 h-4 text-muted-foreground ml-2" />
                    </div>

                    {/* SARS Verification */}
                    <div className="flex items-start justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        {getVerificationIcon(supplier.automatedVerifications.sars.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">SARS (Tax Compliance)</p>
                            {getVerificationBadge(supplier.automatedVerifications.sars.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {supplier.automatedVerifications.sars.details}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Tax Status:</span>{" "}
                              <span className="font-medium">{supplier.automatedVerifications.sars.taxStatus}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Valid Until:</span>{" "}
                              <span className="font-medium">{supplier.automatedVerifications.sars.expiryDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Database className="w-4 h-4 text-muted-foreground ml-2" />
                    </div>

                    {/* COIDA Verification */}
                    <div className="flex items-start justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        {getVerificationIcon(supplier.automatedVerifications.coida.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">COIDA (Compensation Fund)</p>
                            {getVerificationBadge(supplier.automatedVerifications.coida.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {supplier.automatedVerifications.coida.details}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Coverage:</span>{" "}
                              <span className="font-medium">
                                {supplier.automatedVerifications.coida.coverageStatus}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Valid Until:</span>{" "}
                              <span className="font-medium">{supplier.automatedVerifications.coida.expiryDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Database className="w-4 h-4 text-muted-foreground ml-2" />
                    </div>

                    {/* Bank Verification */}
                    <div className="flex items-start justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        {getVerificationIcon(supplier.automatedVerifications.bank.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">Bank Account Verification</p>
                            {getVerificationBadge(supplier.automatedVerifications.bank.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {supplier.automatedVerifications.bank.details}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Account Status:</span>{" "}
                              <span className="font-medium">{supplier.automatedVerifications.bank.accountStatus}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Bank:</span>{" "}
                              <span className="font-medium">{supplier.automatedVerifications.bank.bankName}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Database className="w-4 h-4 text-muted-foreground ml-2" />
                    </div>

                    {/* Home Affairs Verification */}
                    <div className="flex items-start justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        {getVerificationIcon(supplier.automatedVerifications.homeAffairs.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">Home Affairs (ID Verification)</p>
                            {getVerificationBadge(supplier.automatedVerifications.homeAffairs.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {supplier.automatedVerifications.homeAffairs.details}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Director:</span>{" "}
                              <span className="font-medium">
                                {supplier.automatedVerifications.homeAffairs.directorName}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">ID Verified:</span>{" "}
                              <span className="font-medium">
                                {supplier.automatedVerifications.homeAffairs.idVerified ? "Yes" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Database className="w-4 h-4 text-muted-foreground ml-2" />
                    </div>

                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-accent mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-foreground mb-1">Automated Compliance</p>
                          <p className="text-muted-foreground">
                            These verifications run automatically every 48 hours. All checks are performed directly with
                            government and financial institutions via secure API integrations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Document Management Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-accent" />
                      Document Management
                    </CardTitle>
                    <CardDescription>Track compliance document status and expiry dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-sm">Document Name</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Upload Date</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Expiry Date</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                            <th className="text-right py-3 px-4 font-medium text-sm">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {complianceDocuments.map((doc) => (
                            <tr key={doc.id} className="border-b hover:bg-accent/5">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-muted-foreground" />
                                  <span className="font-medium text-sm">{doc.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">
                                {new Date(doc.uploadDate).toLocaleDateString("en-ZA")}
                              </td>
                              <td className="py-3 px-4 text-sm">
                                <span className={doc.status === "Expired" ? "text-destructive font-medium" : doc.status === "Expiring Soon" ? "text-orange-600 font-medium" : ""}>
                                  {new Date(doc.expiryDate).toLocaleDateString("en-ZA")}
                                </span>
                              </td>
                              <td className="py-3 px-4">{getDocumentStatusBadge(doc.status)}</td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Upload className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Expiry Alerts */}
                    <div className="mt-4 space-y-2">
                      {complianceDocuments.filter(d => d.status === "Expired").length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-red-700">Expired Documents</p>
                            <p className="text-red-600/80">
                              {complianceDocuments.filter(d => d.status === "Expired").map(d => d.name).join(", ")} - Immediate action required
                            </p>
                          </div>
                        </div>
                      )}
                      {complianceDocuments.filter(d => d.status === "Expiring Soon").length > 0 && (
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-orange-700">Expiring Soon (within 60 days)</p>
                            <p className="text-orange-600/80">
                              {complianceDocuments.filter(d => d.status === "Expiring Soon").map(d => d.name).join(", ")} - Request renewal
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Capabilities Tab */}
              <TabsContent value="capabilities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {supplier.services.map((service) => (
                        <Badge key={service} variant="secondary" className="text-sm">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Equipment & Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{supplier.equipment}</p>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Team Size</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-accent" />
                        <span className="text-xl font-bold">{supplier.employees}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Max Contract Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-accent" />
                        <span className="text-lg font-bold">{supplier.maxContract}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Years in Business</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-accent" />
                        <span className="text-xl font-bold">
                          {new Date().getFullYear() - supplier.yearEstablished} years
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Performance Tab - Enhanced with Procurement KPIs */}
              <TabsContent value="performance" className="space-y-6">
                {/* Preferred Supplier Status */}
                <Card className="border-2 border-accent/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="w-5 h-5 text-accent" />
                        Preferred Supplier Status
                      </CardTitle>
                      <Select value={preferredStatus} onValueChange={setPreferredStatus}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Under Review">Under Review</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge className={
                      preferredStatus === "Active" 
                        ? "bg-green-500/10 text-green-700 border-green-500/30"
                        : preferredStatus === "Under Review"
                          ? "bg-orange-500/10 text-orange-700 border-orange-500/30"
                          : "bg-red-500/10 text-red-700 border-red-500/30"
                    }>
                      {preferredStatus}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Procurement KPIs */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">On-Time Delivery Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Target className="w-6 h-6 text-accent" />
                        <span className="text-3xl font-bold">{supplier.performance.onTimeRate}%</span>
                      </div>
                      <Progress value={supplier.performance.onTimeRate} className="mt-2 h-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Quality Acceptance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                        <span className="text-3xl font-bold">{supplier.performance.qualityAcceptanceRate}%</span>
                      </div>
                      <Progress value={supplier.performance.qualityAcceptanceRate} className="mt-2 h-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Delivery Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 fill-accent text-accent" />
                        <span className="text-3xl font-bold">{supplier.performance.deliveryScore}</span>
                        <span className="text-muted-foreground">/5.0</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Quality Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 fill-accent text-accent" />
                        <span className="text-3xl font-bold">{supplier.performance.qualityScore}</span>
                        <span className="text-muted-foreground">/5.0</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Disputes Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      Dispute History
                      <Badge variant="secondary" className="ml-2">{disputeHistory.length} Total</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {disputeHistory.map((dispute) => (
                        <div key={dispute.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-sm">{dispute.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(dispute.date).toLocaleDateString("en-ZA")}
                              </p>
                            </div>
                            <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
                              {dispute.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Resolution:</span> {dispute.resolution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contract Renewal History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contract Renewal History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {contractHistory.map((contract, index) => (
                        <div key={contract.year} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold">
                              {contract.year.slice(2)}
                            </div>
                            <div>
                              <p className="font-medium">{contract.year}</p>
                              <p className="text-sm text-muted-foreground">{contract.value}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={contract.status === "Active" ? "default" : "secondary"}>
                              {contract.status}
                            </Badge>
                            {contract.renewed && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [value, "Score"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="hsl(var(--accent))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--accent))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Development Tab */}
              <TabsContent value="skills" className="space-y-6">
                {/* Skills Summary */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-2 border-accent/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Total Skills Spend (YTD)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-accent" />
                        <span className="text-2xl font-bold">R {(totalSkillsSpend / 1000).toFixed(0)}K</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Employees Trained</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-accent" />
                        <span className="text-2xl font-bold">{totalBeneficiaries}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Avg NQF Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Award className="w-6 h-6 text-accent" />
                        <span className="text-2xl font-bold">4.8</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* NQF Level Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Training by NQF Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={nqfBreakdown} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                        <YAxis dataKey="level" type="category" stroke="hsl(var(--muted-foreground))" width={60} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number, name: string) => {
                            if (name === "count") return [`${value} employees`, "Trained"]
                            return [`R ${(value / 1000).toFixed(0)}K`, "Spend"]
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Training Interventions List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Training Interventions</CardTitle>
                    <CardDescription>Skills development programmes delivered to supplier employees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-sm">Programme</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">NQF</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Beneficiaries</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Spend</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {skillsTrainingData.map((training) => (
                            <tr key={training.id} className="border-b hover:bg-accent/5">
                              <td className="py-3 px-4">
                                <div>
                                  <p className="font-medium text-sm">{training.programme}</p>
                                  <p className="text-xs text-muted-foreground">{training.provider}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline">Level {training.nqfLevel}</Badge>
                              </td>
                              <td className="py-3 px-4 text-sm">{training.beneficiaries}</td>
                              <td className="py-3 px-4 text-sm font-medium">R {(training.spend / 1000).toFixed(0)}K</td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">
                                {new Date(training.date).toLocaleDateString("en-ZA")}
                              </td>
                              <td className="py-3 px-4">
                                <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
                                  {training.accreditationStatus}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ESD Manager Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Add internal notes about this supplier..."
                      rows={8}
                      className="w-full"
                    />
                    <Button>Save Notes</Button>
                  </CardContent>
                </Card>

                <div className="bg-muted/50 border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Notes are internal and only visible to ESD team members. Use this space to track supplier
                    development activities, meeting notes, and performance observations.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
