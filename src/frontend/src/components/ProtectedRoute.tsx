import { Button } from "@/components/ui/button";
import { Navigate } from "@tanstack/react-router";
import { Loader2, ShieldX } from "lucide-react";
import { useAuth, useIsAdmin } from "../lib/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "Admin";
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, loginStatus } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();

  if (loginStatus === "logging-in" || loginStatus === "initializing") {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-sm">Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === "Admin" && roleLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="animate-spin" size={32} />
          <p className="text-sm">Checking permissions…</p>
        </div>
      </div>
    );
  }

  if (requiredRole === "Admin" && !isAdmin) {
    return (
      <div
        className="flex items-center justify-center h-full min-h-[60vh]"
        data-ocid="access-denied"
      >
        <div className="text-center space-y-4 max-w-sm px-4">
          <ShieldX className="mx-auto text-destructive" size={48} />
          <h2 className="text-xl font-display font-semibold text-foreground">
            Access Denied
          </h2>
          <p className="text-sm text-muted-foreground">
            You need Administrator privileges to access this page. Please
            contact your hotel administrator.
          </p>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="mt-2"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
