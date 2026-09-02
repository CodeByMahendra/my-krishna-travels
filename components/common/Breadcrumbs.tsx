import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-slate-100/70 rounded-lg mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-600">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-brand-blue transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-blue transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-brand-dark">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
