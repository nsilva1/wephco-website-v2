"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { socialLinks } from "@/lib/constants"

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
          <div className="hidden lg:flex items-center gap-2">
            {socialLinks.map((social, index) => (
              <Link key={index} href={social.link} target='_blank' rel='noopener noreferrer'>
                <social.icon className='text-4xl text-gray-500 hover:text-green-700 p-2' />
              </Link>
            ))}
          </div>

          {/* Logo/Title */}
          <div className="flex items-center gap-8">
            <Link href="/blog" className="text-2xl font-bold text-primary">
              WephcoBlog
            </Link>
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
            <nav className="flex flex-col items-center gap-4">
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
              <div className="flex items-center gap-2 mt-5">
                {socialLinks.map((social, index) => (
                  <Link key={index} href={social.link} target='_blank' rel='noopener noreferrer'>
                    <social.icon className='text-4xl text-gray-500 hover:text-green-700 p-2' />
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
