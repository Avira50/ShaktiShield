
"use client";

import Link from "next/link";
import { ShieldCheck, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-bold tracking-tight text-accent font-headline">ShaktiShield</span>
            <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">RITM Lucknow</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/report" className="text-sm font-medium hover:text-accent transition-colors">Submit Report</Link>
          <Link href="/track" className="text-sm font-medium hover:text-accent transition-colors">Track Status</Link>
          <Link href="/admin" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" />
            Staff Login
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/report">
            <Button variant="outline" className="hidden sm:inline-flex border-accent text-accent hover:bg-accent/10">
              Report Now
            </Button>
          </Link>
          <Button size="icon" variant="ghost" className="md:hidden text-accent">
            <ShieldCheck className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
