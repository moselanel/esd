"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Settings,
  Building2,
  Target,
  Bell,
  Users,
  Shield,
  Save,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react"

// Sector codes for B-BBEE
const sectorCodes = [
  { code: "Mining", description: "Mining and Quarrying Sector Code", version: "Amendment Gazette 44890" },
  { code: "Generic", description: "Generic Codes of Good Practice", version: "Amendment Gazette 42496" },
  { code: "Construction", description: "Construction Sector Code", version: "Amendment Gazette 40175" },
  { code: "Finance", description: "Financial Sector Code", version: "Amendment Gazette 40917" },
  { code: "ICT", description: "Information and Communication Technology Sector Code", version: "Amendment Gazette 39677" },
  { code: "Transport", description: "Transport Sector Code", version: "Amendment Gazette 40018" },
  { code: "Agriculture", description: "Agri-BEE Sector Code", version: "Amendment Gazette 40408" },
  { code: "Tourism", description: "Tourism Sector Code", version: "Amendment Gazette 40716" },
]

// Scorecard element targets by sector code
const scorecardTargets = {
  Mining: [
    { element: "Ownership", weight: 25, target: 25 },
    { element: "Management Control", weight: 19, target: 19 },
    { element: "Skills Development", weight: 20, target: 20 },
    { element: "Enterprise & Supplier Dev", weight: 40, target: 40 },
    { element: "Socio-Economic Dev", weight: 5, target: 5 },
  ],
  Generic: [
    { element: "Ownership", weight: 25, target: 25 },
    { element: "Management Control", weight: 19, target: 19 },
    { element: "Skills Development", weight: 25, target: 25 },
    { element: "Enterprise & Supplier Dev", weight: 44, target: 44 },
    { element: "Socio-Economic Dev", weight: 5, target: 5 },
  ],
}

