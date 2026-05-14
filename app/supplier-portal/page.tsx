"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  FileText,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  TrendingUp,
  Star,
  MapPin,
  Phone,
  Mail,
  Upload,
  Eye,
  Calendar,
  Award,
  GraduationCap,
  Briefcase,
  Users,
  Target,
  Bell,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

// Mock supplier data for portal view
const supplierProfile = {
  name: "Thabo Industrial Supplies",
  registrationNumber: "2018/123456/07",
  taxNumber: "9876543210",
  category: "Equipment Supply",
  location: "Rustenburg, North West",
  email: "info@thaboindustrial.co.za",
  phone: "+27 14 555 0123",
  bwoOwned: true,
  rating: 4.8,
  stage: "Growth",
  classification: "QSE",
  employees: 45,
  yearEstablished: 2018,
  preferredStatus: "Active",
}

const documentStatus = [
  { name: "BEE Certificate", status: "Valid", expiryDate: "2025-06-30", uploadDate: "2024-01-15" },
  { name: "Tax Clearance Pin", status: "Expiring Soon", expiryDate: "2025-01-15", uploadDate: "2024-03-20" },
  { name: "CIPC Registration", status: "Expired", expiryDate: "2024-06-10", uploadDate: "2023-06-10" },
  { name: "COIDA Letter of Good Standing", status: "Valid", expiryDate: "2025-12-31", uploadDate: "2024-02-28" },
  { name: "Banking Confirmation Letter", status: "Valid", expiryDate: "2025-04-01", uploadDate: "2024-04-01" },
]

const performanceMetrics = {
  onTimeDelivery: 96,
  qualityScore: 98.5,
  overallRating: 4.8,
  contractsCompleted: 24,
  activeContracts: 3,
}

const opportunities = [
  {
    id: 1,
    title: "Equipment Supply - Q1 2025",
    value: "R 1.5M - R 2.5M",
    deadline: "2024-12-15",
    status: "Open",
    category: "Equipment Supply",
  },
  {
    id: 2,
    title: "Safety Gear Procurement",
    value: "R 500K - R 800K",
    deadline: "2024-12-20",
    status: "Open",
    category: "Safety Equipment",
  },
]

const trainingHistory = [
  {
    programme: "Workplace Safety Management",
    date: "2024-09-15",
    beneficiaries: 12,
    status: "Completed",
    certificate: true,
  },
  {
    programme: "Financial Literacy for Business",
    date: "2024-07-22",
    beneficiaries: 3,
    status: "Completed",
    certificate: true,
  },
]

const notifications = [
  {
    id: 1,
    message: "Your CIPC Registration has expired. Please upload a new document.",
    type: "urgent",
    date: "2024-11-15",
  },
  {
    id: 2,
    message: "Tax Clearance Pin expires in 60 days. Consider renewing early.",
    type: "warning",
    date: "2024-11-14",
  },
  {
    id: 3,
    message: "New tender opportunity available matching your profile.",
    type: "info",
    date: "2024-11-13",
  },
]

