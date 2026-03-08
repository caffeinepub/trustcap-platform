import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BarChart2,
  ChevronRight,
  LayoutDashboard,
  Package,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Commodity, Company, MarketIndex } from "../backend.d";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

// Mock fallback data
const MOCK_INDICES: MarketIndex[] = [
  {
    name: "NIFTY 50",
    symbol: "NIFTY50",
    value: 22456.8,
    changeAmount: 125.3,
    changePercent: 0.56,
  },
  {
    name: "SENSEX",
    symbol: "SENSEX",
    value: 73852.6,
    changeAmount: 389.4,
    changePercent: 0.53,
  },
  {
    name: "NIFTY BANK",
    symbol: "NIFTYBANK",
    value: 48234.5,
    changeAmount: -89.2,
    changePercent: -0.18,
  },
];

const MOCK_EQUITIES: Company[] = [
  {
    name: "Reliance Industries",
    ticker: "RELIANCE",
    price: 2847.5,
    changePercent: 1.2,
    marketCap: 19240000000000,
    sector: "Energy",
    description:
      "India's largest private sector corporation, with businesses in energy, petrochemicals, textiles, and retail.",
    week52High: 3024.9,
    week52Low: 2220.3,
  },
  {
    name: "Tata Consultancy Services",
    ticker: "TCS",
    price: 3654.2,
    changePercent: -0.8,
    marketCap: 13300000000000,
    sector: "IT",
    description:
      "India's largest IT services company, providing consulting, business process services and technology solutions.",
    week52High: 4255.0,
    week52Low: 3082.1,
  },
  {
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    price: 1623.4,
    changePercent: 0.5,
    marketCap: 12340000000000,
    sector: "Banking",
    description:
      "India's largest private sector bank by assets, offering a wide range of banking and financial services.",
    week52High: 1794.0,
    week52Low: 1363.5,
  },
  {
    name: "Infosys",
    ticker: "INFY",
    price: 1456.3,
    changePercent: 1.8,
    marketCap: 6080000000000,
    sector: "IT",
    description:
      "Global leader in next-generation digital services and consulting, enabling clients in 56 countries.",
    week52High: 1953.9,
    week52Low: 1307.0,
  },
  {
    name: "ICICI Bank",
    ticker: "ICICIBANK",
    price: 1082.6,
    changePercent: -0.3,
    marketCap: 7620000000000,
    sector: "Banking",
    description:
      "India's second largest private sector bank, offering banking products and financial services.",
    week52High: 1196.0,
    week52Low: 885.8,
  },
  {
    name: "Wipro",
    ticker: "WIPRO",
    price: 478.9,
    changePercent: 2.1,
    marketCap: 2490000000000,
    sector: "IT",
    description:
      "Global IT, consulting and business process services company headquartered in Bengaluru.",
    week52High: 562.2,
    week52Low: 390.4,
  },
  {
    name: "Bajaj Finance",
    ticker: "BAJFINANCE",
    price: 6843.2,
    changePercent: -1.4,
    marketCap: 4220000000000,
    sector: "NBFC",
    description:
      "India's most diversified NBFC, lending across consumer, SME and commercial segments.",
    week52High: 8192.0,
    week52Low: 6193.0,
  },
  {
    name: "HUL",
    ticker: "HINDUNILVR",
    price: 2234.7,
    changePercent: 0.9,
    marketCap: 5240000000000,
    sector: "FMCG",
    description:
      "India's largest fast-moving consumer goods company with over 44 brands across 14 categories.",
    week52High: 2859.8,
    week52Low: 2172.0,
  },
  {
    name: "Maruti Suzuki",
    ticker: "MARUTI",
    price: 11234.5,
    changePercent: 0.6,
    marketCap: 3390000000000,
    sector: "Auto",
    description:
      "India's largest passenger vehicle manufacturer, with a market share of over 40%.",
    week52High: 12895.0,
    week52Low: 9480.0,
  },
  {
    name: "State Bank of India",
    ticker: "SBIN",
    price: 762.3,
    changePercent: 1.5,
    marketCap: 6800000000000,
    sector: "Banking",
    description:
      "India's largest public sector bank, providing banking and financial services across India and internationally.",
    week52High: 912.0,
    week52Low: 621.4,
  },
];

