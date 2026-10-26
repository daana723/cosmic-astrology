"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden text-white hover:text-white hover:bg-white/10" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-950 border-white/10 text-white">
        <div className="flex flex-col space-y-4 mt-8">
          <Link href="#community" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Community
          </Link>
          <Link href="#astrology" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Quantum Astrology
          </Link>
          <Link href="#manifestation" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Manifestation
          </Link>
          <Link href="#app" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Our App
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Login
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setOpen(false)}>
              Join Now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
