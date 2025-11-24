"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, MapPin, Star, Search, Filter, X } from "lucide-react"

const suppliers = [
  {
    id: 1,
    name: "African Mining Supplies",
    category: "Equipment Supply",
    location: "Limpopo",
    rating: 4.8,
    verified: true,
    bwo: true,
    youth: false,
    women: true,
    classification: "QSE",
    journeyStage: "Take-off",
  },
  {
    id: 2,
    name: "Platinum Transport Services",
    category: "Transport & Logistics",
    location: "North West",
    rating: 4.6,
    verified: true,
    bwo: true,
    youth: true,
    women: false,
    classification: "EME",
    journeyStage: "Growth",
  },
  {
    id: 3,
    name: "Elite Security Solutions",
    category: "Security Services",
    location: "Gauteng",
    rating: 4.9,
    verified: true,
    bwo: true,
    youth: false,
    women: false,
    classification: "QSE",
    journeyStage: "Take-off",
  },
  {
    id: 4,
    name: "Themba Engineering Works",
    category: "Engineering & Maintenance",
    location: "Mpumalanga",
    rating: 4.7,
    verified: true,
    bwo: true,
    youth: true,
    women: false,
    classification: "QSE",
    journeyStage: "Advance",
  },
  {
    id: 5,
    name: "Nkosi Industrial Cleaning",
    category: "Facilities Management",
    location: "Limpopo",
    rating: 4.5,
    verified: true,
    bwo: true,
    youth: false,
    women: true,
    classification: "EME",
    journeyStage: "Growth",
  },
  {
    id: 6,
    name: "Vukani Construction & Civil",
    category: "Construction Services",
    location: "North West",
    rating: 4.8,
    verified: true,
    bwo: true,
    youth: false,
    women: false,
    classification: "QSE",
    journeyStage: "Exit",
  },
  {
    id: 7,
    name: "Sibusiso IT Solutions",
    category: "IT & Technology",
    location: "Gauteng",
    rating: 4.9,
    verified: true,
    bwo: true,
    youth: true,
    women: false,
    classification: "EME",
    journeyStage: "Foundation",
  },
  {
    id: 8,
    name: "Ubuntu Catering Services",
    category: "Catering & Hospitality",
    location: "Limpopo",
    rating: 4.6,
    verified: true,
    bwo: true,
    youth: false,
    women: true,
    classification: "EME",
    journeyStage: "Growth",
  },
  {
    id: 9,
    name: "Mzansi Safety Equipment",
    category: "Safety & PPE",
    location: "Gauteng",
    rating: 4.7,
    verified: true,
    bwo: true,
    youth: true,
    women: true,
    classification: "QSE",
    journeyStage: "Advance",
  },
  {
    id: 10,
    name: "Thabo Electrical Contractors",
    category: "Electrical Services",
    location: "Mpumalanga",
    rating: 4.4,
    verified: true,
    bwo: true,
    youth: false,
    women: false,
    classification: "EME",
    journeyStage: "Foundation",
  },
  {
    id: 11,
    name: "Madiba Environmental Services",
    category: "Environmental Management",
    location: "North West",
    rating: 4.8,
    verified: true,
    bwo: true,
    youth: false,
    women: true,
    classification: "QSE",
    journeyStage: "Take-off",
  },
  {
    id: 12,
    name: "Zulu Drilling & Blasting",
    category: "Drilling Services",
    location: "Limpopo",
    rating: 4.9,
    verified: true,
    bwo: true,
    youth: false,
    women: false,
    classification: "QSE",
    journeyStage: "Exit",
  },
  {
    id: 13,
    name: "Nokuthula Training Academy",
    category: "Training & Development",
    location: "Gauteng",
    rating: 4.6,
    verified: true,
    bwo: true,
    youth: true,
    women: true,
    classification: "EME",
    journeyStage: "Advance",
  },
  {
    id: 14,
    name: "Mandela Plant Hire",
    category: "Equipment Rental",
    location: "North West",
    rating: 4.7,
    verified: true,
    bwo: true,
    youth: false,
    women: false,
    classification: "QSE",
    journeyStage: "Take-off",
  },
  {
    id: 15,
    name: "Lungile Laboratory Services",
    category: "Laboratory & Testing",
    location: "Mpumalanga",
    rating: 4.8,
    verified: true,
    bwo: true,
    youth: true,
    women: false,
    classification: "QSE",
    journeyStage: "Advance",
  },
  {
    id: 16,
    name: "Nomvula Uniforms & Workwear",
    category: "Uniforms & Apparel",
    location: "Gauteng",
    rating: 4.5,
    verified: false,
    bwo: true,
    youth: false,
    women: true,
    classification: "EME",
    journeyStage: "Growth",
  },
  {
    id: 17,
    name: "Bafana Ground Support Systems",
    category: "Ground Support",
    location: "Limpopo",
    rating: 4.9,
    verified: true,
    bwo: true,
    youth: false,
    women: false,
    classification: "QSE",
    journeyStage: "Take-off",
  },
  {
    id: 18,
    name: "Zanele Pump & Hydraulics",
    category: "Hydraulic Services",
    location: "North West",
    rating: 4.6,
    verified: true,
    bwo: true,
    youth: true,
    women: true,
    classification: "EME",
    journeyStage: "Foundation",
  },
  {
    id: 19,
    name: "Bokamoso Steel Fabrication",
    category: "Steel Fabrication",
    location: "Free State",
    rating: 4.3,
    verified: false,
    bwo: true,
    youth: true,
    women: false,
    classification: "EME",
    journeyStage: "Foundation",
  },
  {
    id: 20,
    name: "Lesedi Fire & Safety",
    category: "Fire Safety",
    location: "Western Cape",
    rating: 4.4,
    verified: false,
    bwo: false,
    youth: false,
    women: true,
    classification: "QSE",
    journeyStage: "Growth",
  },
  {
    id: 21,
    name: "Kgotso Consulting Engineers",
    category: "Engineering Consulting",
    location: "Gauteng",
    rating: 4.7,
    verified: false,
    bwo: true,
    youth: true,
    women: false,
    classification: "QSE",
    journeyStage: "Advance",
  },
]

