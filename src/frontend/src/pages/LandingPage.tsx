import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Globe,
  Lock,
  Shield,
  Star,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "Zero Commission",
      description:
        "Trade stocks, ETFs, and commodities with absolutely zero brokerage fees. Keep 100% of your profits.",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      icon: BarChart3,
      title: "Real-Time Market Data",
      description:
        "Live market indices, stock prices, and commodity rates updated in real-time for smarter decisions.",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description:
        "Your investments are protected with 256-bit encryption and multi-factor authentication.",
      color: "text-green-700",
      bg: "bg-green-50",
    },
    {
      icon: TrendingUp,
      title: "Smart Portfolio",
      description:
        "AI-powered portfolio insights, sector diversification analysis, and growth recommendations.",
      color: "text-purple-700",
      bg: "bg-purple-50",
    },
  ];

  const stats = [
    { value: "5M+", label: "Active Investors" },
    { value: "₹0", label: "Commission Fee" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "1000+", label: "Instruments" },
  ];

  return (
    <div className="min-h-screen bg-trustbeige-100 font-body">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-trustbeige-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-08-at-1.00.24-PM-1.jpeg"
              alt="TrustCap Logo"
              className="w-9 h-9 object-contain rounded-full"
            />
            <span className="font-display font-bold text-xl text-trustblue-900">
              TrustCap
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-trustblue-800 hover:text-trustgreen-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-trustblue-800 hover:text-trustgreen-600 transition-colors"
            >
              About
            </a>
            <a
              href="#stats"
              className="text-sm font-medium text-trustblue-800 hover:text-trustgreen-600 transition-colors"
            >
              Why TrustCap
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-trustblue-800 hover:text-trustblue-900 hover:bg-trustbeige-200"
              onClick={() => navigate({ to: "/auth" })}
            >
              Login
            </Button>
            <Button
              className="bg-trustblue-900 hover:bg-trustblue-800 text-white font-semibold px-5"
              onClick={() => setShowModal(true)}
              data-ocid="landing.get_started_button"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-trustcap-hero flex items-center overflow-hidden pt-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 bg-trustgreen-400 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-10 bg-blue-400 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-5 bg-white blur-2xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-trustgreen-600/20 text-trustgreen-300 border-trustgreen-500/30 text-sm px-4 py-1.5 font-medium">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
              India's Most Trusted Zero Commission Platform
            </Badge>

            <div className="flex justify-center mb-8">
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-08-at-1.00.24-PM-1.jpeg"
                alt="TrustCap Platform"
                className="w-24 h-24 object-contain drop-shadow-2xl rounded-full"
              />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              TrustCap
              <span className="block text-trustgreen-400">Platform</span>
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-blue-200 mb-4 tracking-wide uppercase letter-spacing-wider">
              India's First Next-Gen Zero Commission Brokerage
            </p>

            <p className="text-lg text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Trade equities, commodities, and mutual funds with{" "}
              <span className="text-trustgreen-400 font-semibold">
                zero brokerage fees
              </span>
              . Real-time data. Bank-grade security. Built for India's next
              generation of investors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-trustgreen-600 hover:bg-trustgreen-500 text-white font-bold text-lg px-8 py-4 h-auto shadow-marquee transition-all duration-200 hover:scale-105"
                onClick={() => setShowModal(true)}
                data-ocid="landing.get_started_button"
              >
                Start Investing Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 h-auto backdrop-blur-sm"
                onClick={() => navigate({ to: "/auth" })}
              >
                Sign In
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-blue-200/70">
              {[
                "SEBI Registered",
                "NSE & BSE Listed",
                "CDSL Depository",
                "ISO 27001 Certified",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-trustgreen-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
          >
            <path
              d="M0 80L1440 80L1440 30C1200 70 840 10 720 30C600 50 240 70 0 30L0 80Z"
              fill="oklch(0.965 0.012 80)"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 bg-trustbeige-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-white rounded-xl shadow-card border border-trustbeige-200"
              >
                <div className="font-display text-4xl font-extrabold text-trustblue-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-trustblue-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-trustblue-50 text-trustblue-700 border-trustblue-200">
              Why Choose TrustCap
            </Badge>
            <h2 className="font-display text-4xl font-extrabold text-trustblue-900 mb-4">
              Everything You Need to Invest Smarter
            </h2>
            <p className="text-lg text-trustblue-600 max-w-2xl mx-auto">
              A complete investment platform designed from the ground up for
              modern Indian investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-trustbeige-50 rounded-2xl border border-trustbeige-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
              >
                <div
                  className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-trustblue-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-trustblue-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA Section */}
      <section
        id="about"
        className="py-20 bg-trustblue-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-trustgreen-400 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-300 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-12 h-12 text-trustgreen-400 mx-auto mb-6" />
          <h2 className="font-display text-4xl font-extrabold text-white mb-6">
            Democratizing Wealth Creation for Every Indian
          </h2>
          <p className="text-lg text-blue-200 mb-10 leading-relaxed">
            TrustCap Platform is built on the belief that every Indian deserves
            access to world-class financial tools without paying a fortune in
            commissions. Start with as little as ₹10.
          </p>
          <Button
            size="lg"
            className="bg-trustgreen-600 hover:bg-trustgreen-500 text-white font-bold text-lg px-10 py-4 h-auto hover:scale-105 transition-all duration-200"
            onClick={() => setShowModal(true)}
            data-ocid="landing.get_started_button"
          >
            Open Free Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-trustblue-950 border-t border-trustblue-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-08-at-1.00.24-PM-1.jpeg"
                  alt="TrustCap"
                  className="w-8 h-8 object-contain rounded-full"
                />
                <span className="font-display font-bold text-lg text-white">
                  TrustCap Platform
                </span>
              </div>
              <p className="text-sm text-blue-300 leading-relaxed max-w-xs">
                India's First Next-Gen Zero Commission Brokerage. SEBI
                Registered Investment Platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Platform
              </h4>
              <ul className="space-y-2">
                {["Equities", "Commodities", "Mutual Funds", "IPO"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="/"
                        className="text-sm text-blue-300 hover:text-trustgreen-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2">
                {["About", "Careers", "Privacy Policy", "Terms of Service"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="/"
                        className="text-sm text-blue-300 hover:text-trustgreen-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-trustblue-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-blue-400">
              © {new Date().getFullYear()} TrustCap Platform. All rights
              reserved. SEBI Reg. No. INZ000012345
            </p>
            <p className="text-xs text-blue-400">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-trustgreen-400 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Get Started Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="sm:max-w-md bg-white rounded-2xl p-0 overflow-hidden"
          data-ocid="getstarted.modal"
        >
          {/* Modal header with blue gradient */}
          <div className="bg-trustcap-hero p-6 text-white relative">
            <button
              type="button"
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              onClick={() => setShowModal(false)}
              data-ocid="getstarted.close_button"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-08-at-1.00.24-PM-1.jpeg"
                alt="TrustCap"
                className="w-10 h-10 object-contain rounded-full"
              />
              <span className="font-display font-bold text-xl">
                TrustCap Platform
              </span>
            </div>
            <p className="text-blue-200 text-sm font-medium">
              India's First Next-Gen Zero Commission Brokerage
            </p>
          </div>

          <div className="p-6">
            <DialogHeader className="mb-5">
              <DialogTitle className="font-display text-2xl font-bold text-trustblue-900">
                Welcome to TrustCap! 🎉
              </DialogTitle>
              <DialogDescription className="text-trustblue-600 text-base mt-2">
                Join over 5 million investors who trust TrustCap for
                zero-commission trading. Start your investment journey today —
                it's completely free.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mb-6">
              {[
                "✅ Zero brokerage on all trades",
                "✅ Real-time market data & analytics",
                "✅ Bank-grade security",
              ].map((item) => (
                <div
                  key={item}
                  className="text-sm text-trustblue-700 font-medium"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-trustblue-900 hover:bg-trustblue-800 text-white font-bold py-3 h-auto text-base"
                onClick={() => {
                  setShowModal(false);
                  navigate({ to: "/auth" });
                }}
                data-ocid="getstarted.create_account_button"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-trustbeige-300" />
                </div>
                <div className="relative flex justify-center text-xs text-trustblue-400 uppercase bg-white px-2">
                  or
                </div>
              </div>

              <button
                type="button"
                className="w-full text-center text-sm text-trustblue-600 hover:text-trustgreen-600 font-medium transition-colors py-1"
                onClick={() => {
                  setShowModal(false);
                  navigate({ to: "/auth" });
                }}
                data-ocid="getstarted.signin_link"
              >
                Already have an account?{" "}
                <span className="text-trustgreen-600 font-semibold">
                  Sign In
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