export default function SupplierPortalPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Valid":
        return <Badge className="bg-green-500/10 text-green-700 border-green-500/30">Valid</Badge>
      case "Expiring Soon":
        return <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/30">Expiring Soon</Badge>
      case "Expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const expiredDocs = documentStatus.filter(d => d.status === "Expired").length
  const expiringDocs = documentStatus.filter(d => d.status === "Expiring Soon").length

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                <Building2 className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{supplierProfile.name}</h1>
                <p className="text-muted-foreground">Supplier Portal</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
            <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Preferred Supplier - {supplierProfile.preferredStatus}
            </Badge>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="font-bold text-lg">{supplierProfile.rating}</span>
              <span className="text-muted-foreground">/5.0</span>
            </div>
          </div>
        </div>

        {/* Notifications Banner */}
        {(expiredDocs > 0 || expiringDocs > 0) && (
          <Card className={`mb-6 border-2 ${expiredDocs > 0 ? "border-red-500/50 bg-red-500/5" : "border-orange-500/50 bg-orange-500/5"}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                {expiredDocs > 0 ? (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold mb-1">
                    {expiredDocs > 0 ? "Action Required: Documents Expired" : "Attention: Documents Expiring Soon"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {expiredDocs > 0 && `${expiredDocs} document(s) have expired and require immediate renewal. `}
                    {expiringDocs > 0 && `${expiringDocs} document(s) will expire within 60 days.`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">On-Time Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{performanceMetrics.onTimeDelivery}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Quality Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{performanceMetrics.qualityScore}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Contracts Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{performanceMetrics.contractsCompleted}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Active Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">{performanceMetrics.activeContracts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Development Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
                {supplierProfile.stage}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Company Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Registration Number</p>
                        <p className="font-medium">{supplierProfile.registrationNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Tax Number</p>
                        <p className="font-medium">{supplierProfile.taxNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{supplierProfile.category}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Classification</p>
                        <p className="font-medium">{supplierProfile.classification}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {supplierProfile.location}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Employees</p>
                        <p className="font-medium">{supplierProfile.employees}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        {supplierProfile.bwoOwned && <Badge className="bg-accent/10 text-accent border-accent/30">BWO</Badge>}
                        <Badge variant="secondary">{supplierProfile.classification}</Badge>
                        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
                          {supplierProfile.stage} Stage
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>On-Time Delivery Rate</span>
                          <span className="font-medium">{performanceMetrics.onTimeDelivery}%</span>
                        </div>
                        <Progress value={performanceMetrics.onTimeDelivery} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quality Acceptance Rate</span>
                          <span className="font-medium">{performanceMetrics.qualityScore}%</span>
                        </div>
                        <Progress value={performanceMetrics.qualityScore} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="w-5 h-5 text-accent" />
                          Compliance Documents
                        </CardTitle>
                        <CardDescription>Manage your compliance documentation</CardDescription>
                      </div>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Document</th>
                            <th className="text-left py-3 px-4 font-medium">Upload Date</th>
                            <th className="text-left py-3 px-4 font-medium">Expiry Date</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                            <th className="text-right py-3 px-4 font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documentStatus.map((doc) => (
                            <tr key={doc.name} className="border-b hover:bg-accent/5">
                              <td className="py-3 px-4 font-medium">{doc.name}</td>
                              <td className="py-3 px-4 text-muted-foreground">
                                {new Date(doc.uploadDate).toLocaleDateString("en-ZA")}
                              </td>
                              <td className="py-3 px-4">
                                <span className={doc.status === "Expired" ? "text-red-600 font-medium" : doc.status === "Expiring Soon" ? "text-orange-600 font-medium" : ""}>
                                  {new Date(doc.expiryDate).toLocaleDateString("en-ZA")}
                                </span>
                              </td>
                              <td className="py-3 px-4">{getStatusBadge(doc.status)}</td>
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
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Opportunities Tab */}
              <TabsContent value="opportunities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-accent" />
                      Available Opportunities
                    </CardTitle>
                    <CardDescription>Tender opportunities matching your profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {opportunities.map((opp) => (
                      <Card key={opp.id} className="border">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{opp.title}</h4>
                              <p className="text-sm text-muted-foreground">{opp.category}</p>
                            </div>
                            <Badge className="bg-green-500/10 text-green-700 border-green-500/30">{opp.status}</Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm mb-4">
                            <div>
                              <span className="text-muted-foreground">Value:</span>{" "}
                              <span className="font-medium">{opp.value}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Deadline:</span>{" "}
                              <span className="font-medium">{new Date(opp.deadline).toLocaleDateString("en-ZA")}</span>
                            </div>
                          </div>
                          <Button className="w-full">View Details & Apply</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Training Tab */}
              <TabsContent value="training" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-accent" />
                      Skills Development History
                    </CardTitle>
                    <CardDescription>Training programmes completed by your employees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trainingHistory.map((training, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{training.programme}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(training.date).toLocaleDateString("en-ZA", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
                              {training.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span>{training.beneficiaries} employees trained</span>
                            </div>
                            {training.certificate && (
                              <div className="flex items-center gap-1 text-accent">
                                <Award className="w-4 h-4" />
                                <span>Certificate issued</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{supplierProfile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{supplierProfile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{supplierProfile.location}</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.type === "urgent"
                        ? "bg-red-500/5 border-red-500/30"
                        : notification.type === "warning"
                          ? "bg-orange-500/5 border-orange-500/30"
                          : "bg-muted/50"
                    }`}
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.date).toLocaleDateString("en-ZA")}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ESD Manager Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your ESD Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Molefe</p>
                    <p className="text-sm text-muted-foreground">ESD Practitioner</p>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <p className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                          sarah.molefe@esdplatform.co.za
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    +27 14 555 0001
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Request Meeting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
