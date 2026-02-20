"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { findReportByCode } from "@/app/lib/storage";
import { Report } from "@/app/lib/types";

export default function TrackPage() {
  const [code, setCode] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setReport(findReportByCode(code.trim().toUpperCase()));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'reviewing': return <Search className="h-5 w-5 text-amber-500" />;
      case 'action-taken': return <ShieldCheck className="h-5 w-5 text-indigo-500" />;
      case 'resolved': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'received': return 'Report Received';
      case 'reviewing': return 'Under Professional Review';
      case 'action-taken': return 'Action Being Taken';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold font-headline">Track Your Case</h1>
            <p className="text-muted-foreground">Enter your unique tracking code below to see the current status of your report.</p>
          </div>

          <Card className="shadow-md">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input 
                  placeholder="Enter 8-digit code (e.g. AB12CD34)" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="uppercase font-mono text-lg tracking-widest h-12"
                />
                <Button type="submit" className="bg-accent h-12 px-6">
                  <Search className="h-5 w-5 mr-2" />
                  Track
                </Button>
              </form>
            </CardContent>
          </Card>

          {searched && report && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <Card className="border-accent overflow-hidden">
                <div className="bg-primary/30 px-6 py-4 flex justify-between items-center border-b border-accent/20">
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">Status Overview</span>
                  <span className="text-xs text-muted-foreground">Report ID: {report.id}</span>
                </div>
                <CardContent className="pt-8 pb-10 space-y-10">
                  {/* Status Timeline */}
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 -z-10" />
                    <div className="flex justify-between relative">
                      {['received', 'reviewing', 'action-taken', 'resolved'].map((s, idx) => {
                        const states = ['received', 'reviewing', 'action-taken', 'resolved'];
                        const currentIdx = states.indexOf(report.status);
                        const isActive = idx <= currentIdx;
                        return (
                          <div key={s} className="flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${isActive ? 'bg-accent text-white' : 'bg-muted text-muted-foreground'}`}>
                              {idx < currentIdx ? <CheckCircle2 className="h-6 w-6" /> : (idx === currentIdx ? <Clock className="h-6 w-6 animate-pulse" /> : idx + 1)}
                            </div>
                            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-tighter ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                              {s.split('-').join(' ')}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {getStatusIcon(report.status)}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Current Status</p>
                        <p className="text-lg font-bold text-accent">{getStatusText(report.status)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our support team has processed your report and is taking the necessary steps as per college guidelines. You will see updates here as they occur.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Incident Date</p>
                      <p className="font-semibold">{report.dateOfIncident}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Harassment Type</p>
                      <p className="font-semibold">{report.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Having trouble? <a href="#" className="text-accent underline">Speak with a counselor</a></p>
              </div>
            </div>
          )}

          {searched && !report && (
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-10 pb-10 text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-destructive">Invalid Code</h3>
                  <p className="text-muted-foreground">The code you entered does not match any existing records. Please check for typos and try again.</p>
                </div>
                <Button variant="outline" onClick={() => setSearched(false)}>Try Again</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}