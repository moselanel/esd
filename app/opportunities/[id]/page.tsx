"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, MapPin, Star, CheckCircle2, Calendar, DollarSign, Briefcase, ArrowLeft, Search } from "lucide-react"

const matchedSuppliers = [
  {
    id: 1,
    name: "African Mining Supplies",
    category: "Equipment Supply",
    location: "Limpopo",
    rating: 4.8,
    matchScore: 98,
    verified: true,
    bwo: true,
    youth: false,
    women: true,
    classification: "QSE",
    capabilities: ["Equipment Supply", "Maintenance & Repair", "Technical Support"],
    compliance: "All Valid",
  },
  {
    id: 2,
    name: "Prime Equipment Solutions",
    category: "Equipment Supply",
    location: "Gauteng",
    rating: 4.7,
    matchScore: 95,
    verified: true,
    bwo: true,
    youth: true,
    women: false,
    classification: "EME",
    capabilities: ["Equipment Supply", "Installation", "Training"],
    compliance: "All Valid",
  },
  {
    id: 3,
    name: "Superior Mining Tech",
    category: "Equipment Supply",
    location: "North West",
    rating: 4.9,
    matchScore: 92,
    verified: true,
    bwo: true,
    youth: false,
    women: true,
    classification: "QSE",
    capabilities: ["Equipment Supply", "Maintenance & Repair"],
    compliance: "All Valid",
  },
]

export default function OpportunityMatchesPage() {
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([])
  const [filterBWO, setFilterBWO] = useState(false)
  const [filterYouth, setFilterYouth] = useState(false)
  const [filterWomen, setFilterWomen] = useState(false)

  const opportunity = {
    id: 1,
    title: "Mining Equipment Supply - Platinum Project",
    category: "Equipment Supply",
    location: "Limpopo",
    budget: "R5M - R10M",
    deadline: "2024-12-30",
    description:
      "Supply and maintenance of mining equipment for our Platinum operations including drill bits, safety gear, pumps, and ventilation systems.",
    requiredCapabilities: ["Equipment Supply", "Maintenance & Repair"],
  }

  const toggleSupplier = (id: number) => {
    setSelectedSuppliers((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const filteredSuppliers = matchedSuppliers.filter((supplier) => {
    if (filterBWO && !supplier.bwo) return false
    if (filterYouth && !supplier.youth) return false
    if (filterWomen && !supplier.women) return false
    return true
  })

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <Link href="/opportunities">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Opportunities
          </Button>
        </Link>

        {/* Opportunity Details */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl mb-2">{opportunity.title}</CardTitle>
                <p className="text-muted-foreground">{opportunity.description}</p>
              </div>
              <Badge className="bg-accent w-fit">Open</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
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

            <div className="flex flex-wrap gap-2 mt-4">
              {opportunity.requiredCapabilities.map((cap) => (
                <Badge key={cap} variant="outline">
                  {cap}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Matched Suppliers Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Matched Suppliers ({filteredSuppliers.length})</h2>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search suppliers..." className="pl-10" />
            </div>

            <Card className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-bwo"
                    checked={filterBWO}
                    onCheckedChange={(checked) => setFilterBWO(checked as boolean)}
                  />
                  <label htmlFor="filter-bwo" className="text-sm font-medium">
                    BWO Only
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-youth"
                    checked={filterYouth}
                    onCheckedChange={(checked) => setFilterYouth(checked as boolean)}
                  />
                  <label htmlFor="filter-youth" className="text-sm font-medium">
                    Youth-Owned
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-women"
                    checked={filterWomen}
                    onCheckedChange={(checked) => setFilterWomen(checked as boolean)}
                  />
                  <label htmlFor="filter-women" className="text-sm font-medium">
                    Women-Owned
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Supplier Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className={`hover:border-accent/50 transition-colors ${
                  selectedSuppliers.includes(supplier.id) ? "border-accent border-2" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {supplier.verified && (
                        <Badge className="bg-accent">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <Badge variant="secondary" className="font-bold">
                        {supplier.matchScore}% Match
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <span>{supplier.category}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {supplier.location}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">{supplier.rating}</span>
                    <span className="text-muted-foreground text-sm">/5.0</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {supplier.bwo && <Badge variant="secondary">BWO</Badge>}
                    {supplier.youth && <Badge variant="secondary">Youth</Badge>}
                    {supplier.women && <Badge variant="secondary">Women</Badge>}
                    <Badge variant="outline">{supplier.classification}</Badge>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Capabilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {supplier.capabilities.map((cap) => (
                        <Badge key={cap} variant="outline" className="text-xs">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <Link href={`/suppliers/${supplier.id}`}>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      className="w-full"
                      variant={selectedSuppliers.includes(supplier.id) ? "default" : "secondary"}
                      onClick={() => toggleSupplier(supplier.id)}
                    >
                      {selectedSuppliers.includes(supplier.id) ? "Selected" : "Select Supplier"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSuppliers.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No suppliers match your current filters.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Bar */}
        {selectedSuppliers.length > 0 && (
          <Card className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl shadow-lg border-2 border-accent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {selectedSuppliers.length} supplier{selectedSuppliers.length > 1 ? "s" : ""} selected
                  </p>
                  <p className="text-sm text-muted-foreground">Ready to invite to tender</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedSuppliers([])}>
                    Clear
                  </Button>
                  <Button>Send Invitation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
