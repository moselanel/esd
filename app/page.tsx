import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, BarChart3, Network, Building2, TrendingUp, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/bauba-logo.png"
                  alt="Bauba Resources"
                  width={200}
                  height={53}
                  className="h-12 w-auto"
                />
                <span className="text-sm text-muted-foreground font-medium">ESD Platform</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Enterprise & Supplier Development</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              Transform Your Supply Chain, Empower Local SMMEs
            </h1>

            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
              Bauba Resources' comprehensive platform for managing supplier development, tracking transformation impact,
              and building inclusive procurement ecosystems in South Africa's mining and resources sector.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 text-lg px-8">
                  View Demo Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/onboard">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-transparent">
                  <Users className="w-5 h-5" />
                  Onboard a Supplier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact at a Glance */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">R 2.4B</div>
              <div className="text-sm text-muted-foreground">ESD Spend (YTD)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Active Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">82%</div>
              <div className="text-sm text-muted-foreground">BWO Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">5,680</div>
              <div className="text-sm text-muted-foreground">Jobs Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need to manage supplier development and measure transformation impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>SMME Onboarding</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Streamlined digital onboarding with automated verification, compliance tracking, and capability
                  profiling for SMMEs, EMEs, and QSEs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/onboard">
                  <Button variant="ghost" className="gap-2 w-full">
                    Start Onboarding
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Impact Dashboards</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Real-time reporting on ESD spend, supplier diversity, transformation scorecards, and localisation
                  footprints with predictive analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard">
                  <Button variant="ghost" className="gap-2 w-full">
                    View Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Network className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Smart Matchmaking</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  AI-powered supplier discovery matching procurement opportunities with verified suppliers based on
                  capabilities, compliance, and transformation goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/opportunities">
                  <Button variant="ghost" className="gap-2 w-full">
                    Explore Marketplace
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why ESD Platform?</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Built for South African mining and resources companies committed to transformation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Compliance & Verification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Automated document verification for BEE certificates, tax clearance, COIDA, and banking details.
                    Track expiry dates and ensure supplier compliance at all times.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Impact Measurement</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Track transformation KPIs including BWO spend, youth-owned enterprises, disability-owned suppliers,
                    job creation, and skills development with mining charter alignment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Supplier Development</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Support SMME growth with capability assessments, performance tracking, mentorship programs, and
                    access to procurement opportunities across the value chain.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Network className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Inclusive Procurement</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Build diverse supply chains with tools for localisation, community supplier development, and
                    equitable access to business opportunities in mining communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Transform Your Supply Chain?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Join leading mining companies in building inclusive, compliant, and high-performing supplier ecosystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Explore the Platform
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/onboard">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  <Users className="w-5 h-5" />
                  Register as Supplier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
