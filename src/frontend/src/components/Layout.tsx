import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  BedDouble,
  CalendarCheck,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth, useIsAdmin, useUserRole } from "../lib/hooks";
import { Logo } from "./Logo";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
  dataOcid?: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboard size={18} />,
    dataOcid: "nav-dashboard",
  },
  {
    label: "Rooms",
    to: "/rooms",
    icon: <BedDouble size={18} />,
    adminOnly: true,
    dataOcid: "nav-rooms",
  },
  {
    label: "Bookings",
    to: "/bookings",
    icon: <CalendarCheck size={18} />,
    dataOcid: "nav-bookings",
  },
  {
    label: "Checkout",
    to: "/checkout",
    icon: <CreditCard size={18} />,
    dataOcid: "nav-checkout",
  },
  {
    label: "Reports",
    to: "/reports",
    icon: <BarChart3 size={18} />,
    adminOnly: true,
    dataOcid: "nav-reports",
  },
  {
    label: "Users",
    to: "/users",
    icon: <Users size={18} />,
    adminOnly: true,
    dataOcid: "nav-users",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { logout, principal } = useAuth();
  const { data: isAdmin } = useIsAdmin();
  const { data: userRole } = useUserRole();

  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);
  const shortPrincipal = principal
    ? `${principal.toText().slice(0, 5)}...${principal.toText().slice(-4)}`
    : "—";

  function handleLogout() {
    logout();
    toast.success("Signed out successfully");
  }

  const isActive = (to: string) =>
    currentPath === to || (to !== "/dashboard" && currentPath.startsWith(to));

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <Logo size="md" variant="full" />
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-3 py-4 space-y-1 overflow-y-auto"
        aria-label="Main navigation"
      >
        {visibleItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={item.dataOcid}
            onClick={() => setSidebarOpen(false)}
            className={[
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
              isActive(item.to)
                ? "bg-primary text-primary-foreground shadow-subtle"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            ].join(" ")}
          >
            <span className="shrink-0">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* User info + logout */}
      <div className="px-3 py-4 space-y-2">
        <div className="px-3 py-2 rounded-lg bg-sidebar-accent">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-sidebar-accent-foreground truncate">
                {shortPrincipal}
              </p>
            </div>
            {userRole && (
              <Badge
                variant="secondary"
                className="shrink-0 text-xs bg-sidebar-primary/20 text-sidebar-primary border-0"
              >
                {userRole}
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          data-ocid="nav-logout"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-sidebar border-r border-sidebar-border shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-64 bg-sidebar flex flex-col h-full shadow-elevated">
            <button
              type="button"
              className="absolute top-4 right-4 text-sidebar-foreground hover:text-sidebar-accent-foreground p-1"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-subtle shrink-0">
          <Logo
            size="sm"
            variant="full"
            className="[&_span]:text-foreground [&_.text-accent]:text-accent"
          />
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            data-ocid="nav-mobile-menu"
            className="p-2 rounded-lg text-foreground hover:bg-muted transition-smooth"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
