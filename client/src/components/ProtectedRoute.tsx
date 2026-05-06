import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--c-text2)]">
        Checking authentication...
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export { ProtectedRoute };