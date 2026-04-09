"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview", icon: "◉" },
  { href: "/crypto", label: "Crypto", icon: "₿" },
  { href: "/contract-work", label: "Contract Work", icon: "⚡" },
  { href: "/lead-gen", label: "Lead Gen", icon: "◎" },
  { href: "/youtube", label: "YouTube", icon: "▶" },
  { href: "/scraping", label: "Scraping", icon: "⧉" },
  { href: "/bug-bounty", label: "Bug Bounty", icon: "✈" },
];

export function GameNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-full w-16 bg-surface border-r border-border flex flex-col items-center py-4 z-50">
      <div className="mb-6">
        <div className="w-8 h-8 rounded-lg bg-accent-purple flex items-center justify-center text-white font-bold text-sm">
          $
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                transition-all duration-200 relative group
                ${
                  isActive
                    ? "bg-accent-purple/20 text-accent-purple"
                    : "text-text-muted hover:text-text-primary hover:bg-surface-elevated"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <div className="absolute left-full ml-2 px-2 py-1 bg-surface-elevated border border-border rounded text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto">
        <div className="w-8 h-8 rounded-full bg-accent-red/20 flex items-center justify-center text-accent-red text-xs">
          ⏻
        </div>
      </div>
    </nav>
  );
}
