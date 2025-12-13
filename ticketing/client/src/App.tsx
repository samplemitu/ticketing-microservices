import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/Layout/ProtectedRoute";

// Auth Pages
import { SignIn } from "@/apps/auth/SignIn";
import { SignUp } from "@/apps/auth/SignUp";

// Tickets Pages
import { TicketsListPage } from "@/apps/tickets/TicketsListPage";
import { TicketDetailPage } from "@/apps/tickets/TicketDetailPage";
import { CreateTicketPage } from "@/apps/tickets/CreateTicketPage";
import { EditTicketPage } from "@/apps/tickets/EditTicketPage";

// Orders Pages
import { OrdersPage } from "@/apps/orders/OrdersPage";

// Payments Pages
import { PaymentPage } from "@/apps/payments/PaymentPage";

// Profile Pages
import { ProfilePage } from "@/apps/profile/ProfilePage";

// Other Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<TicketsListPage />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/tickets/:id" element={<TicketDetailPage />} />

            {/* Protected Routes */}
            <Route
              path="/tickets/new"
              element={
                <ProtectedRoute>
                  <CreateTicketPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tickets/:id/edit"
              element={
                <ProtectedRoute>
                  <EditTicketPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
