"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { MobileFrame } from "@/components/MobileFrame";
import { typographyClasses } from "@/lib/design-tokens";

const walletIcon = "/assets/5daee33910f157a803313624fd6cff57722045a4.svg";
const coinIcon = "/assets/1b9976c23144c36eb485fec603b2e8b128cb9a6d.png";
const arrowIcon = "/assets/0365a5d0c99f5aeaf60c2a6907a9c79e822025c4.svg";
const bgElement = "/assets/f2ae34c0e5c43f667aca0dfd4eac395448195903.svg";
const tabHome = "/assets/d3e6f6539809f95aec4a11fa36b8f3ce4bf0c952.svg";
const tabExplore = "/assets/417062a3ee2545ea5bc28b9237085ddddf818fd0.svg";
const tabRefer = "/assets/5505a1f4563fb4ead7d0944e70885a7c402c36b3.svg";
const tabPatients = "/assets/fee89e71228614a2ec72457e3298b626a0889241.svg";
const tabLogs = "/assets/0365a5d0c99f5aeaf60c2a6907a9c79e822025c4.svg";

type ReferralStatus = "Purchased" | "Not Purchased";

type Referral = {
  name: string;
  condition: string;
  referredOn: string;
  status: ReferralStatus;
};

const referrals: Referral[] = [
  { name: "Shyam GR", condition: "Diabetes", referredOn: "Today", status: "Not Purchased" },
  { name: "Megha Gupta", condition: "Diabetes", referredOn: "Yesterday", status: "Purchased" },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3 h-[54px] text-black">
      <p className="font-poppins font-medium text-base tracking-[0.1px]">9:41</p>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor" />
          <rect x="9" y="3" width="3" height="9" rx="1" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" className="ml-1">
          <path
            d="M0 3.5C2.5 1 5 0 7.5 0C10 0 12.5 1 15 3.5M3 6.5C4.5 5 6 4.5 7.5 4.5C9 4.5 10.5 5 12 6.5M6 9.5C6.5 9 7 8.5 7.5 8.5C8 8.5 8.5 9 9 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" className="ml-1">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" />
          <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
          <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function ReferralCard({ referral }: { referral: Referral }) {
  const pillClasses = useMemo(() => {
    if (referral.status === "Purchased") {
      return "bg-green-50 text-green-700 border border-green-200";
    }
    return "bg-amber-50 text-amber-700 border border-amber-200";
  }, [referral.status]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] border border-[#f1f1f5]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-[#f3edff] flex items-center justify-center text-[#4B4AD5] font-semibold">
            {getInitials(referral.name)}
          </div>
          <div className="space-y-1">
            <p className="font-poppins font-semibold text-[15px] leading-5 text-[#1f2933]">
              {referral.name}
            </p>
            <p className={`${typographyClasses.sh1} text-[#3d4854] leading-[18px]`}>{referral.condition}</p>
          </div>
        </div>
        <button
          aria-label={`View ${referral.name}`}
          className="w-9 h-9 rounded-full bg-[#eef0ff] border border-[#d5d8ff] flex items-center justify-center shadow-[0_6px_14px_rgba(75,74,213,0.25)] active:scale-95 transition-transform"
        >
          <img src={arrowIcon} alt="" className="w-4 h-4 rotate-[-90deg]" />
        </button>
      </div>
      <div className="mt-4">
        <div className="h-px bg-[#f1f1f5]" />
        <div className="mt-3 flex items-center justify-between">
          <p className={`${typographyClasses.sh1} text-[#3d4854]`}>
            Referred on: <span className="font-semibold">{referral.referredOn}</span>
          </p>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${pillClasses}`}>
            {referral.status}
          </span>
        </div>
      </div>
    </div>
  );
}

function BottomNav({
  onNavigate,
}: {
  onNavigate?: (destination: "home" | "refer" | "patients" | "logs") => void;
}) {
  const items = [
    { id: "home", label: "Home", icon: tabHome },
    { id: "explore", label: "Explore", icon: tabExplore, active: true },
    { id: "refer", label: "Refer", icon: tabRefer },
    { id: "patients", label: "Patients", icon: tabPatients },
    { id: "logs", label: "Logs", icon: tabLogs },
  ] as const;

  return (
    <nav className="bg-white border-t border-[#e3e4ef] h-[74px] flex items-center justify-between px-4">
      {items.map((item) => (
        <button
          key={item.id}
          className={`flex flex-col items-center gap-1 text-[11px] font-poppins ${
            item.active ? "text-[#4B4AD5] font-semibold" : "text-[#454551]"
          }`}
          aria-label={item.label}
          onClick={() => {
            if (item.id === "explore") return;
            onNavigate?.(item.id as "home" | "refer" | "patients" | "logs");
          }}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              item.active ? "bg-[#4B4AD5]/15 shadow-[0_6px_16px_rgba(75,74,213,0.25)]" : "bg-transparent"
            }`}
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`w-6 h-6 ${item.id === "home" ? "rotate-[270deg]" : ""} ${
                item.id === "logs" ? "rotate-[90deg]" : ""
              }`}
            />
          </div>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default function RemoteCarePage() {
  const router = useRouter();

  const handleReferClick = () => {
    router.push("/care-pathways?tab=create");
  };

  const handleBottomNav = (destination: "home" | "refer" | "patients" | "logs") => {
    if (destination === "home") {
      router.push("/");
    } else if (destination === "refer") {
      router.push("/care-pathways?tab=create");
    } else if (destination === "patients") {
      router.push("/care-pathways?tab=overview");
    } else if (destination === "logs") {
      router.push("/content");
    }
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full w-full bg-[#f5f5ff]">
        <div className="relative rounded-b-[36px] bg-gradient-to-b from-[#d4d8ff] via-[#e4e6ff] to-[#f4f4ff] pb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-35">
            <img src={bgElement} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_25%_25%,#ffffff,transparent_35%),radial-gradient(circle_at_80%_20%,#d6d9ff,transparent_40%),radial-gradient(circle_at_40%_70%,#bac6ff,transparent_45%)]" />
          </div>
          <div className="relative z-10">
            <StatusBar />
            <div className="flex items-start justify-between px-6 pb-4">
              <div className="space-y-1">
                <p className={`${typographyClasses.h4Medium} text-[#5f6a7a]`}>Welcome,</p>
                <h1 className="font-poppins font-semibold text-[22px] leading-7 text-[#1f2933]">
                  Dr.Umesh Kumar
                </h1>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/70 backdrop-blur shadow-md flex items-center justify-center border border-white/60">
                <img src={walletIcon} alt="Wallet" className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto -mt-10 pb-6 space-y-6">
          <div className="px-5">
            <div className="bg-[#fff7ec] border border-[#f1d59c] rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.05)] p-4 flex items-center gap-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ec] via-white/35 to-[#fff7ec]" />
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#f7e0a2] via-[#f6c36f] to-[#f5ad4a] flex items-center justify-center shadow-inner">
                <img src={coinIcon} alt="Rewards" className="w-10 h-10 object-contain" />
              </div>
              <div className="relative z-10 flex-1">
                <p className="font-poppins font-semibold text-base text-[#1f2933]">Refer & Earn Rewards</p>
                <p className={`${typographyClasses.sh1} text-[#3d4854]`}>
                  Earn rewards by referring care plans to patients. Know more.
                </p>
              </div>
              <button
                onClick={handleReferClick}
                aria-label="Refer a patient"
                className="relative z-10 w-10 h-10 rounded-full border border-[#f3d7a3] bg-white flex items-center justify-center active:scale-95 transition-transform shadow-sm"
              >
                <img src={arrowIcon} alt="" className="w-4 h-4 rotate-[-90deg]" />
              </button>
            </div>
          </div>

          <div className="px-5 space-y-4">
            <h2 className="font-poppins font-semibold text-lg leading-6 text-[#1f2933]">
              Patients Referred
            </h2>
            <div className="space-y-3">
              {referrals.map((referral) => (
                <ReferralCard key={referral.name} referral={referral} />
              ))}
            </div>
          </div>
        </div>

        <BottomNav onNavigate={handleBottomNav} />
      </div>
    </MobileFrame>
  );
}
