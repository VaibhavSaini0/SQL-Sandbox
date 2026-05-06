import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AssignmentAttempt from "./pages/AssignmentAttempt";
import NotFound from "./pages/NotFound";
import { Header } from "./components/Header";
import SqlSandboxLandingPage from "./pages/landingpage";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<SqlSandboxLandingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignment/:id"
            element={
              <ProtectedRoute>
                <AssignmentAttempt />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
