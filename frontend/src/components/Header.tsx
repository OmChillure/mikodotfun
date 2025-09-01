"use client"

import Link from "next/link"
import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"
import { Menu, Clover as Close } from "lucide-react"

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: "",
    role: "",
    description: "",
  })

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header>
      <nav data-state={menuState && "active"} className="fixed z-20 w-full px-2">
        <div
          className={cn(
            "mx-auto mt-2 max-w-4xl rounded-2xl border border-white/20 bg-background/80 px-4 backdrop-blur-lg transition-all duration-300 lg:px-6",
            isScrolled && "shadow-sm",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-3 lg:gap-2 lg:py-3">
            <div className="flex w-full items-center justify-between gap-2 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Image src={"/logo.png"} alt="OnaraAI" width={120} height={120} />
              </Link>

              <button
                onClick={() => setMenuState((s) => !s)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0" />
                <Close className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div
              className={cn(
                "mb-6 hidden w-full flex-wrap items-center justify-end space-y-4 rounded-2xl border border-white/10 bg-background p-4 shadow-lg shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none",
                menuState && "block lg:flex",
              )}
            >
              <Link
                href="https://x.com/mikodotxyz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="mx-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/30 bg-white"
              >
                <Image src={"/x.svg"} alt="X Logo" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}