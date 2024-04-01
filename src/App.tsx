import "./App.css";
import LoginPage from "./components/firebase-vite-ui/Auth/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/firebase-vite-ui/Auth/RequireAuth";
import DashboardPage from "./Dashboard/DashboardPage";
import { AuthContextProvider } from "./components/firebase-vite-ui/Auth/AuthContext";
import AppSkeleton from "./components/skeleton/AppSkeleton";
import { TooltipProvider } from "./components/ui/tooltip";
import BudgetPage from "./components/Budget/BudgetPage";
import { BudgetContextProvider } from "./components/Budget/BudgetContext";

function App() {
  return (
    <div className="min-w-screen min-h-screen">
      <AuthContextProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<RequireAuth />}>
                <Route element={<AppSkeleton />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route
                    path="/budget"
                    element={
                      <BudgetContextProvider>
                        <BudgetPage />
                      </BudgetContextProvider>
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
