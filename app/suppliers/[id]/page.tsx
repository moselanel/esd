"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import Link from "next/link"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isVerifying, setIsVerifying] = useState(false)
  const [lastVerified, setLastVerified] = useState(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000))

  const supplier = {
    id: 1,
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
    documents: {
      taxClearance: { status: "uploaded", expiry: "2025-03-15" },
      beeCertificate: { status: "uploaded", expiry: "2025-06-30" },
      coida: { status: "uploaded", expiry: "2025-12-31" },
      bankLetter: { status: "uploaded", expiry: "2024-09-30" },
    },
    performance: {
      deliveryScore: 4.9,
      qualityScore: 4.8,
      onTimeRate: 96,
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/suppliers">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Suppliers
          </Button>
        </Link>

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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
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

                {/* Compliance Documents Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(supplier.documents).map(([key, doc]) => {
                      const docNames: Record<string, string> = {
                        taxClearance: "Tax Clearance Certificate",
                        beeCertificate: "BEE Certificate",
                        coida: "COIDA / WorkCover",
                        bankLetter: "Bank Confirmation Letter",
                      }

                      const isExpiringSoon =
                        doc.expiry && new Date(doc.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      const isExpired = doc.expiry && new Date(doc.expiry) < new Date()

                      return (
                        <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {doc.status === "uploaded" && !isExpired ? (
                              <CheckCircle2 className="w-5 h-5 text-accent" />
                            ) : isExpired ? (
                              <XCircle className="w-5 h-5 text-destructive" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-muted-foreground" />
                            )}

                            <div>
                              <p className="font-medium">{docNames[key]}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={
                                    doc.status === "uploaded" && !isExpired
                                      ? "default"
                                      : isExpired
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {isExpired ? "Expired" : doc.status === "uploaded" ? "Valid" : "Missing"}
                                </Badge>
                                {doc.expiry && (
                                  <span
                                    className={`text-sm ${isExpiringSoon ? "text-destructive" : "text-muted-foreground"}`}
                                  >
                                    Expires: {new Date(doc.expiry).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <div className="bg-muted/50 border rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Compliance Status:</strong> All required documents are valid. Bank confirmation letter
                    expires in 3 months - request renewal reminder.
                  </p>
                </div>
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

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
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
                    <CardHeader>
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

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">On-Time Delivery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                        <span className="text-3xl font-bold">{supplier.performance.onTimeRate}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

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

              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-4">
                {/* Notes Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ESD Manager Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <textarea
                      placeholder="Add internal notes about this supplier..."
                      rows={8}
                      className="w-full p-4 bg-background border rounded-lg"
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
