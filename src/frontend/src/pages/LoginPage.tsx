import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { LogoLight } from "../components/Logo";
import { useAuth } from "../lib/hooks";

export default function LoginPage() {
  const { isAuthenticated, login, loginStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="login-page"
    >
      {/* Decorative warm gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.14 70 / 0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, oklch(0.52 0.12 160 / 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-sm text-center space-y-8"
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <LogoLight size="xl" variant="full" className="justify-center" />
          </div>

          {/* Divider with ornament */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-accent text-lg" aria-hidden="true">
              ✦
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Login card */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-elevated space-y-6">
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">
                Staff Portal
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to access the hotel management system
              </p>
            </div>

            <Button
              onClick={() => login()}
              disabled={isLoggingIn}
              size="lg"
              className="w-full font-semibold text-base gap-2"
              data-ocid="login-button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in…
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  </svg>
                  Sign in with Internet Identity
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Internet Identity provides secure, privacy-preserving
              authentication. Only authorized hotel staff can access this
              system.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
