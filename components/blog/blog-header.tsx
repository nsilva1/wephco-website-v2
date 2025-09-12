"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // if (searchQuery.trim()) {
    //   router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)
    // }
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-8">
            <Link href="/blog" className="text-2xl font-bold text-primary">
              Blog
            </Link>

            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex items-center gap-6">
              <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                All Posts
              </Link>
              <Link
                href="/blog?category=technology"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Technology
              </Link>
              <Link
                href="/blog?category=lifestyle"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Lifestyle
              </Link>
              <Link href="/blog?featured=true" className="text-sm font-medium hover:text-primary transition-colors">
                Featured
              </Link>
            </nav> */}
          </div>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </form>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              {/* <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                All Posts
              </Link>
              <Link
                href="/blog?category=technology"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Technology
              </Link>
              <Link
                href="/blog?category=lifestyle"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Lifestyle
              </Link>
              <Link href="/blog?featured=true" className="text-sm font-medium hover:text-primary transition-colors">
                Featured
              </Link> */}

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="sm:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
