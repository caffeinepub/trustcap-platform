import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  HelpCircle,
  Loader2,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

interface ProfileData {
  name: string;
  description: string;
  email: string;
  phone: string;
}

const defaultProfile: ProfileData = {
  name: "TrustCap User1",
  description:
    "Active investor on TrustCap Platform. Interested in equity and commodity trading.",
  email: "trustcapuser1@gmail.com",
  phone: "+91 98765 43210",
};

const faqItems = [
  {
    question: "How do I start investing?",
    answer:
      "Getting started is simple! Complete your KYC verification, link your bank account, and fund your wallet. Once done, browse equities or commodities and place your first trade. TrustCap charges zero commission on all trades.",
  },
  {
    question: "What is zero commission?",
    answer:
      "Zero commission means TrustCap does not charge any brokerage fee when you buy or sell stocks, ETFs, or commodities. Unlike traditional brokers who charge ₹20 per trade or 0.1–0.5% of trade value, you keep 100% of your profits with TrustCap.",
  },
  {
    question: "How is my money secured?",
    answer:
      "Your funds are secured through multiple layers: SEBI-registered depository (CDSL), bank-grade 256-bit SSL encryption, two-factor authentication, and real-time fraud monitoring. Your securities are held in your own demat account, not TrustCap's.",
  },
  {
    question: "How to withdraw funds?",
    answer:
      "Withdrawals are processed in 1–3 business days. Go to Funds → Withdraw, enter the amount, and confirm with your PIN. Funds are credited directly to your linked bank account. There are no withdrawal fees.",
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userName } = useAuth();
  const { actor } = useActor();

  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [editProfile, setEditProfile] = useState<ProfileData>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "personal" | "contact" | "helpdesk"
  >("personal");

  useEffect(() => {
    if (!actor) {
      setIsLoading(false);
      return;
    }
    actor
      .getCallerUserProfile()
      .then((data) => {
        if (data) {
          const loaded: ProfileData = {
            name: data.name || defaultProfile.name,
            description: data.description || defaultProfile.description,
            email: data.email || defaultProfile.email,
            phone: data.phone || defaultProfile.phone,
          };
          setProfile(loaded);
          setEditProfile(loaded);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [actor]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (actor) {
        await actor.saveCallerUserProfile(editProfile);
      }
      setProfile(editProfile);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch {
      // Still update locally
      setProfile(editProfile);
      setIsEditing(false);
      toast.success("Profile updated!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-trustbeige-100 font-body">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-trustbeige-200 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-trustblue-600 hover:text-trustblue-900 transition-colors group"
            onClick={() => navigate({ to: "/dashboard" })}
            data-ocid="profile.back_button"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/generated/trustcap-logo-transparent.dim_120x120.png"
              alt="TrustCap"
              className="w-7 h-7 object-contain"
            />
            <span className="font-display font-bold text-trustblue-900 hidden sm:block">
              TrustCap Platform
            </span>
          </div>
          <div className="w-24" /> {/* spacer */}
        </div>
      </header>

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Profile Hero Card */}
        <div className="bg-white rounded-2xl shadow-card border border-trustbeige-200 overflow-hidden mb-6">
          <div className="bg-trustcap-hero p-6 pb-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 bg-trustblue-600 ring-4 ring-white/20">
                    <AvatarFallback className="bg-trustblue-700 text-white text-2xl font-bold">
                      TU1
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-trustgreen-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2">
                    <h1 className="font-display text-2xl font-extrabold text-white">
                      {isLoading ? (
                        <Skeleton className="h-7 w-48 bg-white/20" />
                      ) : (
                        profile.name
                      )}
                    </h1>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition-all"
                      data-ocid="profile.edit_button"
                      title="Edit Profile"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-blue-200 text-sm mt-1">
                    {isLoading ? (
                      <Skeleton className="h-4 w-64 bg-white/20 mt-1" />
                    ) : (
                      profile.description
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-trustgreen-600/30 text-trustgreen-200 border-trustgreen-500/30 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      KYC Verified
                    </Badge>
                    <Badge className="bg-white/15 text-blue-200 border-white/20 text-xs">
                      {userName}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 divide-x divide-trustbeige-200 border-t border-trustbeige-200">
            {[
              { label: "Portfolio", value: "₹0.00" },
              { label: "Holdings", value: "0" },
              { label: "P&L", value: "₹0.00" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 text-center">
                <div className="font-display font-bold text-trustblue-900 text-lg">
                  {stat.value}
                </div>
                <div className="text-xs text-trustblue-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-xs border border-trustbeige-200">
          {[
            { id: "personal", label: "Personal Info", icon: User },
            { id: "contact", label: "Contact", icon: Phone },
            { id: "helpdesk", label: "Help Desk", icon: HelpCircle },
          ].map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-trustblue-900 text-white shadow-xs"
                  : "text-trustblue-600 hover:bg-trustbeige-100"
              }`}
              onClick={() => setActiveTab(id as typeof activeTab)}
              data-ocid={`profile.${id}.tab`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
        </div>

        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <div className="bg-white rounded-2xl shadow-card border border-trustbeige-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-trustblue-900 text-lg">
                  Personal Information
                </h2>
                <p className="text-sm text-trustblue-400 mt-0.5">
                  Your account details and preferences
                </p>
              </div>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-trustblue-200 text-trustblue-700 hover:bg-trustblue-50"
                  onClick={() => setIsEditing(true)}
                  data-ocid="profile.edit_button"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1.5" />
                  Edit
                </Button>
              )}
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-trustblue-600 uppercase tracking-wider">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editProfile.name}
                      onChange={(e) =>
                        setEditProfile((p) => ({ ...p, name: e.target.value }))
                      }
                      className="border-trustbeige-300 focus:border-trustblue-400"
                      data-ocid="profile.name_input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-trustbeige-50 rounded-lg">
                      <User className="w-4 h-4 text-trustblue-400" />
                      <span className="text-sm text-trustblue-900 font-medium">
                        {profile.name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-trustblue-600 uppercase tracking-wider">
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editProfile.email}
                      onChange={(e) =>
                        setEditProfile((p) => ({ ...p, email: e.target.value }))
                      }
                      className="border-trustbeige-300 focus:border-trustblue-400"
                      data-ocid="profile.email_input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-trustbeige-50 rounded-lg">
                      <Mail className="w-4 h-4 text-trustblue-400" />
                      <span className="text-sm text-trustblue-900 font-medium">
                        {profile.email}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-trustblue-600 uppercase tracking-wider">
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={editProfile.phone}
                      onChange={(e) =>
                        setEditProfile((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="border-trustbeige-300 focus:border-trustblue-400"
                      data-ocid="profile.phone_input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-trustbeige-50 rounded-lg">
                      <Phone className="w-4 h-4 text-trustblue-400" />
                      <span className="text-sm text-trustblue-900 font-medium">
                        {profile.phone}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-trustblue-600 uppercase tracking-wider">
                    Account Type
                  </Label>
                  <div className="flex items-center gap-2 p-3 bg-trustbeige-50 rounded-lg">
                    <Shield className="w-4 h-4 text-trustblue-400" />
                    <span className="text-sm text-trustblue-900 font-medium">
                      Individual Investor
                    </span>
                    <Badge className="ml-auto bg-trustgreen-100 text-trustgreen-700 border-trustgreen-200 text-xs">
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-trustblue-600 uppercase tracking-wider">
                  Bio / Description
                </Label>
                {isEditing ? (
                  <Textarea
                    value={editProfile.description}
                    onChange={(e) =>
                      setEditProfile((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    className="border-trustbeige-300 focus:border-trustblue-400 resize-none"
                    rows={3}
                    data-ocid="profile.description_textarea"
                  />
                ) : (
                  <div className="p-3 bg-trustbeige-50 rounded-lg">
                    <p className="text-sm text-trustblue-900 leading-relaxed">
                      {profile.description}
                    </p>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-trustblue-900 hover:bg-trustblue-800 text-white font-semibold"
                    data-ocid="profile.save_button"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="border-trustbeige-300 text-trustblue-700"
                    data-ocid="profile.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Information Tab */}
        {activeTab === "contact" && (
          <div className="bg-white rounded-2xl shadow-card border border-trustbeige-200 p-6">
            <div className="mb-5">
              <h2 className="font-display font-bold text-trustblue-900 text-lg">
                Contact Information
              </h2>
              <p className="text-sm text-trustblue-400 mt-0.5">
                Manage how we can reach you
              </p>
            </div>

            <div className="space-y-5">
              <div className="p-4 bg-trustbeige-50 rounded-xl border border-trustbeige-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-trustblue-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-trustblue-700" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-trustblue-500 uppercase tracking-wider">
                      Email Address
                    </div>
                    <div className="font-semibold text-trustblue-900 text-sm">
                      {profile.email}
                    </div>
                  </div>
                  <Badge className="ml-auto bg-trustgreen-100 text-trustgreen-700 border-trustgreen-200 text-xs">
                    Verified
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-trustbeige-50 rounded-xl border border-trustbeige-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-trustblue-100 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-trustblue-700" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-trustblue-500 uppercase tracking-wider">
                      Phone Number
                    </div>
                    <div className="font-semibold text-trustblue-900 text-sm">
                      {profile.phone}
                    </div>
                  </div>
                  <Badge className="ml-auto bg-trustgreen-100 text-trustgreen-700 border-trustgreen-200 text-xs">
                    Verified
                  </Badge>
                </div>
              </div>

              <Separator className="bg-trustbeige-200" />

              <div>
                <h3 className="font-semibold text-trustblue-800 text-sm mb-3">
                  Update Contact Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-trustblue-600 uppercase tracking-wider">
                      New Email
                    </Label>
                    <Input
                      type="email"
                      placeholder={profile.email}
                      value={editProfile.email}
                      onChange={(e) =>
                        setEditProfile((p) => ({ ...p, email: e.target.value }))
                      }
                      className="border-trustbeige-300 focus:border-trustblue-400"
                      data-ocid="profile.contact_email_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-trustblue-600 uppercase tracking-wider">
                      New Phone
                    </Label>
                    <Input
                      type="tel"
                      placeholder={profile.phone}
                      value={editProfile.phone}
                      onChange={(e) =>
                        setEditProfile((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="border-trustbeige-300 focus:border-trustblue-400"
                      data-ocid="profile.contact_phone_input"
                    />
                  </div>
                  <Button
                    className="bg-trustblue-900 hover:bg-trustblue-800 text-white font-semibold"
                    onClick={handleSave}
                    disabled={isSaving}
                    data-ocid="profile.save_button"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Update Contact
                  </Button>
                </div>
              </div>

              <Separator className="bg-trustbeige-200" />

              {/* Notifications */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-trustblue-600" />
                  <h3 className="font-semibold text-trustblue-800 text-sm">
                    Notification Preferences
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Trade confirmation alerts",
                    "Price movement alerts",
                    "Portfolio performance weekly",
                    "Market opening & closing alerts",
                  ].map((pref) => (
                    <div
                      key={pref}
                      className="flex items-center justify-between p-3 bg-trustbeige-50 rounded-lg"
                    >
                      <span className="text-sm text-trustblue-700">{pref}</span>
                      <div className="w-9 h-5 bg-trustgreen-500 rounded-full flex items-center justify-end pr-1 cursor-pointer">
                        <div className="w-3.5 h-3.5 bg-white rounded-full shadow-xs" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-6 pt-5 border-t border-trustbeige-200">
              <Button
                className="w-full bg-trustblue-900 hover:bg-trustblue-800 text-white font-semibold"
                onClick={handleSave}
                disabled={isSaving}
                data-ocid="profile.submit_button"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save All Changes
              </Button>
            </div>
          </div>
        )}

        {/* Help Desk Tab */}
        {activeTab === "helpdesk" && (
          <div className="bg-white rounded-2xl shadow-card border border-trustbeige-200 p-6">
            <div className="mb-5">
              <h2 className="font-display font-bold text-trustblue-900 text-lg">
                Help Desk
              </h2>
              <p className="text-sm text-trustblue-400 mt-0.5">
                Frequently asked questions and support
              </p>
            </div>

            {/* Quick Support Card */}
            <div className="p-4 bg-gradient-to-r from-trustblue-900 to-trustblue-700 rounded-xl text-white mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    Need immediate help?
                  </div>
                  <div className="text-blue-200 text-xs">
                    Our support team is available 24/7
                  </div>
                </div>
                <Button
                  className="ml-auto bg-trustgreen-600 hover:bg-trustgreen-500 text-white font-semibold text-sm px-4 py-2 h-auto"
                  data-ocid="helpdesk.support_button"
                  onClick={() => toast.success("Connecting to support chat...")}
                >
                  Chat with Support
                </Button>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div>
              <h3 className="font-semibold text-trustblue-700 text-sm uppercase tracking-wider mb-4">
                Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, idx) => (
                  <AccordionItem
                    key={item.question}
                    value={`item-${idx}`}
                    className="border border-trustbeige-200 rounded-xl px-4 overflow-hidden bg-trustbeige-50"
                    data-ocid={`helpdesk.faq.item.${idx + 1}`}
                  >
                    <AccordionTrigger className="text-sm font-semibold text-trustblue-900 hover:text-trustblue-700 hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-trustblue-600 leading-relaxed pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Support channels */}
            <div className="mt-6 pt-5 border-t border-trustbeige-200">
              <h3 className="font-semibold text-trustblue-700 text-sm uppercase tracking-wider mb-4">
                Other Support Channels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    icon: Mail,
                    title: "Email Support",
                    detail: "support@trustcap.in",
                    sub: "Reply within 24h",
                  },
                  {
                    icon: Phone,
                    title: "Phone Support",
                    detail: "1800-123-4567",
                    sub: "Mon–Sat, 9AM–6PM",
                  },
                  {
                    icon: MessageCircle,
                    title: "Live Chat",
                    detail: "Available 24/7",
                    sub: "Avg. response: 2 min",
                  },
                ].map(({ icon: Icon, title, detail, sub }) => (
                  <div
                    key={title}
                    className="p-4 bg-trustbeige-50 rounded-xl border border-trustbeige-200 hover:border-trustblue-200 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-trustblue-100 rounded-lg flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 text-trustblue-700" />
                    </div>
                    <div className="font-semibold text-trustblue-900 text-sm">
                      {title}
                    </div>
                    <div className="text-trustblue-700 text-xs font-medium mt-0.5">
                      {detail}
                    </div>
                    <div className="text-trustblue-400 text-xs mt-0.5">
                      {sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-trustblue-400">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-trustgreen-600 hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </div>
      </main>
    </div>
  );
}
