"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, DollarSign, Briefcase, Plus, Search, Clock, CheckCircle2, Trophy } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const opportunities = [
  {
    id: 1,
    title: "Mining Equipment Supply - Platinum Project",
    category: "Equipment Supply",
    location: "Limpopo",
    budget: "R5M - R10M",
    deadline: "2024-12-30",
    status: "open",
    matchedSuppliers: 24,
    requiredCapabilities: ["Equipment Supply", "Maintenance & Repair"],
    description: "Supply and maintenance of mining equipment for our Platinum operations.",
    postedDate: "2024-11-15",
  },
  {
    id: 2,
    title: "Transport & Logistics Services",
    category: "Transport & Logistics",
    location: "North West",
    budget: "R2M - R5M",
    deadline: "2024-12-20",
    status: "closing-soon",
    matchedSuppliers: 18,
    requiredCapabilities: ["Hauling & Transport", "Fleet Management"],
    description: "Comprehensive transport services for ore and materials.",
    postedDate: "2024-11-10",
  },
  {
    id: 3,
    title: "Security Services - 24/7 Site Protection",
    category: "Security Services",
    location: "Gauteng",
    budget: "R3M - R7M",
    deadline: "2025-01-15",
    status: "open",
    matchedSuppliers: 12,
    requiredCapabilities: ["Security Services", "Access Control"],
    description: "Comprehensive security services for mining sites and facilities.",
    postedDate: "2024-11-18",
  },
  {
    id: 4,
    title: "Construction & Engineering Project",
    category: "Construction",
    location: "Mpumalanga",
    budget: "R10M - R20M",
    deadline: "2024-11-25",
    status: "closing-soon",
    matchedSuppliers: 8,
    requiredCapabilities: ["Construction", "Engineering"],
    description: "New facility construction for processing operations.",
    postedDate: "2024-10-20",
  },
  {
    id: 5,
    title: "Catering Services - Site Canteen",
    category: "Catering Services",
    location: "Northern Cape",
    budget: "R500K - R2M",
    deadline: "2024-10-30",
    status: "awarded",
    matchedSuppliers: 15,
    requiredCapabilities: ["Catering Services"],
    description: "Daily catering services for 500+ employees.",
    postedDate: "2024-09-15",
  },
]

export default function OpportunitiesPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredOpportunities = opportunities.filter((opp) => {
    if (statusFilter !== "all" && opp.status !== statusFilter) return false
    if (categoryFilter !== "all" && opp.category !== categoryFilter) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-accent text-accent-foreground"
      case "closing-soon":
        return "bg-orange-500 text-white"
      case "awarded":
        return "bg-green-600 text-white"
      default:
        return "bg-secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Briefcase className="w-3 h-3" />
      case "closing-soon":
        return <Clock className="w-3 h-3" />
      case "awarded":
        return <Trophy className="w-3 h-3" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Procurement Opportunities</h1>
            <p className="text-muted-foreground text-lg">Browse and match suppliers with active opportunities</p>
          </div>

          <Link href="/opportunities/new">
            <Button size="lg" className="gap-2 mt-4 md:mt-0">
              <Plus className="w-5 h-5" />
              Post Opportunity
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search opportunities..." className="pl-10" />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closing-soon">Closing Soon</SelectItem>
              <SelectItem value="awarded">Awarded</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Equipment Supply">Equipment Supply</SelectItem>
              <SelectItem value="Transport & Logistics">Transport</SelectItem>
              <SelectItem value="Security Services">Security</SelectItem>
              <SelectItem value="Construction">Construction</SelectItem>
              <SelectItem value="Catering Services">Catering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">
                  {opportunities.filter((o) => o.status === "open").length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Open</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">
                  {opportunities.filter((o) => o.status === "closing-soon").length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Closing Soon</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {opportunities.filter((o) => o.status === "awarded").length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Awarded</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{opportunities.reduce((sum, o) => sum + o.matchedSuppliers, 0)}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Matches</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{opportunity.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(opportunity.status)}>
                    {getStatusIcon(opportunity.status)}
                    <span className="ml-1 capitalize">{opportunity.status.replace("-", " ")}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{opportunity.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>{opportunity.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Closes: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {opportunity.requiredCapabilities.map((cap) => (
                    <Badge key={cap} variant="outline">
                      {cap}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>{opportunity.matchedSuppliers} matched suppliers</span>
                  </div>

                  <Link href={`/opportunities/${opportunity.id}`}>
                    <Button>View Matches</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No opportunities found matching your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
