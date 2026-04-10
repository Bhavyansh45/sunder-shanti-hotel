import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  Outlet,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const RoomsPage = lazy(() => import("./pages/RoomsPage"));
const BookingsPage = lazy(() => import("./pages/BookingsPage"));
const NewBookingPage = lazy(() => import("./pages/NewBookingPage"));
const BookingDetailPage = lazy(() => import("./pages/BookingDetailPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CheckoutDetailPage = lazy(() => import("./pages/CheckoutDetailPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );
}

function AppShell() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute();

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => null,
});

const appShellRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: AppShell,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const roomsRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/rooms",
  component: () => (
    <ProtectedRoute requiredRole="Admin">
      <RoomsPage />
    </ProtectedRoute>
  ),
});

const bookingsRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/bookings",
  component: () => (
    <ProtectedRoute>
      <BookingsPage />
    </ProtectedRoute>
  ),
});

const newBookingRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/bookings/new",
  component: () => (
    <ProtectedRoute>
      <NewBookingPage />
    </ProtectedRoute>
  ),
});

const bookingDetailRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/bookings/$id",
  component: () => (
    <ProtectedRoute>
      <BookingDetailPage />
    </ProtectedRoute>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/checkout",
  component: () => (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  ),
});

const checkoutDetailRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/checkout/$bookingId",
  component: () => (
    <ProtectedRoute>
      <CheckoutDetailPage />
    </ProtectedRoute>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/reports",
  component: () => (
    <ProtectedRoute requiredRole="Admin">
      <ReportsPage />
    </ProtectedRoute>
  ),
});

const usersRoute = createRoute({
  getParentRoute: () => appShellRoute,
  path: "/users",
  component: () => (
    <ProtectedRoute requiredRole="Admin">
      <UsersPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  appShellRoute.addChildren([
    dashboardRoute,
    roomsRoute,
    bookingsRoute,
    newBookingRoute,
    bookingDetailRoute,
    checkoutRoute,
    checkoutDetailRoute,
    reportsRoute,
    usersRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