const MOCK_COMMODITIES: Commodity[] = [
  {
    name: "Gold",
    ticker: "GOLD",
    price: 62450,
    changePercent: 0.3,
    volume: 12500000,
    category: "Precious Metals",
    description: "Gold futures traded on MCX. Price per 10 grams.",
    week52High: 65420,
    week52Low: 54870,
  },
  {
    name: "Silver",
    ticker: "SILVER",
    price: 78230,
    changePercent: -0.5,
    volume: 8900000,
    category: "Precious Metals",
    description: "Silver futures traded on MCX. Price per kilogram.",
    week52High: 89650,
    week52Low: 65400,
  },
  {
    name: "Crude Oil",
    ticker: "CRUDEOIL",
    price: 6842,
    changePercent: 1.1,
    volume: 15600000,
    category: "Energy",
    description: "Crude oil futures on MCX. Price per barrel.",
    week52High: 7420,
    week52Low: 5840,
  },
  {
    name: "Natural Gas",
    ticker: "NATURALGAS",
    price: 234.5,
    changePercent: -2.3,
    volume: 9800000,
    category: "Energy",
    description: "Natural gas futures on MCX. Price per MMBTU.",
    week52High: 340.0,
    week52Low: 180.5,
  },
  {
    name: "Copper",
    ticker: "COPPER",
    price: 789.4,
    changePercent: 0.8,
    volume: 5600000,
    category: "Base Metals",
    description: "Copper futures on MCX. Price per kilogram.",
    week52High: 850.0,
    week52Low: 680.2,
  },
  {
    name: "Zinc",
    ticker: "ZINC",
    price: 245.6,
    changePercent: -0.4,
    volume: 4200000,
    category: "Base Metals",
    description: "Zinc futures on MCX. Price per kilogram.",
    week52High: 298.0,
    week52Low: 214.5,
  },
  {
    name: "Aluminium",
    ticker: "ALUMINIUM",
    price: 212.8,
    changePercent: 1.2,
    volume: 3800000,
    category: "Base Metals",
    description: "Aluminium futures on MCX. Price per kilogram.",
    week52High: 248.5,
    week52Low: 185.0,
  },
  {
    name: "Cotton",
    ticker: "COTTON",
    price: 32450,
    changePercent: -0.9,
    volume: 2100000,
    category: "Agriculture",
    description: "Cotton futures on MCX. Price per bale.",
    week52High: 38200,
    week52Low: 28500,
  },
];

type DetailItem = {
  type: "company" | "commodity";
  data: Company | Commodity;
};

function formatPrice(price: number, ticker: string): string {
  if (["GOLD"].includes(ticker)) return `₹${price.toLocaleString("en-IN")}/10g`;
  if (["SILVER", "COPPER", "ZINC", "ALUMINIUM"].includes(ticker))
    return `₹${price.toLocaleString("en-IN")}/kg`;
  if (["CRUDEOIL"].includes(ticker))
    return `₹${price.toLocaleString("en-IN")}/bbl`;
  if (["COTTON"].includes(ticker))
    return `₹${price.toLocaleString("en-IN")}/bale`;
  return `₹${price.toLocaleString("en-IN")}`;
}

function ChangeIndicator({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span
      className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? "text-positive" : "text-negative"}`}
    >
      {isPositive ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      {isPositive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { userName } = useAuth();

  const { actor } = useActor();
  const [indices, setIndices] = useState<MarketIndex[]>(MOCK_INDICES);
  const [equities, setEquities] = useState<Company[]>(MOCK_EQUITIES);
  const [commodities, setCommodities] = useState<Commodity[]>(MOCK_COMMODITIES);
  const [loadingEquities, setLoadingEquities] = useState(true);
  const [loadingCommodities, setLoadingCommodities] = useState(true);
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  useEffect(() => {
    if (!actor) {
      setLoadingEquities(false);
      setLoadingCommodities(false);
      return;
    }
    // Load all data in parallel
    void Promise.all([
      actor
        .getMarketIndices()
        .then((data) => {
          if (data && data.length > 0) setIndices(data);
        })
        .catch(() => {}),
      actor
        .getEquities()
        .then((data) => {
          if (data && data.length > 0) setEquities(data);
        })
        .catch(() => {})
        .finally(() => setLoadingEquities(false)),
      actor
        .getCommodities()
        .then((data) => {
          if (data && data.length > 0) setCommodities(data);
        })
        .catch(() => {})
        .finally(() => setLoadingCommodities(false)),
    ]);
  }, [actor]);

  const openDetail = async (ticker: string) => {
    setLoadingDetail(true);
    setSelectedDetail(null);
    try {
      if (!actor) throw new Error("No actor");
      const result = await actor.getInstrumentDetail(ticker);
      if (result.__kind__ === "company") {
        const companyResult = result as {
          __kind__: "company";
          company: Company;
        };
        setSelectedDetail({ type: "company", data: companyResult.company });
      } else {
        const commodityResult = result as {
          __kind__: "commodity";
          commodity: Commodity;
        };
        setSelectedDetail({
          type: "commodity",
          data: commodityResult.commodity,
        });
      }
    } catch {
      // fallback to local data
      const equity = equities.find((e) => e.ticker === ticker);
      if (equity) {
        setSelectedDetail({ type: "company", data: equity });
        setLoadingDetail(false);
        return;
      }
      const commodity = commodities.find((c) => c.ticker === ticker);
      if (commodity) {
        setSelectedDetail({ type: "commodity", data: commodity });
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  const userInitials = "TU1";
  const marqueeItems = [...indices, ...indices]; // duplicate for seamless loop

  return (
    <div className="min-h-screen bg-trustbeige-100 font-body">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-trustbeige-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-08-at-1.00.24-PM-1.jpeg"
              alt="TrustCap"
              className="w-8 h-8 object-contain rounded-full"
            />
            <span className="font-display font-bold text-lg text-trustblue-900 hidden sm:block">
              TrustCap
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeNav === "dashboard"
                  ? "bg-trustblue-50 text-trustblue-800"
                  : "text-trustblue-600 hover:bg-trustbeige-100"
              }`}
              onClick={() => setActiveNav("dashboard")}
              data-ocid="nav.dashboard_link"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:block">Dashboard</span>
            </button>
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeNav === "equity"
                  ? "bg-trustblue-50 text-trustblue-800"
                  : "text-trustblue-600 hover:bg-trustbeige-100"
              }`}
              onClick={() => setActiveNav("equity")}
              data-ocid="nav.equity_link"
            >
              <BarChart2 className="w-4 h-4" />
              <span className="hidden sm:block">Equity</span>
            </button>
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeNav === "commodities"
                  ? "bg-trustblue-50 text-trustblue-800"
                  : "text-trustblue-600 hover:bg-trustbeige-100"
              }`}
              onClick={() => setActiveNav("commodities")}
              data-ocid="nav.commodities_link"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:block">Commodities</span>
            </button>
          </nav>

          {/* User Profile */}
          <button
            type="button"
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-trustbeige-100 transition-colors group"
            onClick={() => navigate({ to: "/profile" })}
            data-ocid="nav.profile_button"
          >
            <div className="hidden sm:block text-right">
              <div className="text-xs font-semibold text-trustblue-900">
                {userName}
              </div>
              <div className="text-xs text-trustblue-400">View Profile</div>
            </div>
            <Avatar className="w-9 h-9 bg-trustblue-800 ring-2 ring-trustblue-200 group-hover:ring-trustblue-400 transition-all">
              <AvatarFallback className="bg-trustblue-800 text-white font-bold text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </header>

      {/* Market Indices Marquee */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-trustcap-marquee shadow-marquee overflow-hidden marquee-container">
        <div className="flex items-center">
          {/* Marquee label */}
          <div className="flex-shrink-0 px-4 py-2.5 bg-trustblue-900/50 border-r border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-trustgreen-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
              Live Markets
            </span>
          </div>

          {/* Scrolling items */}
          <div className="flex animate-marquee whitespace-nowrap">
            {marqueeItems.map((index, i) => {
              const ocidMap: Record<string, string> = {
                NIFTY50: "marquee.nifty50.button",
                SENSEX: "marquee.sensex.button",
                NIFTYBANK: "marquee.niftybank.button",
              };
              return (
                <div
                  key={`${index.symbol}-${i}`}
                  className="inline-flex items-center gap-3 mx-4 px-4 py-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-lg border border-white/15 transition-all"
                >
                  <div>
                    <div className="text-white font-bold text-sm">
                      {index.name}
                    </div>
                    <div className="text-blue-200 text-xs">{index.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">
                      {index.value.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        index.changePercent >= 0
                          ? "text-trustgreen-300"
                          : "text-red-300"
                      }`}
                    >
                      {index.changeAmount >= 0 ? "+" : ""}
                      {index.changeAmount.toFixed(2)} (
                      {index.changePercent >= 0 ? "+" : ""}
                      {index.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                  <div
                    className={`w-1.5 h-8 rounded-full ${
                      index.changePercent >= 0
                        ? "bg-trustgreen-400"
                        : "bg-red-400"
                    }`}
                  />
                  <button
                    type="button"
                    className="ml-1 px-2.5 py-1 text-xs font-semibold text-white bg-white/20 hover:bg-white/35 rounded-full border border-white/30 transition-all whitespace-nowrap cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      void navigate({ to: `/index-detail/${index.symbol}` });
                    }}
                    data-ocid={ocidMap[index.symbol]}
                  >
                    Show Details
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content with top offset for navbar + marquee */}
      <main className="pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Welcome Banner */}
          <div className="mb-6 p-5 bg-gradient-to-r from-trustblue-900 to-trustblue-700 rounded-2xl text-white flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">
                Good{" "}
                {new Date().getHours() < 12
                  ? "Morning"
                  : new Date().getHours() < 17
                    ? "Afternoon"
                    : "Evening"}
                , {userName}! 👋
              </h2>
              <p className="text-blue-200 text-sm mt-1">
                Markets are{" "}
                <span className="text-trustgreen-300 font-semibold">open</span>.
                NIFTY 50 is{" "}
                <span className="text-trustgreen-300 font-semibold">
                  up +0.56%
                </span>{" "}
                today.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-blue-200">
              <div className="text-right">
                <div className="text-xs">Portfolio Value</div>
                <div className="font-display font-bold text-xl text-white">
                  ₹0.00
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-trustgreen-400" />
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Equity Section */}
            <section
              className="bg-white rounded-2xl shadow-card border border-trustbeige-200 overflow-hidden"
              data-ocid="equity.section"
            >
              <div className="flex items-center justify-between p-5 border-b border-trustbeige-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-trustblue-50 rounded-lg flex items-center justify-center">
                    <BarChart2 className="w-4 h-4 text-trustblue-700" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-trustblue-900 text-lg">
                      Equity
                    </h2>
                    <p className="text-xs text-trustblue-400">
                      Top Companies by Market Cap
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-trustblue-600 hover:text-trustblue-800 text-xs font-medium"
                  data-ocid="equity.view_all_button"
                >
                  View All <ChevronRight className="w-3 h-3 ml-0.5" />
                </Button>
              </div>

              <div className="divide-y divide-trustbeige-100">
                {loadingEquities
                  ? ["eq-s1", "eq-s2", "eq-s3", "eq-s4", "eq-s5"].map((sk) => (
                      <div
                        key={sk}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="space-y-1.5">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="space-y-1.5 text-right">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                      </div>
                    ))
                  : equities.slice(0, 10).map((company, idx) => (
                      <button
                        type="button"
                        key={company.ticker}
                        className="w-full flex items-center justify-between p-4 hover:bg-trustbeige-50 transition-colors group text-left"
                        onClick={() => openDetail(company.ticker)}
                        data-ocid={`equity.item.${idx + 1}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-trustblue-100 to-trustblue-200 flex items-center justify-center font-bold text-trustblue-800 text-xs flex-shrink-0">
                            {company.ticker.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-semibold text-trustblue-900 text-sm group-hover:text-trustblue-700 transition-colors line-clamp-1">
                              {company.name}
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-trustbeige-100 text-trustblue-500 border-0 text-xs px-1.5 py-0 h-4 mt-0.5"
                            >
                              {company.ticker}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-trustblue-900 text-sm">
                            ₹{company.price.toLocaleString("en-IN")}
                          </div>
                          <ChangeIndicator value={company.changePercent} />
                        </div>
                      </button>
                    ))}
              </div>
            </section>

            {/* Commodities Section */}
            <section
              className="bg-white rounded-2xl shadow-card border border-trustbeige-200 overflow-hidden"
              data-ocid="commodities.section"
            >
              <div className="flex items-center justify-between p-5 border-b border-trustbeige-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-trustgreen-50 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-trustgreen-700" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-trustblue-900 text-lg">
                      Commodities
                    </h2>
                    <p className="text-xs text-trustblue-400">
                      MCX Traded Commodities
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-trustblue-600 hover:text-trustblue-800 text-xs font-medium"
                  data-ocid="commodities.view_all_button"
                >
                  View All <ChevronRight className="w-3 h-3 ml-0.5" />
                </Button>
              </div>

              <div className="divide-y divide-trustbeige-100">
                {loadingCommodities
                  ? ["cm-s1", "cm-s2", "cm-s3", "cm-s4", "cm-s5"].map((sk) => (
                      <div
                        key={sk}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="space-y-1.5">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-3 w-14" />
                        </div>
                        <div className="space-y-1.5 text-right">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                      </div>
                    ))
                  : commodities.slice(0, 8).map((commodity, idx) => (
                      <button
                        type="button"
                        key={commodity.ticker}
                        className="w-full flex items-center justify-between p-4 hover:bg-trustbeige-50 transition-colors group text-left"
                        onClick={() => openDetail(commodity.ticker)}
                        data-ocid={`commodities.item.${idx + 1}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-trustgreen-100 to-trustgreen-200 flex items-center justify-center font-bold text-trustgreen-800 text-xs flex-shrink-0">
                            {commodity.ticker.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-semibold text-trustblue-900 text-sm group-hover:text-trustblue-700 transition-colors">
                              {commodity.name}
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-trustbeige-100 text-trustgreen-600 border-0 text-xs px-1.5 py-0 h-4 mt-0.5"
                            >
                              {commodity.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-trustblue-900 text-sm">
                            {formatPrice(commodity.price, commodity.ticker)}
                          </div>
                          <ChangeIndicator value={commodity.changePercent} />
                        </div>
                      </button>
                    ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedDetail || loadingDetail}
        onOpenChange={() => setSelectedDetail(null)}
      >
        <DialogContent
          className="sm:max-w-lg bg-white rounded-2xl p-0 overflow-hidden"
          data-ocid="detail.modal"
        >
          {loadingDetail ? (
            <div className="p-8 space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-2 gap-4 pt-4">
                {["dt-s1", "dt-s2", "dt-s3", "dt-s4"].map((sk) => (
                  <Skeleton key={sk} className="h-16" />
                ))}
              </div>
            </div>
          ) : selectedDetail ? (
            <>
              {/* Modal Header */}
              <div className="bg-trustcap-hero p-5 text-white relative">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-white/70 hover:text-white"
                  onClick={() => setSelectedDetail(null)}
                  data-ocid="detail.close_button"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center font-bold text-white text-sm">
                    {selectedDetail.data.ticker.slice(0, 2)}
                  </div>
                  <div>
                    <DialogHeader>
                      <DialogTitle className="text-white font-display text-xl font-bold text-left">
                        {selectedDetail.data.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge className="bg-white/20 text-white border-0 text-xs">
                        {selectedDetail.data.ticker}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-0 text-xs">
                        {selectedDetail.type === "company"
                          ? (selectedDetail.data as Company).sector
                          : (selectedDetail.data as Commodity).category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <span className="font-display text-3xl font-extrabold">
                    {selectedDetail.type === "company"
                      ? `₹${selectedDetail.data.price.toLocaleString("en-IN")}`
                      : formatPrice(
                          selectedDetail.data.price,
                          selectedDetail.data.ticker,
                        )}
                  </span>
                  <span
                    className={`text-sm font-semibold mb-1 ${
                      selectedDetail.data.changePercent >= 0
                        ? "text-trustgreen-300"
                        : "text-red-300"
                    }`}
                  >
                    {selectedDetail.data.changePercent >= 0 ? "+" : ""}
                    {selectedDetail.data.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-trustbeige-50 rounded-xl">
                    <div className="text-xs text-trustblue-400 mb-1">
                      52W High
                    </div>
                    <div className="font-semibold text-trustblue-900 text-sm">
                      ₹{selectedDetail.data.week52High.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="p-3 bg-trustbeige-50 rounded-xl">
                    <div className="text-xs text-trustblue-400 mb-1">
                      52W Low
                    </div>
                    <div className="font-semibold text-trustblue-900 text-sm">
                      ₹{selectedDetail.data.week52Low.toLocaleString("en-IN")}
                    </div>
                  </div>
                  {selectedDetail.type === "company" ? (
                    <div className="p-3 bg-trustbeige-50 rounded-xl">
                      <div className="text-xs text-trustblue-400 mb-1">
                        Market Cap
                      </div>
                      <div className="font-semibold text-trustblue-900 text-sm">
                        ₹
                        {(
                          (selectedDetail.data as Company).marketCap / 1e12
                        ).toFixed(2)}
                        T
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-trustbeige-50 rounded-xl">
                      <div className="text-xs text-trustblue-400 mb-1">
                        Volume
                      </div>
                      <div className="font-semibold text-trustblue-900 text-sm">
                        {(
                          selectedDetail.data as Commodity
                        ).volume.toLocaleString("en-IN")}
                      </div>
                    </div>
                  )}
                  <div className="p-3 bg-trustbeige-50 rounded-xl">
                    <div className="text-xs text-trustblue-400 mb-1">
                      Change
                    </div>
                    <div
                      className={`font-semibold text-sm ${
                        selectedDetail.data.changePercent >= 0
                          ? "text-positive"
                          : "text-negative"
                      }`}
                    >
                      {selectedDetail.data.changePercent >= 0 ? "+" : ""}
                      {selectedDetail.data.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-trustblue-800 text-sm mb-2">
                    About
                  </h3>
                  <p className="text-sm text-trustblue-600 leading-relaxed">
                    {selectedDetail.data.description}
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    Investments are subject to market risks. Past performance is
                    not indicative of future results.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-trustgreen-600 hover:bg-trustgreen-500 text-white font-semibold">
                    Buy
                  </Button>
                  <Button
                    variant="outline"
                    className="border-trustblue-200 text-trustblue-700 hover:bg-trustblue-50"
                  >
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
