"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, LogOut, FileText, Home, AlertTriangle, HelpCircle, Users, Bell, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItemProps {
  label: string
}

const NavItem = ({ label }: NavItemProps) => {
  return (
    <div className="relative group">
      <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center">
        {label}
        <ChevronDown size={16} className="ml-1" />
      </button>
    </div>
  )
}

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-navy-900 font-bold text-xl">
            Jagruk
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* <NavItem label="Products" />
            <NavItem label="Solutions" /> */}
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/upi-fraud-detection" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              UPI Fraud Detection
            </Link>
            <Link href="/emi-calculator" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Features
            </Link>
            <Link href="/id-detection" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              {/* ID Detection */}
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              {/* <Link href="/fraud-detection" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Fraud Detection
              </Link>
              <Link href="/emi-calculator" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                EMI Calculator
              </Link> */}
              <Link href="/report" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <FileText className="inline-block mr-2 h-4 w-4" />
                Reports
              </Link>

              <Link href="/alerts" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <Bell className="inline-block mr-2 h-4 w-4" />
                Alerts
              </Link>
              <Link href="/help" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <HelpCircle className="inline-block mr-2 h-4 w-4" />
                Help/FAQ
              </Link>
              {/* <Link href="/campaign" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Campaign
              </Link> */}
              <Link href="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Blog
              </Link>
            </nav>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-600">
                    {user.name}
                    <ChevronDown size={16} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/my-reports" className="flex items-center">
                      <ClipboardList className="mr-2 h-4 w-4" />
                      My Reports
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-600">
                  Sign in
                  <ChevronDown size={16} className="ml-1" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/upi-fraud-detection" className="block px-3 py-2 text-base font-medium text-gray-700">
              UPI Fraud Detection
            </Link>
            <Link href="/emi-calculator" className="block px-3 py-2 text-base font-medium text-gray-700">
              EMI Calculator
            </Link>
            <Link href="/id-detection" className="block px-3 py-2 text-base font-medium text-gray-700">
              {/* ID Detection */}
            </Link>
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700">
              Home
            </Link>
            <Link href="/fraud-detection" className="block px-3 py-2 text-base font-medium text-gray-700">
              Fraud Detection
            </Link>
            <Link href="/reports" className="block px-3 py-2 text-base font-medium text-gray-700">
              Reports
            </Link>
            <Link href="/alerts" className="block px-3 py-2 text-base font-medium text-gray-700">
              Alerts
            </Link>
            <Link href="/help" className="block px-3 py-2 text-base font-medium text-gray-700">
              Help/FAQ
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-base font-medium text-gray-700">
              Blog
            </Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-700">
              Products
            </Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-gray-700">
              Solutions
            </Link>
            <Link href="#" className="block px-3 py-2 text-base font-medium text-purple-600">
              Contact sales
            </Link>
            <Link href="/auth" className="block px-3 py-2 text-base font-medium text-purple-600">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export { NavItem }

{/* Comment out non-essential navigation links */}
{/*

  Payment Fraud
</Link>
<Link href="/id-detection" className="text-sm font-medium transition-colors hover:text-primary">
  ID Verification
</Link>
*/}

export default NavBar;

