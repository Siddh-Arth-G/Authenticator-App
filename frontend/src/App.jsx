import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FloatingShape from "./components/floatingShape";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashBoardPage from "./pages/DashBoardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/AuthStore";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) {
    return <LoadingSpinner />
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-zinc-800
      flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-700"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-400"
        size="w-48 h-68"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-white"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoardPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgotPasswordPage />
        </RedirectAuthenticatedUser>} />

        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
          <ResetPasswordPage />
        </RedirectAuthenticatedUser>}/>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
