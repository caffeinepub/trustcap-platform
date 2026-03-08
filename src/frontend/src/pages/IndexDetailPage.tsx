import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart2,
  Building2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type Company = {
  name: string;
  sector: string;
};

type IndexData = {
  label: string;
  symbol: string;
  description: string;
  changePercent: number;
  value: number;
  companies: Company[];
};

const INDEX_DATA: Record<string, IndexData> = {
  NIFTY50: {
    label: "NIFTY 50",
    symbol: "NIFTY50",
    description:
      "The NIFTY 50 is a benchmark Indian stock market index representing 50 of the largest and most liquid Indian companies listed on the National Stock Exchange.",
    changePercent: 0.56,
    value: 22456.8,
    companies: [
      { name: "Reliance Industries Ltd.", sector: "Diversified conglomerate" },
      { name: "HDFC Bank Ltd.", sector: "Financial Services" },
      { name: "Bharti Airtel Ltd.", sector: "Telecommunications" },
      { name: "ICICI Bank Ltd.", sector: "Financial Services" },
      { name: "Infosys Ltd.", sector: "Information Technology" },
    ],
  },
  SENSEX: {
    label: "SENSEX",
    symbol: "SENSEX",
    description:
      "The BSE SENSEX is a free-float market-weighted stock market index of 30 well-established and financially sound companies listed on the Bombay Stock Exchange.",
    changePercent: 0.53,
    value: 73852.6,
    companies: [
      { name: "Reliance Industries", sector: "Energy & Petrochemicals" },
      { name: "HDFC Bank", sector: "Financial Services" },
      { name: "ICICI Bank", sector: "Financial Services" },
      { name: "Infosys", sector: "Information Technology" },
      {
        name: "Tata Consultancy Services (TCS)",
        sector: "Information Technology",
      },
      { name: "Bharti Airtel", sector: "Telecommunications" },
      { name: "State Bank of India (SBI)", sector: "Banking" },
      { name: "Larsen & Toubro (L&T)", sector: "Infrastructure & Engineering" },
    ],
  },
  NIFTYBANK: {
    label: "NIFTY BANK",
    symbol: "NIFTYBANK",
    description:
      "The NIFTY Bank Index tracks the performance of the most liquid and large banking stocks listed on the NSE. It includes both public and private sector banks.",
    changePercent: -0.18,
    value: 48234.5,
    companies: [
      { name: "State Bank of India (SBI)", sector: "Public Sector Banking" },
      { name: "IndusInd Bank Ltd.", sector: "Private Sector Banking" },
      { name: "AU Small Finance Bank Ltd.", sector: "Small Finance Banking" },
      { name: "Bandhan Bank Ltd.", sector: "Private Sector Banking" },
      { name: "Bank of Baroda", sector: "Public Sector Banking" },
      { name: "IDFC First Bank", sector: "Private Sector Banking" },
      { name: "Punjab National Bank", sector: "Public Sector Banking" },
    ],
  },
};

const SECTOR_COLORS: Record<string, { bg: string; text: string }> = {
  "Financial Services": { bg: "bg-blue-50", text: "text-blue-700" },
  Banking: { bg: "bg-blue-50", text: "text-blue-700" },
  "Public Sector Banking": { bg: "bg-indigo-50", text: "text-indigo-700" },
  "Private Sector Banking": { bg: "bg-violet-50", text: "text-violet-700" },
  "Small Finance Banking": { bg: "bg-purple-50", text: "text-purple-700" },
  "Information Technology": { bg: "bg-sky-50", text: "text-sky-700" },
  Telecommunications: { bg: "bg-teal-50", text: "text-teal-700" },
  "Energy & Petrochemicals": { bg: "bg-orange-50", text: "text-orange-700" },
  "Diversified conglomerate": { bg: "bg-amber-50", text: "text-amber-700" },
  "Infrastructure & Engineering": { bg: "bg-green-50", text: "text-green-700" },
};

function getSectorStyle(sector: string) {
  return (
    SECTOR_COLORS[sector] ?? {
      bg: "bg-trustbeige-100",
      text: "text-trustblue-600",
    }
  );
}

