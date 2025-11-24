"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  FileText,
  Users,
  Briefcase,
  Upload,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Account", icon: Users },
  { id: 2, title: "Business Details", icon: Building2 },
  { id: 3, title: "Classification", icon: FileText },
  { id: 4, title: "Capabilities", icon: Briefcase },
  { id: 5, title: "Compliance", icon: Upload },
  { id: 6, title: "Review", icon: CheckCircle2 },
]

type FormData = {
  // Step 1
  email: string
  phone: string
  otp: string
  password: string
  confirmPassword: string
  // Step 2
  companyName: string
  registrationNumber: string
  industry: string
  location: string
  yearsOperating: string
  // Step 3
  bwoOwned: boolean
  youthOwned: boolean
  womenOwned: boolean
  disabilityOwned: boolean
  classification: string
  // Step 4
  services: string[]
  employees: string
  maxContractSize: string
  equipment: string
  // Step 5
  documents: {
    taxClearance: { status: "missing" | "uploaded" | "expired"; file?: string }
    beeCertificate: { status: "missing" | "uploaded" | "expired"; file?: string }
    coida: { status: "missing" | "uploaded" | "expired"; file?: string }
    bankLetter: { status: "missing" | "uploaded" | "expired"; file?: string }
  }
}

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [otpSent, setOtpSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResults, setVerificationResults] = useState<{
    cipc?: { status: string; message: string }
    sars?: { status: string; message: string }
  }>({})
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    registrationNumber: "",
    industry: "",
    location: "",
    yearsOperating: "",
    bwoOwned: false,
    youthOwned: false,
    womenOwned: false,
    disabilityOwned: false,
    classification: "",
    services: [],
    employees: "",
    maxContractSize: "",
    equipment: "",
    documents: {
      taxClearance: { status: "missing" },
      beeCertificate: { status: "missing" },
      coida: { status: "missing" },
      bankLetter: { status: "missing" },
    },
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    alert("Application submitted for verification!")
  }

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleFileUpload = (docType: keyof FormData["documents"]) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: { status: "uploaded", file: "document.pdf" },
      },
    }))
  }

  const handleVerifyRegistration = async () => {
    if (!formData.registrationNumber) return

    setIsVerifying(true)
    setVerificationResults({})

    // Simulate CIPC verification API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock verification results
    const cipcResult = {
      status: "verified",
      message: "Company found and registered in good standing",
    }

    setVerificationResults((prev) => ({ ...prev, cipc: cipcResult }))

    // Auto-fill company name if verified
    if (cipcResult.status === "verified" && !formData.companyName) {
      updateFormData("companyName", "ABC Mining Supplies (Pty) Ltd")
    }

    setIsVerifying(false)
  }

  const handleVerifyTaxNumber = async () => {
    if (!formData.registrationNumber) return

    setIsVerifying(true)

    // Simulate SARS verification API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock verification results
    const sarsResult = {
      status: "verified",
      message: "Tax compliant - No outstanding returns",
    }

    setVerificationResults((prev) => ({ ...prev, sars: sarsResult }))
    setIsVerifying(false)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">SMME Supplier Onboarding</h1>
          <p className="text-muted-foreground">Complete your profile to join Bauba Resources ESD Network</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      currentStep > step.id
                        ? "bg-accent border-accent text-white"
                        : currentStep === step.id
                          ? "border-accent text-accent"
                          : "border-muted-foreground/30 text-muted-foreground",
                    )}
                  >
                    {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-2 text-center",
                      currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 transition-colors",
                      currentStep > step.id ? "bg-accent" : "bg-muted-foreground/30",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Account Creation */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.co.za"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+27 XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={() => setOtpSent(true)}>
                      Send OTP
                    </Button>
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      value={formData.otp}
                      onChange={(e) => updateFormData("otp", e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">OTP sent to {formData.phone}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., ABC Mining Supplies (Pty) Ltd"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Company Registration Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="registrationNumber"
                      placeholder="e.g., 2015/123456/07"
                      value={formData.registrationNumber}
                      onChange={(e) => {
                        updateFormData("registrationNumber", e.target.value)
                        setVerificationResults({})
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleVerifyRegistration}
                      disabled={!formData.registrationNumber || isVerifying}
                    >
                      {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4 mr-2" />}
                      Verify
                    </Button>
                  </div>
                  {verificationResults.cipc && (
                    <div
                      className={cn(
                        "flex items-start gap-2 p-3 rounded-lg text-sm border",
                        verificationResults.cipc.status === "verified"
                          ? "bg-green-500/10 border-green-500/30 text-green-700"
                          : "bg-red-500/10 border-red-500/30 text-red-700",
                      )}
                    >
                      {verificationResults.cipc.status === "verified" ? (
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium">CIPC Verification</p>
                        <p className="text-xs mt-0.5">{verificationResults.cipc.message}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry Sector</Label>
                    <Select value={formData.industry} onValueChange={(val) => updateFormData("industry", val)}>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mining">Mining Equipment & Supplies</SelectItem>
                        <SelectItem value="construction">Construction & Engineering</SelectItem>
                        <SelectItem value="transport">Transport & Logistics</SelectItem>
                        <SelectItem value="catering">Catering & Hospitality</SelectItem>
                        <SelectItem value="security">Security Services</SelectItem>
                        <SelectItem value="maintenance">Maintenance & Repair</SelectItem>
                        <SelectItem value="consulting">Professional Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Province/Location</Label>
                    <Select value={formData.location} onValueChange={(val) => updateFormData("location", val)}>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsOperating">Years Operating</Label>
                  <Input
                    id="yearsOperating"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.yearsOperating}
                    onChange={(e) => updateFormData("yearsOperating", e.target.value)}
                  />
                </div>

                {verificationResults.cipc?.status === "verified" && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          <Shield className="w-4 h-4 text-accent" />
                          Tax Compliance Check
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">Verify tax compliance status with SARS</p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleVerifyTaxNumber}
                        disabled={isVerifying}
                      >
                        {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Check SARS"}
                      </Button>
                    </div>
                    {verificationResults.sars && (
                      <div
                        className={cn(
                          "flex items-start gap-2 p-3 rounded-lg text-sm border bg-background",
                          verificationResults.sars.status === "verified" ? "border-green-500/30" : "border-red-500/30",
                        )}
                      >
                        {verificationResults.sars.status === "verified" ? (
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                        )}
                        <div>
                          <p className="font-medium">SARS Tax Status</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{verificationResults.sars.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Ownership & Classification */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Ownership Type</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bwo"
                        checked={formData.bwoOwned}
                        onCheckedChange={(checked) => updateFormData("bwoOwned", checked)}
                      />
                      <label
                        htmlFor="bwo"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Black-Owned Business (BWO) - 51%+ black ownership
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="youth"
                        checked={formData.youthOwned}
                        onCheckedChange={(checked) => updateFormData("youthOwned", checked)}
                      />
                      <label htmlFor="youth" className="text-sm font-medium leading-none">
                        Youth-Owned - 51%+ ownership by persons under 35
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="women"
                        checked={formData.womenOwned}
                        onCheckedChange={(checked) => updateFormData("womenOwned", checked)}
                      />
                      <label htmlFor="women" className="text-sm font-medium leading-none">
                        Women-Owned - 51%+ women ownership
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="disability"
                        checked={formData.disabilityOwned}
                        onCheckedChange={(checked) => updateFormData("disabilityOwned", checked)}
                      />
                      <label htmlFor="disability" className="text-sm font-medium leading-none">
                        Disability-Owned - 51%+ ownership by persons with disabilities
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="classification">Business Classification</Label>
                  <Select
                    value={formData.classification}
                    onValueChange={(val) => updateFormData("classification", val)}
                  >
                    <SelectTrigger id="classification">
                      <SelectValue placeholder="Select classification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eme">
                        EME (Exempted Micro Enterprise) - Annual turnover ≤ R10 million
                      </SelectItem>
                      <SelectItem value="qse">
                        QSE (Qualifying Small Enterprise) - Annual turnover R10-50 million
                      </SelectItem>
                      <SelectItem value="large">Large Enterprise - Annual turnover {">"} R50 million</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <strong>Note:</strong> Your ownership and classification details will be verified against your BEE
                    certificate and supporting documentation in the next steps.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Capability & Capacity */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Services Offered</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
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
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={() => toggleService(service)}
                        />
                        <label htmlFor={service} className="text-sm font-medium leading-none">
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Select value={formData.employees} onValueChange={(val) => updateFormData("employees", val)}>
                    <SelectTrigger id="employees">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxContractSize">Maximum Contract Size (ZAR)</Label>
                  <Select
                    value={formData.maxContractSize}
                    onValueChange={(val) => updateFormData("maxContractSize", val)}
                  >
                    <SelectTrigger id="maxContractSize">
                      <SelectValue placeholder="Select capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500k">R0 - R500,000</SelectItem>
                      <SelectItem value="500k-2m">R500,000 - R2 million</SelectItem>
                      <SelectItem value="2m-10m">R2 million - R10 million</SelectItem>
                      <SelectItem value="10m-50m">R10 million - R50 million</SelectItem>
                      <SelectItem value="50m+">R50 million+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment & Capabilities</Label>
                  <Textarea
                    id="equipment"
                    placeholder="Describe your equipment, facilities, certifications, and technical capabilities..."
                    rows={4}
                    value={formData.equipment}
                    onChange={(e) => updateFormData("equipment", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Compliance Uploads */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Upload required compliance documents. All documents must be valid and not expired.
                </p>

                {Object.entries(formData.documents).map(([key, doc]) => {
                  const docNames: Record<string, string> = {
                    taxClearance: "Tax Clearance Certificate",
                    beeCertificate: "BEE Certificate",
                    coida: "COIDA / WorkCover",
                    bankLetter: "Bank Confirmation Letter",
                  }

                  return (
                    <Card
                      key={key}
                      className={cn(
                        "border-2",
                        doc.status === "uploaded" && "border-accent/50",
                        doc.status === "expired" && "border-destructive/50",
                      )}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {doc.status === "uploaded" && <CheckCircle2 className="w-5 h-5 text-accent" />}
                            {doc.status === "missing" && <XCircle className="w-5 h-5 text-muted-foreground" />}
                            {doc.status === "expired" && <AlertCircle className="w-5 h-5 text-destructive" />}

                            <div>
                              <p className="font-medium">{docNames[key]}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={
                                    doc.status === "uploaded"
                                      ? "default"
                                      : doc.status === "expired"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {doc.status === "uploaded"
                                    ? "Uploaded"
                                    : doc.status === "expired"
                                      ? "Expired"
                                      : "Missing"}
                                </Badge>
                                {doc.file && <span className="text-sm text-muted-foreground">{doc.file}</span>}
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileUpload(key as keyof FormData["documents"])}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {doc.status === "uploaded" ? "Replace" : "Upload"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                <div className="bg-muted/50 border rounded-lg p-4 mt-4">
                  <p className="text-sm font-medium mb-2">Accepted file formats:</p>
                  <p className="text-sm text-muted-foreground">PDF, JPG, PNG (max 5MB per file)</p>
                </div>
              </div>
            )}

            {/* Step 6: Review & Submit */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    Ready for Submission
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Please review your information below before submitting for verification.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Account Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{formData.email || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{formData.phone || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Business Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company:</span>
                        <span className="font-medium">{formData.companyName || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Registration:</span>
                        <span className="font-medium">{formData.registrationNumber || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span className="font-medium">{formData.industry || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{formData.location || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Classification
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.bwoOwned && <Badge>BWO</Badge>}
                      {formData.youthOwned && <Badge>Youth-Owned</Badge>}
                      {formData.womenOwned && <Badge>Women-Owned</Badge>}
                      {formData.disabilityOwned && <Badge>Disability-Owned</Badge>}
                      {formData.classification && (
                        <Badge variant="secondary">{formData.classification.toUpperCase()}</Badge>
                      )}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Capabilities
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Services:</span>
                        <span className="font-medium">{formData.services.length} selected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Employees:</span>
                        <span className="font-medium">{formData.employees || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Contract:</span>
                        <span className="font-medium">{formData.maxContractSize || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                      Compliance Documents
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(formData.documents).map(([key, doc]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>
                          <Badge variant={doc.status === "uploaded" ? "default" : "secondary"}>{doc.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 border rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Next Steps:</strong> Your application will be reviewed by our verification team within 3-5
                    business days. You will receive an email notification once your profile is approved.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={nextStep} className="gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2">
              <Check className="w-4 h-4" />
              Submit for Verification
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
