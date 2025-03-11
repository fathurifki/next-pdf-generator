"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Menu,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DashboardSidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 border-r bg-background transition-transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FileText className="h-6 w-6" />
            <span>PDF Generator</span>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="px-3 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <Users className="h-4 w-4" />
                Generate By List
              </Link>
              <Link
                href="/generate-random"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-4 w-4" />
                Generate Random User
              </Link>
            </nav>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
