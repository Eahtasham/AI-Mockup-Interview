"use client";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function Navbar({ user }) {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <div>
          <h1 className="text-xl font-bold">AI Mock Interview</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Welcome, {user?.firstName || 'User'}
          </span>
          <ModeToggle />
          <Button 
            variant="outline" 
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
} 