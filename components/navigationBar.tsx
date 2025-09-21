"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Shield, FileText, Menu, X } from "lucide-react";

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-gray-800/50 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Shield className="h-8 w-8 text-yellow-500" />
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md"></div>
            </div>
            <span className="text-2xl font-bold text-white">LegalGuardian</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-600 mx-2"></div>
          <span className="hidden sm:block text-sm text-gray-400 font-medium">
            Legal made simple
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="relative text-gray-400 hover:text-yellow-400 transition-all duration-300 group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#how-it-works"
            className="relative text-gray-400 hover:text-yellow-400 transition-all duration-300 group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/progress"
            className="relative text-gray-400 hover:text-yellow-400 transition-all duration-300 group"
          >
            Progress
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/upload"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold rounded-full hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
          >
            <FileText className="h-4 w-4" />
            Upload Document
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl transform transition-transform duration-300">
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-yellow-500" />
                  <span className="text-lg font-bold text-white">
                    LegalGuardian
                  </span>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-6 mb-8">
                <Link
                  href="#features"
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-lg font-medium"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-lg font-medium"
                >
                  How It Works
                </Link>
                <Link
                  href="/progress"
                  onClick={toggleMenu}
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-lg font-medium"
                >
                  Progress
                </Link>
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-4">
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="block w-full py-3 px-4 text-center text-gray-300 hover:text-white transition-colors duration-200 font-medium border border-gray-600 rounded-lg hover:border-gray-500"
                >
                  Sign In
                </Link>
                <Link
                  href="/upload"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 font-semibold rounded-full hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 shadow-lg"
                >
                  <FileText className="h-4 w-4" />
                  Upload Document
                </Link>
              </div>

              {/* Mobile Tagline */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400 text-center">
                  Legal made simple
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavigationBar;
