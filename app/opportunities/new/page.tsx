"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewOpportunityPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    requiredCapabilities: [] as string[],
  })

  const capabilities = [
    "Equipment Supply",
    "Drilling & Blasting",
    "Hauling & Transport",
    "Maintenance & Repair",
    "Catering Services",
    "Cleaning Services",
    "Security Services",
    "IT & Technology",
    "Consulting",
    "Construction",
    "Training & Development",
    "Environmental Services",
  ]

  const toggleCapability = (capability: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredCapabilities: prev.requiredCapabilities.includes(capability)
        ? prev.requiredCapabilities.filter((c) => c !== capability)
        : [...prev.requiredCapabilities, capability],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Opportunity posted successfully! Matching suppliers...")
    router.push("/opportunities")
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/opportunities">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Opportunities
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Post New Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Opportunity Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Mining Equipment Supply - Platinum Project"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipment">Equipment Supply</SelectItem>
                    <SelectItem value="transport">Transport & Logistics</SelectItem>
                    <SelectItem value="construction">Construction & Engineering</SelectItem>
                    <SelectItem value="catering">Catering & Hospitality</SelectItem>
                    <SelectItem value="security">Security Services</SelectItem>
                    <SelectItem value="maintenance">Maintenance & Repair</SelectItem>
                    <SelectItem value="consulting">Professional Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the opportunity, requirements, and scope of work..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select
                  value={formData.location}
                  onValueChange={(val) => setFormData((prev) => ({ ...prev, location: val }))}
                  required
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gauteng">Gauteng</SelectItem>
                    <SelectItem value="limpopo">Limpopo</SelectItem>
                    <SelectItem value="northwest">North West</SelectItem>
                    <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                    <SelectItem value="kwazulu">KwaZulu-Natal</SelectItem>
                    <SelectItem value="northern">Northern Cape</SelectItem>
                    <SelectItem value="eastern">Eastern Cape</SelectItem>
                    <SelectItem value="western">Western Cape</SelectItem>
                    <SelectItem value="freestate">Free State</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Budget Range (Min) *</Label>
                  <Select
                    value={formData.budgetMin}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, budgetMin: val }))}
                    required
                  >
                    <SelectTrigger id="budgetMin">
                      <SelectValue placeholder="Minimum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">R 0</SelectItem>
                      <SelectItem value="500k">R 500,000</SelectItem>
                      <SelectItem value="1m">R 1 million</SelectItem>
                      <SelectItem value="2m">R 2 million</SelectItem>
                      <SelectItem value="5m">R 5 million</SelectItem>
                      <SelectItem value="10m">R 10 million</SelectItem>
                      <SelectItem value="20m">R 20 million</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Budget Range (Max) *</Label>
                  <Select
                    value={formData.budgetMax}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, budgetMax: val }))}
                    required
                  >
                    <SelectTrigger id="budgetMax">
                      <SelectValue placeholder="Maximum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500k">R 500,000</SelectItem>
                      <SelectItem value="1m">R 1 million</SelectItem>
                      <SelectItem value="2m">R 2 million</SelectItem>
                      <SelectItem value="5m">R 5 million</SelectItem>
                      <SelectItem value="10m">R 10 million</SelectItem>
                      <SelectItem value="20m">R 20 million</SelectItem>
                      <SelectItem value="50m">R 50 million+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Required Capabilities *</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  {capabilities.map((capability) => (
                    <div key={capability} className="flex items-center space-x-2">
                      <Checkbox
                        id={capability}
                        checked={formData.requiredCapabilities.includes(capability)}
                        onCheckedChange={() => toggleCapability(capability)}
                      />
                      <label htmlFor={capability} className="text-sm font-medium leading-none">
                        {capability}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 border rounded-lg p-4">
                <p className="text-sm">
                  <strong>Note:</strong> Once posted, the platform will automatically match this opportunity with
                  verified suppliers based on capabilities, compliance status, location, and transformation credentials.
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" size="lg" className="flex-1">
                  Post Opportunity & Find Matches
                </Button>
                <Link href="/opportunities">
                  <Button type="button" variant="outline" size="lg">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
