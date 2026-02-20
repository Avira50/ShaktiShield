"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Settings,
  KeyRound,
  ChevronRight,
  UserCheck,
  Trash2,
  Sparkles,
  Loader2
} from "lucide-react";
import { getReports, updateReportStatus, getAdminKey, setAdminKey, cleanupOldReports } from "@/app/lib/storage";
import { Report, ReportStatus } from "@/app/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { analyzeReport } from "@/ai/flows/analyze-report-flow";

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filter, setFilter] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKeyInput, setAdminKeyInput] = useState("");
  
  // AI state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{summary: string, urgency: string, suggestedAction: string} | null>(null);

  // Settings state
  const [newKey, setNewKey] = useState("");
  const [confirmKey, setConfirmKey] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      cleanupOldReports();
      setReports(getReports());
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    const storedKey = getAdminKey();
    if (adminKeyInput === storedKey) {
      setIsAuthenticated(true);
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: `Invalid key. For RITM staff use only.`,
      });
    }
  };

  const handleStatusUpdate = (id: string, newStatus: ReportStatus) => {
    const updated = updateReportStatus(id, newStatus);
    if (updated) {
      setReports(getReports());
      if (selectedReport?.id === id) {
        setSelectedReport(updated);
      }
      toast({
        title: "Status Updated",
        description: `Case ${id} marked as ${newStatus.replace('-', ' ')}.`,
      });
    }
  };

  const handleAIAnalysis = async () => {
    if (!selectedReport) return;
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const result = await analyzeReport({ description: selectedReport.description });
      setAiAnalysis(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not connect to AI services.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChangeKey = () => {
    if (!newKey) {
      toast({ variant: "destructive", title: "Error", description: "Key cannot be empty." });
      return;
    }
    if (newKey !== confirmKey) {
      toast({ variant: "destructive", title: "Mismatch", description: "Keys do not match." });
      return;
    }
    setAdminKey(newKey);
    setIsSettingsOpen(false);
    setNewKey("");
    setConfirmKey("");
    toast({ title: "Success", description: "RITM Staff access key updated." });
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'received': return 'secondary';
      case 'reviewing': return 'outline';
      case 'action-taken': return 'default';
      case 'resolved': return 'default';
      default: return 'secondary';
    }
  };

  const filteredReports = reports.filter(r => filter === "all" || r.status === filter);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-2xl border-accent/20">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-headline">RITM Staff Portal</CardTitle>
            <CardDescription>Authorized committee access for RITM student safety.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Staff Access Key" 
                value={adminKeyInput}
                onChange={(e) => setAdminKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="text-center text-lg"
              />
            </div>
            <Button 
              className="w-full bg-accent" 
              onClick={handleLogin}
            >
              Access Dashboard
            </Button>
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">RITM LUCKNOW ADMIN</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
              RITM Support Dashboard
            </h1>
            <p className="text-muted-foreground">Managing security reports for RITM students.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" title="Settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <KeyRound className="h-5 w-5 text-accent" />
                    Update Staff Access Key
                  </DialogTitle>
                  <DialogDescription>
                    Change the staff access key for RITM dashboard.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-muted-foreground">New Access Key</p>
                    <Input 
                      type="password" 
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      placeholder="Enter new key" 
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-muted-foreground">Confirm Key</p>
                    <Input 
                      type="password" 
                      value={confirmKey}
                      onChange={(e) => setConfirmKey(e.target.value)}
                      placeholder="Confirm new key" 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>Cancel</Button>
                  <Button className="bg-accent" onClick={handleChangeKey}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Reports..." className="pl-10 w-64" />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="reviewing">In Review</SelectItem>
                <SelectItem value="action-taken">Action Taken</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Incident Type</TableHead>
                  <TableHead className="hidden md:table-cell">Platform</TableHead>
                  <TableHead className="hidden lg:table-cell">Date Reported</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No reports found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id} className="cursor-pointer hover:bg-muted/10">
                      <TableCell className="font-mono font-bold text-accent">{report.id}</TableCell>
                      <TableCell className="font-medium">{report.type}</TableCell>
                      <TableCell className="hidden md:table-cell">{report.platform}</TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {new Date(report.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(report.status) as any} className="capitalize">
                          {report.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedReport(report);
                          setAiAnalysis(null);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
          <p className="text-xs text-muted-foreground italic flex items-center gap-1">
            <Trash2 className="h-3 w-3" />
            Resolved cases are automatically deleted after 7 days of inactivity.
          </p>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        {selectedReport && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-accent">{selectedReport.id}</Badge>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">RITM Confidential File</span>
              </div>
              <DialogTitle className="text-2xl font-headline">{selectedReport.type}</DialogTitle>
              <DialogDescription>
                Incident reported on {new Date(selectedReport.timestamp).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-3 gap-6 py-6">
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase text-muted-foreground">Incident Description</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-[10px] font-bold border-accent text-accent gap-2"
                      onClick={handleAIAnalysis}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                      {isAnalyzing ? "Analyzing..." : "AI Analyze"}
                    </Button>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 text-sm leading-relaxed border">
                    {selectedReport.description}
                  </div>
                </div>

                {aiAnalysis && (
                  <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 text-accent">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-black uppercase tracking-widest">AI Safety Insight</span>
                    </div>
                    <div className="grid gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Incident Summary</p>
                        <p className="text-sm font-medium">{aiAnalysis.summary}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Calculated Urgency</p>
                          <Badge className={
                            aiAnalysis.urgency === 'High' ? 'bg-destructive' : 
                            aiAnalysis.urgency === 'Medium' ? 'bg-amber-500' : 'bg-secondary'
                          }>
                            {aiAnalysis.urgency}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Recommended Step</p>
                          <p className="text-xs font-medium italic">{aiAnalysis.suggestedAction}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border bg-white shadow-sm space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Platform</p>
                    <p className="font-semibold">{selectedReport.platform}</p>
                  </div>
                  <div className="p-4 rounded-xl border bg-white shadow-sm space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Incident Date</p>
                    <p className="font-semibold">{selectedReport.dateOfIncident}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase text-muted-foreground">Update Status</h4>
                  <div className="space-y-3">
                    {(['received', 'reviewing', 'action-taken', 'resolved'] as ReportStatus[]).map((status) => (
                      <Button 
                        key={status}
                        variant={selectedReport.status === status ? "default" : "outline"} 
                        className={`w-full justify-start text-xs h-9 ${selectedReport.status === status ? 'bg-accent' : ''}`}
                        onClick={() => handleStatusUpdate(selectedReport.id, status)}
                      >
                        {status === 'resolved' ? <CheckCircle2 className="h-3 w-3 mr-2" /> : <ChevronRight className="h-3 w-3 mr-2" />}
                        {status.replace('-', ' ').toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/20 border border-accent/20 space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <UserCheck className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase">Anonymity Status</span>
                  </div>
                  <p className="text-[10px] text-accent/80 italic">
                    {selectedReport.anonymous ? "Anonymous report. Protect student privacy." : "Non-anonymous. Contact through RITM registry if needed."}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="sm:justify-between border-t pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>RITM Secure Admin Panel</span>
              </div>
              <Button variant="outline" onClick={() => setSelectedReport(null)}>Close File</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
