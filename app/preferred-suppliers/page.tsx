"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Building2,
  XCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

// Mock preferred suppliers data
const preferredSuppliers = [
  {
    id: 1,
    name: "Thabo Industrial Supplies",
    category: "Equipment Supply",
    location: "Rustenburg, North West",
    classification: "QSE",
    bwoOwned: true,
    rating: 4.8,
    status: "Active",
    contractValue: "R 2.5M",
    expiryDate: "2025-06-30",
    onTimeDelivery: 96,
    qualityScore: 98.5,
    email: "info@thaboindustrial.co.za",
    phone: "+27 14 555 0123",
  },
  {
    id: 2,
    name: "Limpopo Logistics",
    category: "Transport & Logistics",
    location: "Polokwane, Limpopo",
    classification: "QSE",
    bwoOwned: true,
    rating: 4.6,
    status: "Active",
    contractValue: "R 1.8M",
    expiryDate: "2025-03-15",
    onTimeDelivery: 94,
    qualityScore: 96.2,
    email: "logistics@limlog.co.za",
    phone: "+27 15 555 0456",
  },
  {
    id: 3,
    name: "SafeGuard Security",
    category: "Security",
    location: "Johannesburg, Gauteng",
    classification: "EME",
    bwoOwned: true,
    rating: 4.5,
    status: "Active",
    contractValue: "R 1.2M",
    expiryDate: "2025-08-20",
    onTimeDelivery: 99,
    qualityScore: 97.8,
    email: "ops@safeguard.co.za",
    phone: "+27 11 555 0789",
  },
  {
    id: 4,
    name: "Bafokeng Catering",
    category: "Catering",
    location: "Phokeng, North West",
    classification: "EME",
    bwoOwned: true,
    rating: 4.7,
    status: "Active",
    contractValue: "R 950K",
    expiryDate: "2025-01-31",
    onTimeDelivery: 98,
    qualityScore: 99.1,
    email: "catering@bafokeng.co.za",
    phone: "+27 14 555 0234",
  },
  {
    id: 5,
    name: "TechServe Solutions",
    category: "Professional Services",
    location: "Pretoria, Gauteng",
    classification: "QSE",
    bwoOwned: false,
    rating: 4.4,
    status: "Under Review",
    contractValue: "R 2.1M",
    expiryDate: "2024-12-31",
    onTimeDelivery: 91,
    qualityScore: 93.5,
    email: "info@techserve.co.za",
    phone: "+27 12 555 0567",
  },
  {
    id: 6,
    name: "Mokopane Construction",
    category: "Construction",
    location: "Mokopane, Limpopo",
    classification: "Large",
    bwoOwned: true,
    rating: 4.9,
    status: "Active",
    contractValue: "R 8.5M",
    expiryDate: "2025-12-31",
    onTimeDelivery: 97,
    qualityScore: 98.9,
    email: "projects@mokcon.co.za",
    phone: "+27 15 555 0890",
  },
]

export default function PreferredSuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSuppliers = preferredSuppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || supplier.category === categoryFilter
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [...new Set(preferredSuppliers.map(s => s.category))]
  const totalActive = preferredSuppliers.filter(s => s.status === "Active").length
  const totalValue = preferredSuppliers.reduce((acc, s) => {
    const value = parseFloat(s.contractValue.replace(/[R ,KM]/g, ""))
    return acc + (s.contractValue.includes("K") ? value * 1000 : s.contractValue.includes("M") ? value * 1000000 : value)
  }, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-700 border-green-500/30">Active</Badge>
      case "Under Review":
        return <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/30">Under Review</Badge>
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Preferred Suppliers</h1>
            <p className="text-muted-foreground text-lg">Manage your approved supplier list</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Supplier
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Preferred</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{preferredSuppliers.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Active Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{totalActive}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Contract Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">R {(totalValue / 1000000).toFixed(1)}M</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Avg. Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-accent text-accent" />
                <p className="text-3xl font-bold">
                  {(preferredSuppliers.reduce((acc, s) => acc + s.rating, 0) / preferredSuppliers.length).toFixed(1)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search suppliers..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {supplier.location}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(supplier.status)}
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-bold">{supplier.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{supplier.category}</Badge>
                  <Badge variant="outline">{supplier.classification}</Badge>
                  {supplier.bwoOwned && <Badge className="bg-accent/10 text-accent border-accent/30">BWO</Badge>}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Contract Value</p>
                    <p className="font-semibold">{supplier.contractValue}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expires</p>
                    <p className="font-semibold">{new Date(supplier.expiryDate).toLocaleDateString("en-ZA", { month: "short", year: "numeric" })}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">On-Time Delivery</p>
                    <p className="font-semibold text-green-600">{supplier.onTimeDelivery}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quality Score</p>
                    <p className="font-semibold text-green-600">{supplier.qualityScore}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/suppliers/${supplier.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <Card className="p-12 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">No suppliers found</p>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </Card>
        )}
      </div>
    </div>
  )
}
