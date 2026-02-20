
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CheckCircle2, Copy, AlertCircle, AlertTriangle, Fingerprint } from "lucide-react";
import { saveReport } from "@/app/lib/storage";
import { HarassmentType, platforms } from "@/app/lib/types";

export default function ReportPage() {
  const [step, setStep] = useState(1);
  const [isFemale, setIsFemale] = useState(false);
  const [hasAcknowledgedWarning, setHasAcknowledgedWarning] = useState(false);
  const [formData, setFormData] = useState({
    type: "" as HarassmentType | "",
    platform: "",
    dateOfIncident: "",
    description: "",
    anonymous: true,
  });
  const [submittedReport, setSubmittedReport] = useState<any>(null);

  const handleProceedToForm = () => {
    if (isFemale && hasAcknowledgedWarning) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trackingCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newReport = saveReport({
      ...(formData as any),
      trackingCode,
    });
    setSubmittedReport(newReport);
    setStep(3);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-8 px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}`}>
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-accent' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card className="shadow-lg border-2 border-primary overflow-hidden">
              <CardHeader className="text-center space-y-4 pt-8">
                <CardTitle className="text-2xl md:text-3xl font-headline text-foreground">
                  Important: Official RITM Female Student Portal
                </CardTitle>
                <CardDescription className="text-base font-medium">
                  Rameshwaram Institute of Technology & Management (Lucknow)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-4 pb-8">
                {/* Primary Declaration */}
                <div className="flex items-start space-x-4 bg-primary/10 p-5 rounded-xl border border-primary/20">
                  <Checkbox 
                    id="female-id" 
                    className="mt-1.5 h-6 w-6 border-accent"
                    checked={isFemale}
                    onCheckedChange={(checked) => setIsFemale(checked as boolean)}
                  />
                  <div className="grid gap-2 leading-tight">
                    <label htmlFor="female-id" className="text-base font-bold text-foreground cursor-pointer">
                      I promise that I am a female student of RITM College and I am not intending to misuse this platform to misinform or harass.
                    </label>
                  </div>
                </div>

                {/* Primary Warning */}
                <div className="p-6 rounded-xl bg-destructive/5 border-2 border-destructive/20 flex gap-4 items-start">
                  <AlertTriangle className="h-8 w-8 text-destructive shrink-0 mt-1" />
                  <div className="space-y-2">
                    <p className="text-lg font-black text-destructive leading-tight uppercase tracking-tight">
                      Warning: Misuse of this RITM portal is traceable and leads to disciplinary action by college authorities & law enforcement.
                    </p>
                  </div>
                </div>

                {/* Secondary Acknowledgment */}
                {isFemale && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="p-6 rounded-xl bg-accent/5 border-2 border-accent/40 space-y-4 shadow-inner">
                      <div className="flex items-center gap-2 text-accent">
                        <Fingerprint className="h-5 w-5" />
                        <span className="font-bold uppercase text-xs tracking-widest text-accent">Digital Security Trace</span>
                      </div>
                      <p className="text-base font-bold text-foreground leading-relaxed italic">
                        "RITM Final reminder: Fake reports can be traced through IP logs. Only submit genuine incidents to ensure the safety of our sisters."
                      </p>
                      <div className="flex items-center space-x-3 pt-2">
                        <Checkbox 
                          id="ack-id" 
                          checked={hasAcknowledgedWarning}
                          onCheckedChange={(checked) => setHasAcknowledgedWarning(checked as boolean)}
                        />
                        <Label htmlFor="ack-id" className="text-sm font-bold cursor-pointer">
                          I understand RITM safety policies and agree to these terms.
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4 bg-muted/30 pt-6 pb-6">
                <Button 
                  className="w-full bg-accent hover:bg-accent/90 py-7 text-lg font-bold shadow-lg shadow-accent/20" 
                  disabled={!isFemale || !hasAcknowledgedWarning}
                  onClick={handleProceedToForm}
                >
                  Proceed to RITM Report Form
                </Button>
                <p className="text-xs text-muted-foreground text-center font-medium">
                  This portal is monitored. Genuine reports are 100% confidential and protected.
                </p>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">Incident Report Details</CardTitle>
                <CardDescription>RITM confidential reporting system. Your safety is our priority.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Incident Type</Label>
                      <Select 
                        required 
                        onValueChange={(val) => setFormData({...formData, type: val as HarassmentType})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cyberstalking">Cyberstalking</SelectItem>
                          <SelectItem value="Online Harassment">Online Harassment</SelectItem>
                          <SelectItem value="Identity Theft">Identity Theft</SelectItem>
                          <SelectItem value="Inappropriate Content">Inappropriate Content</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Platform / Venue</Label>
                      <Select 
                        required 
                        onValueChange={(val) => setFormData({...formData, platform: val})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Incident</Label>
                    <Input 
                      type="date" 
                      required
                      value={formData.dateOfIncident}
                      onChange={(e) => setFormData({...formData, dateOfIncident: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Detailed Description</Label>
                    <Textarea 
                      placeholder="Please describe what happened within RITM or online..." 
                      className="min-h-[150px]"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg bg-muted/30">
                    <Checkbox 
                      id="anon" 
                      checked={formData.anonymous}
                      onCheckedChange={(val) => setFormData({...formData, anonymous: val as boolean})}
                    />
                    <Label htmlFor="anon" className="text-sm font-medium">Keep report anonymous to RITM committee</Label>
                  </div>

                  <Button type="submit" className="w-full bg-accent" size="lg">Submit RITM Confidential Report</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 3 && submittedReport && (
            <Card className="shadow-xl border-2 border-accent animate-in zoom-in-95 duration-500">
              <CardContent className="pt-10 pb-10 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-accent" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold font-headline text-accent">Report Submitted to RITM</h2>
                  <p className="text-muted-foreground">Thank you for speaking up. Your safety is being prioritized by our staff.</p>
                </div>
                
                <div className="bg-primary/30 p-8 rounded-2xl space-y-4 max-w-sm mx-auto">
                  <p className="text-sm font-medium text-accent uppercase tracking-widest">Tracking Code</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl font-black tracking-widest font-mono">{submittedReport.trackingCode}</span>
                    <Button size="icon" variant="ghost" onClick={() => copyToClipboard(submittedReport.trackingCode)}>
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="bg-destructive/5 text-destructive text-sm p-4 rounded-lg flex items-start gap-3 text-left">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p><strong>Note for RITM Student:</strong> Please save this code securely. It is the ONLY way to track your report.</p>
                </div>

                <div className="pt-6">
                  <Button asChild variant="outline" className="border-accent text-accent">
                    <a href="/">Return to Home</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