export default function SettingsPage() {
  const [selectedSectorCode, setSelectedSectorCode] = useState("Mining")
  const [annualTarget, setAnnualTarget] = useState("20250000")
  const [notifyExpiry, setNotifyExpiry] = useState(true)
  const [expiryDays, setExpiryDays] = useState([60])
  const [autoVerify, setAutoVerify] = useState(true)
  const [verifyFrequency, setVerifyFrequency] = useState("48")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Custom targets state
  const [customTargets, setCustomTargets] = useState(scorecardTargets.Mining)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleSectorChange = (sector: string) => {
    setSelectedSectorCode(sector)
    if (sector in scorecardTargets) {
      setCustomTargets(scorecardTargets[sector as keyof typeof scorecardTargets])
    }
  }

  const selectedSector = sectorCodes.find(s => s.code === selectedSectorCode)

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Platform Settings</h1>
            <p className="text-muted-foreground text-lg">Configure your ESD platform preferences</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            {saveSuccess && (
              <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Settings saved
              </Badge>
            )}
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="scorecard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
            <TabsTrigger value="scorecard">B-BBEE Scorecard</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          {/* B-BBEE Scorecard Settings */}
          <TabsContent value="scorecard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Sector Code Selection
                </CardTitle>
                <CardDescription>
                  Select the applicable B-BBEE sector code for your organisation. This determines the scorecard element weightings and targets.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Applicable Sector Code</Label>
                    <Select value={selectedSectorCode} onValueChange={handleSectorChange}>
                      <SelectTrigger className="w-full md:w-[400px]">
                        <SelectValue placeholder="Select sector code" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectorCodes.map((sector) => (
                          <SelectItem key={sector.code} value={sector.code}>
                            {sector.code} - {sector.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSector && (
                    <div className="bg-muted/50 border rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-accent mt-0.5" />
                        <div>
                          <p className="font-medium">{selectedSector.description}</p>
                          <p className="text-sm text-muted-foreground">{selectedSector.version}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scorecard Element Targets */}
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold">Scorecard Element Weightings</h4>
                  <p className="text-sm text-muted-foreground">
                    These are the default weightings for the selected sector code. You can adjust custom targets below.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Element</th>
                          <th className="text-center py-3 px-4 font-medium">Weighting</th>
                          <th className="text-center py-3 px-4 font-medium">Target</th>
                          <th className="text-center py-3 px-4 font-medium">Custom Target</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customTargets.map((item, index) => (
                          <tr key={item.element} className="border-b">
                            <td className="py-3 px-4 font-medium">{item.element}</td>
                            <td className="py-3 px-4 text-center">{item.weight}</td>
                            <td className="py-3 px-4 text-center">{item.target}</td>
                            <td className="py-3 px-4 text-center">
                              <Input
                                type="number"
                                className="w-20 mx-auto text-center"
                                value={item.target}
                                onChange={(e) => {
                                  const newTargets = [...customTargets]
                                  newTargets[index].target = parseFloat(e.target.value) || 0
                                  setCustomTargets(newTargets)
                                }}
                                max={item.weight}
                                min={0}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-muted/50">
                          <td className="py-3 px-4 font-bold">Total</td>
                          <td className="py-3 px-4 text-center font-bold">
                            {customTargets.reduce((acc, item) => acc + item.weight, 0)}
                          </td>
                          <td className="py-3 px-4 text-center font-bold">
                            {customTargets.reduce((acc, item) => acc + item.target, 0)}
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-accent">
                            {customTargets.reduce((acc, item) => acc + item.target, 0)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Targets Settings */}
          <TabsContent value="targets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  ESD Spend Targets
                </CardTitle>
                <CardDescription>
                  Set your annual and periodic ESD spend targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Annual ESD Spend Target (R)</Label>
                    <Input
                      type="number"
                      value={annualTarget}
                      onChange={(e) => setAnnualTarget(e.target.value)}
                      placeholder="20250000"
                    />
                    <p className="text-sm text-muted-foreground">
                      Current: R {(parseFloat(annualTarget) / 1000000).toFixed(2)}M
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Financial Year End</Label>
                    <Select defaultValue="december">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="december">December</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                        <SelectItem value="june">June</SelectItem>
                        <SelectItem value="september">September</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold">Category-Specific Targets</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>BWO Spend Target (%)</Label>
                      <Input type="number" placeholder="70" defaultValue="70" />
                    </div>
                    <div className="space-y-2">
                      <Label>SMME Spend Target (%)</Label>
                      <Input type="number" placeholder="80" defaultValue="80" />
                    </div>
                    <div className="space-y-2">
                      <Label>Youth-Owned Target (%)</Label>
                      <Input type="number" placeholder="30" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Women-Owned Target (%)</Label>
                      <Input type="number" placeholder="50" defaultValue="50" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-accent" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure alerts and notifications for compliance and document expiry
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Document Expiry Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when supplier documents are about to expire
                    </p>
                  </div>
                  <Switch checked={notifyExpiry} onCheckedChange={setNotifyExpiry} />
                </div>

                {notifyExpiry && (
                  <div className="space-y-4 pl-4 border-l-2 border-accent/30">
                    <div className="space-y-2">
                      <Label>Notify {expiryDays[0]} days before expiry</Label>
                      <Slider
                        value={expiryDays}
                        onValueChange={setExpiryDays}
                        min={7}
                        max={90}
                        step={7}
                        className="w-full md:w-[300px]"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-0.5">
                    <Label>Target Progress Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly updates on ESD spend target progress
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Supplier Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new suppliers register on the portal
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Verification Failure Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Immediate notification when automated verifications fail
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Settings */}
          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Automated Verification Settings
                </CardTitle>
                <CardDescription>
                  Configure automatic supplier verification checks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automated Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically verify suppliers against government databases
                    </p>
                  </div>
                  <Switch checked={autoVerify} onCheckedChange={setAutoVerify} />
                </div>

                {autoVerify && (
                  <div className="space-y-4 pl-4 border-l-2 border-accent/30">
                    <div className="space-y-2">
                      <Label>Verification Frequency</Label>
                      <Select value={verifyFrequency} onValueChange={setVerifyFrequency}>
                        <SelectTrigger className="w-full md:w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24">Every 24 hours</SelectItem>
                          <SelectItem value="48">Every 48 hours</SelectItem>
                          <SelectItem value="72">Every 72 hours</SelectItem>
                          <SelectItem value="168">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold">Verification Sources</h4>
                  <div className="space-y-3">
                    {[
                      { name: "CIPC (Companies Registration)", status: "Connected" },
                      { name: "SARS (Tax Compliance)", status: "Connected" },
                      { name: "COIDA (Compensation Fund)", status: "Connected" },
                      { name: "Bank Account Verification", status: "Connected" },
                      { name: "Home Affairs (ID Verification)", status: "Connected" },
                    ].map((source) => (
                      <div key={source.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <span>{source.name}</span>
                        <Badge className="bg-green-500/10 text-green-700 border-green-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {source.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
