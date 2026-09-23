"use client";

import { useEffect, useState } from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { notifications as initialNotifications } from "@/data/misc";
import { CommandPalette } from "./CommandPalette";
import { cn } from "@/lib/utils";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur sm:px-6">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={() => setPaletteOpen(true)}
          className="flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-ink-400 hover:border-slate-300 sm:max-w-sm"
        >
          <Search size={15} />
          <span className="flex-1 text-left">Search…</span>
          <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-ink-400">
            ⌘K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="relative hidden sm:block">
            <button
              onClick={() => setOrgOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-ink-900 hover:bg-slate-50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-indigo text-[10px] font-semibold text-white">
                S
              </span>
              Spendly Labs
              <ChevronDown size={14} className="text-ink-400" />
            </button>
            {orgOpen ? (
              <div className="absolute right-0 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-card">
                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-ink-900 hover:bg-slate-50">
                  Spendly Labs
                </button>
                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-ink-400 hover:bg-slate-50">
                  + Add organization
                </button>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative rounded-lg p-2 text-ink-600 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unread > 0 ? (
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-danger" />
              ) : null}
            </button>
            {notifOpen ? (
              <div className="absolute right-0 mt-1 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-ink-900">Notifications</p>
                  <button
                    onClick={() => setNotifications((n) => n.map((x) => ({ ...x, read: true })))}
                    className="text-xs font-medium text-brand-indigo hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto scroll-thin">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "flex items-start gap-2 border-b border-slate-50 px-4 py-3 last:border-0",
                        !n.read && "bg-indigo-50/40"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                          n.read ? "bg-transparent" : "bg-brand-indigo"
                        )}
                      />
                      <div>
                        <p className="text-sm text-ink-900">{n.title}</p>
                        <p className="mt-0.5 text-xs text-ink-400">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-2 sm:pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo text-xs font-semibold text-white">
              AN
            </div>
            <span className="hidden text-sm font-medium text-ink-900 sm:block">Ashmita Nath</span>
          </div>
        </div>
      </header>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
