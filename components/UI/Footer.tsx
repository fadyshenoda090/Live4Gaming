'use client'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h2 className="text-2xl font-black uppercase tracking-wider">
                <span className="text-white">LIVE4</span>
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent">
                  GAMING
                </span>
              </h2>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Join the ultimate gaming platform where warriors unite, battles begin, and legends are born.
            </p>
            <div className="flex space-x-3">
              <div className="w-9 h-9 border border-gray-600 rounded-lg flex items-center justify-center hover:border-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer group">
                <span className="text-gray-400 group-hover:text-amber-300 text-xs font-bold">D</span>
              </div>
              <div className="w-9 h-9 border border-gray-600 rounded-lg flex items-center justify-center hover:border-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer group">
                <span className="text-gray-400 group-hover:text-amber-300 text-xs font-bold">T</span>
              </div>
              <div className="w-9 h-9 border border-gray-600 rounded-lg flex items-center justify-center hover:border-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer group">
                <span className="text-gray-400 group-hover:text-amber-300 text-xs font-bold">T</span>
              </div>
              <div className="w-9 h-9 border border-gray-600 rounded-lg flex items-center justify-center hover:border-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer group">
                <span className="text-gray-400 group-hover:text-amber-300 text-xs font-bold">Y</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-amber-400 font-bold text-lg mb-6 uppercase tracking-wide border-b border-amber-500/30 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link href="/leaderboards" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-amber-400 font-bold text-lg mb-6 uppercase tracking-wide border-b border-amber-500/30 pb-2">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/support/help-center" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support/contact-us" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support/faq" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support/community" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/support/report-issue" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Report Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-amber-400 font-bold text-lg mb-6 uppercase tracking-wide border-b border-amber-500/30 pb-2">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/legal/terms-of-service" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie-policy" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/eula" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  EULA
                </Link>
              </li>
              <li>
                <Link href="/legal/code-of-conduct" className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                  Code of Conduct
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Stay in the Battle</h3>
              <p className="text-gray-300 text-sm">Get the latest updates on tournaments and new releases</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 flex-1 min-w-64"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-700 rounded-lg font-bold text-white uppercase tracking-wider hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 transition-all duration-300 border border-amber-400">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Live4Gaming. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              <span>Made for warriors</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <span>18+</span>
              <span>ESRB</span>
              <span>PEGI 16</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer