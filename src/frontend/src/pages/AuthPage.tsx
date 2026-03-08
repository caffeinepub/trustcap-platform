import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Shield, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate Google OAuth login delay
    await new Promise((resolve) => setTimeout(resolve, 1800));
    login();
    setIsLoading(false);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-trustbeige-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 bg-trustblue-700 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 bg-trustgreen-500 blur-3xl" />
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(26,54,112,0.08) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Back link */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-trustblue-600 hover:text-trustblue-900 mb-6 transition-colors group"
          onClick={() => navigate({ to: "/" })}
          data-ocid="auth.back_home_link"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </button>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-card-hover border border-trustbeige-200 overflow-hidden">
          {/* Card header */}
          <div className="bg-trustcap-hero p-8 text-center">
            <img
              src="/assets/generated/trustcap-logo-transparent.dim_120x120.png"
              alt="TrustCap Platform"
              className="w-16 h-16 object-contain mx-auto mb-4"
            />
            <h1 className="font-display text-2xl font-extrabold text-white mb-1">
              TrustCap Platform
            </h1>
            <p className="text-blue-200 text-sm">
              India's First Next-Gen Zero Commission Brokerage
            </p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-xl font-bold text-trustblue-900 mb-2">
                Sign In or Create Account
              </h2>
              <p className="text-sm text-trustblue-500">
                Access your investment dashboard and start trading
              </p>
            </div>

            {/* Google Sign In Button */}
            <Button
              className="w-full h-12 bg-white hover:bg-trustbeige-50 border-2 border-trustbeige-300 hover:border-trustblue-300 text-trustblue-900 font-semibold text-sm transition-all duration-200 shadow-xs hover:shadow-card group"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              data-ocid="auth.google_button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-trustblue-600" />
                  Signing in...
                </>
              ) : (
                <>
                  {/* Google SVG icon */}
                  <svg
                    className="mr-3 h-5 w-5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-trustbeige-200" />
              </div>
              <div className="relative flex justify-center text-xs text-trustblue-400 uppercase bg-white px-3">
                Secure & encrypted
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Shield, label: "256-bit SSL" },
                { icon: TrendingUp, label: "SEBI Listed" },
                { icon: Zap, label: "Zero Fees" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 p-2 bg-trustbeige-50 rounded-lg border border-trustbeige-200"
                >
                  <Icon className="w-4 h-4 text-trustblue-700" />
                  <span className="text-xs text-trustblue-600 font-medium text-center">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-center text-trustblue-400 leading-relaxed">
              By continuing, you agree to TrustCap's{" "}
              <a
                href="/terms"
                className="text-trustblue-600 hover:underline font-medium"
              >
                Terms of Service
              </a>{" "}
              &{" "}
              <a
                href="/privacy"
                className="text-trustblue-600 hover:underline font-medium"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-trustblue-400 mt-6 leading-relaxed px-4">
          Investments in securities market are subject to market risks. Read all
          the related documents carefully before investing.
        </p>
      </div>
    </div>
  );
}
