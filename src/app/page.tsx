import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Lock, EyeOff, MessageSquare, Heart, PhoneCall, ShieldAlert, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black font-headline text-accent tracking-tighter drop-shadow-sm">
                  ShaktiShield
                </h2>
                
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full bg-primary px-6 py-2 text-xs font-bold text-accent border border-accent/20 uppercase tracking-widest">
                    <span>Official RITM Student Safety Portal</span>
                  </div>
                  <span className="text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase block">
                    Rameshwaram Institute of Technology & Management
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground tracking-tight">
                Empowering the Sisters of <span className="text-accent underline decoration-primary underline-offset-8">RITM</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                ShaktiShield is a dedicated portal for the female students of RITM. We ensure absolute confidentiality for reporting harassment or concerns, allowing you to focus on your education in a safe environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/report">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 text-base">
                    Submit a Report
                  </Button>
                </Link>
                <Link href="/track">
                  <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 px-8 text-base">
                    Track Your Case
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/30 rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        </section>

        {/* Emergency Resources Section */}
        <section className="py-16 bg-muted/30 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-10 justify-center">
                <ShieldAlert className="h-8 w-8 text-destructive" />
                <h2 className="text-3xl font-bold font-headline">Emergency Help</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Women Helpline</p>
                    <p className="text-xl font-black text-destructive">1090</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">UP Police</p>
                    <p className="text-xl font-black text-accent">112</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-accent">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">RITM Security</p>
                    <p className="text-lg font-bold">Contact Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Safety Tips */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold font-headline">How We Protect You</h2>
                  <p className="text-muted-foreground">ShaktiShield uses industry-standard security to ensure your identity and reports stay safe.</p>
                </div>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-accent">
                      <EyeOff className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Absolute Anonymity</h4>
                      <p className="text-sm text-muted-foreground">Reports are stored without identifying information unless you choose otherwise.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-accent">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Direct to RITM Staff</h4>
                      <p className="text-sm text-muted-foreground">Your concerns go directly to the designated RITM support committee.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-accent">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Real-time Updates</h4>
                      <p className="text-sm text-muted-foreground">Monitor the status of your reported incident using your unique tracking code.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 rounded-3xl p-8 border border-accent/10 space-y-6">
                <div className="flex items-center gap-2 text-accent">
                  <BookOpen className="h-6 w-6" />
                  <h3 className="text-xl font-bold font-headline">Safety Tips for RITM Sisters</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>Avoid sharing sensitive personal information or OTPs with unknown individuals on social media.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>Always keep the UP Women Power Line (1090) on speed dial when traveling.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>If you feel uncomfortable or followed on campus, immediately report it to the nearest staff member.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span>Trust your intuition. If a situation feels "off," remove yourself from it as soon as possible.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-background border-t">
          <div className="container mx-auto px-4">
            <div className="bg-accent rounded-3xl p-12 text-center text-white space-y-6 max-w-5xl mx-auto shadow-xl">
              <Heart className="h-12 w-12 mx-auto text-primary animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Our campus, our responsibility.</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                ShaktiShield is part of RITM's commitment to zero-tolerance against harassment. We are with you.
              </p>
              <div className="pt-6">
                <Link href="/report">
                  <Button size="lg" variant="secondary" className="bg-white text-accent hover:bg-white/90">
                    Seek Help Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-bold text-accent text-lg">ShaktiShield @ RITM Lucknow</p>
          <p className="text-sm mt-1">Rameshwaram Institute of Technology and Management</p>
          <div className="mt-8 text-xs flex justify-center gap-4">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="#" className="hover:underline">Contact RITM Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
