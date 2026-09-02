import React from "react";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-brand-gray-50 min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl text-center max-w-md space-y-6">
        <div className="w-20 h-20 bg-brand-blue-light text-brand-blue rounded-full flex items-center justify-center mx-auto">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-brand-dark">Destination Not Found</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Oops! The page or travel package you are looking for doesn&apos;t seem to exist or may have been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-deep text-white font-bold px-6 py-3 rounded-xl shadow transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