export default function IndexDetailPage() {
  const navigate = useNavigate();
  const { indexId } = useParams({ strict: false }) as { indexId: string };
  const data = INDEX_DATA[indexId];

  const isPositive = data ? data.changePercent >= 0 : true;

  return (
    <div className="min-h-screen bg-trustbeige-100 font-body">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-trustbeige-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <img
            src="/assets/uploads/WhatsApp-Image-2026-03-08-at-1.00.24-PM-1.jpeg"
            alt="TrustCap"
            className="w-8 h-8 object-contain rounded-full"
          />
          <span className="font-display font-bold text-lg text-trustblue-900 hidden sm:block">
            TrustCap
          </span>
          <span className="text-trustbeige-300 hidden sm:block">/</span>
          <span className="text-trustblue-600 text-sm hidden sm:block">
            Market Indices
          </span>
          {data && (
            <>
              <span className="text-trustbeige-300 hidden sm:block">/</span>
              <span className="text-trustblue-900 text-sm font-semibold hidden sm:block">
                {data.label}
              </span>
            </>
          )}
        </div>
      </header>

      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-6 text-trustblue-600 hover:text-trustblue-900 hover:bg-trustbeige-200 -ml-2 flex items-center gap-2 font-medium"
            onClick={() => void navigate({ to: "/dashboard" })}
            data-ocid="index_detail.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          {!data ? (
            /* Not found state */
            <div
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="index_detail.error_state"
            >
              <div className="w-16 h-16 bg-trustbeige-200 rounded-2xl flex items-center justify-center mb-4">
                <BarChart2 className="w-8 h-8 text-trustblue-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-trustblue-900 mb-2">
                Index Not Found
              </h2>
              <p className="text-trustblue-500 text-base max-w-sm">
                The index "{indexId}" could not be found. Please go back and
                select a valid index.
              </p>
              <Button
                className="mt-6 bg-trustblue-900 hover:bg-trustblue-800 text-white"
                onClick={() => void navigate({ to: "/dashboard" })}
              >
                Return to Dashboard
              </Button>
            </div>
          ) : (
            <>
              {/* Index Hero Card */}
              <div className="bg-gradient-to-br from-trustblue-900 to-trustblue-700 rounded-2xl p-6 sm:p-8 text-white mb-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-trustgreen-400/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-trustgreen-400 animate-pulse" />
                        <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                          Live Index
                        </span>
                      </div>
                      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                        {data.label}
                      </h1>
                      <p className="text-blue-300 text-sm mt-1">
                        {data.symbol}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                        {data.value.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div
                        className={`flex items-center justify-end gap-1 text-sm font-semibold mt-1 ${
                          isPositive ? "text-trustgreen-300" : "text-red-300"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {isPositive ? "+" : ""}
                        {data.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <p className="text-blue-200/80 text-sm leading-relaxed max-w-2xl">
                    {data.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <Badge className="bg-white/15 text-white border-white/20 text-xs">
                      {data.companies.length} Top Companies
                    </Badge>
                    <Badge
                      className={`border-0 text-xs font-semibold ${
                        isPositive
                          ? "bg-trustgreen-500/20 text-trustgreen-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {isPositive ? "▲ Gaining" : "▼ Declining"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Companies Section */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Building2 className="w-5 h-5 text-trustblue-700" />
                  <h2 className="font-display text-xl font-bold text-trustblue-900">
                    Top Companies in {data.label}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.companies.map((company, idx) => {
                    const sectorStyle = getSectorStyle(company.sector);
                    const initials = company.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase();

                    return (
                      <div
                        key={company.name}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-trustbeige-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                        data-ocid={`index_detail.company.item.${idx + 1}`}
                      >
                        {/* Rank badge */}
                        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trustbeige-100 flex items-center justify-center text-xs font-bold text-trustblue-500">
                          {idx + 1}
                        </div>

                        {/* Company avatar */}
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-trustblue-100 to-trustblue-200 flex items-center justify-center font-bold text-trustblue-800 text-sm group-hover:from-trustblue-200 group-hover:to-trustblue-300 transition-all">
                          {initials}
                        </div>

                        {/* Company info */}
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-trustblue-900 text-sm leading-tight mb-1.5 group-hover:text-trustblue-700 transition-colors">
                            {company.name}
                          </div>
                          <Badge
                            className={`${sectorStyle.bg} ${sectorStyle.text} border-0 text-xs px-2 py-0 h-5 font-medium`}
                          >
                            {company.sector}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-700 leading-relaxed">
                <strong>Disclaimer:</strong> The information provided is for
                educational purposes only and does not constitute financial
                advice. Investments are subject to market risks. Please read all
                scheme-related documents before investing.
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-trustblue-950 border-t border-trustblue-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-400">
            © {new Date().getFullYear()} TrustCap Platform. All rights reserved.
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
      </footer>
    </div>
  );
}