const getJourneyStageColor = (stage: string) => {
  switch (stage) {
    case "Foundation":
      return "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/30"
    case "Growth":
      return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
    case "Advance":
      return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30"
    case "Take-off":
      return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30"
    case "Exit":
      return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30"
    default:
      return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/30"
  }
}

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedClassifications, setSelectedClassifications] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState<boolean | null>(null)
  const [selectedTransformation, setSelectedTransformation] = useState<string[]>([])

  const allStages = Array.from(new Set(suppliers.map((s) => s.journeyStage)))
  const allLocations = Array.from(new Set(suppliers.map((s) => s.location))).sort()
  const allCategories = Array.from(new Set(suppliers.map((s) => s.category))).sort()
  const allClassifications = ["EME", "QSE"]
  const transformationTypes = ["BWO", "Youth", "Women"]

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      !searchQuery ||
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStage = selectedStages.length === 0 || selectedStages.includes(supplier.journeyStage)

    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(supplier.location)

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(supplier.category)

    const matchesClassification =
      selectedClassifications.length === 0 || selectedClassifications.includes(supplier.classification)

    const matchesVerification = verifiedOnly === null || supplier.verified === verifiedOnly

    const matchesTransformation =
      selectedTransformation.length === 0 ||
      (selectedTransformation.includes("BWO") && supplier.bwo) ||
      (selectedTransformation.includes("Youth") && supplier.youth) ||
      (selectedTransformation.includes("Women") && supplier.women)

    return (
      matchesSearch &&
      matchesStage &&
      matchesLocation &&
      matchesCategory &&
      matchesClassification &&
      matchesVerification &&
      matchesTransformation
    )
  })

  const activeFilterCount =
    selectedStages.length +
    selectedLocations.length +
    selectedCategories.length +
    selectedClassifications.length +
    selectedTransformation.length +
    (verifiedOnly !== null ? 1 : 0)

  const clearAllFilters = () => {
    setSelectedStages([])
    setSelectedLocations([])
    setSelectedCategories([])
    setSelectedClassifications([])
    setSelectedTransformation([])
    setVerifiedOnly(null)
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Supplier Directory</h1>
          <p className="text-muted-foreground text-lg">Browse and manage registered suppliers</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers by name, category, or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Journey Stage
                {selectedStages.length > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-2">
                    {selectedStages.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Stage</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allStages.map((stage) => (
                <DropdownMenuCheckboxItem
                  key={stage}
                  checked={selectedStages.includes(stage)}
                  onCheckedChange={(checked) => {
                    setSelectedStages(checked ? [...selectedStages, stage] : selectedStages.filter((s) => s !== stage))
                  }}
                >
                  {stage}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Verification
                {verifiedOnly !== null && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-2">
                    1
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={verifiedOnly === true}
                onCheckedChange={(checked) => {
                  setVerifiedOnly(checked ? true : null)
                }}
              >
                Verified
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={verifiedOnly === false}
                onCheckedChange={(checked) => {
                  setVerifiedOnly(checked ? false : null)
                }}
              >
                Pending Verification
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Geography
                {selectedLocations.length > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-2">
                    {selectedLocations.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Location</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allLocations.map((location) => (
                <DropdownMenuCheckboxItem
                  key={location}
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={(checked) => {
                    setSelectedLocations(
                      checked ? [...selectedLocations, location] : selectedLocations.filter((l) => l !== location),
                    )
                  }}
                >
                  {location}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Category
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-2">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(
                      checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category),
                    )
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Classification
                {selectedClassifications.length > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-2">
                    {selectedClassifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Classification</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allClassifications.map((classification) => (
                <DropdownMenuCheckboxItem
                  key={classification}
                  checked={selectedClassifications.includes(classification)}
                  onCheckedChange={(checked) => {
                    setSelectedClassifications(
                      checked
                        ? [...selectedClassifications, classification]
                        : selectedClassifications.filter((c) => c !== classification),
                    )
                  }}
                >
                  {classification}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Transformation
                {selectedTransformation.length > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-2">
                    {selectedTransformation.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {transformationTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTransformation.includes(type)}
                  onCheckedChange={(checked) => {
                    setSelectedTransformation(
                      checked ? [...selectedTransformation, type] : selectedTransformation.filter((t) => t !== type),
                    )
                  }}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {activeFilterCount > 0 && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
            </span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1 h-7 text-xs">
              <X className="w-3 h-3" />
              Clear all
            </Button>
          </div>
        )}

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredSuppliers.length} of {suppliers.length} suppliers
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                  {supplier.verified ? (
                    <Badge className="bg-accent">Verified</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-500/30">
                      Pending Verification
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{supplier.name}</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                  <span>{supplier.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {supplier.location}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold">{supplier.rating}</span>
                  <span className="text-muted-foreground text-sm">/5.0</span>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">ESD Journey Stage</p>
                  <Badge className={getJourneyStageColor(supplier.journeyStage)} variant="outline">
                    {supplier.journeyStage}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {supplier.bwo && <Badge variant="secondary">BWO</Badge>}
                  {supplier.youth && <Badge variant="secondary">Youth</Badge>}
                  {supplier.women && <Badge variant="secondary">Women</Badge>}
                  <Badge variant="outline">{supplier.classification}</Badge>
                </div>

                <Link href={`/suppliers/${supplier.id}`}>
                  <Button className="w-full">View Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No suppliers match your filters</p>
            <Button variant="link" onClick={clearAllFilters} className="mt-2">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
