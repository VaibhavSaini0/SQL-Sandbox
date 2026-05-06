import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/clerk-react";

interface HeaderProps {
  assignmentCount?: number;
}

function Header({ assignmentCount }: HeaderProps) {
  const location = useLocation();
  const isAttemptPage = location.pathname.includes("/assignment");

  return (
<header className="border-b border-[var(--c-border)] bg-[var(--c-bg)] px-5 py-3">
  <div className="flex items-center justify-between">

    <div className="flex items-center gap-2">

      {isAttemptPage && (
        <Link
          to="/"
          className="text-sm text-[var(--c-text2)] hover:text-[var(--c-primary)] transition"
        >
          ← Back
        </Link>
      )}

      <span className="text-lg">⚡</span>

      <h1 className="text-lg font-semibold">
        <span className="text-indigo-500">SQL </span>
        Sandbox
      </h1>
    </div>

    <div className="flex items-center gap-4">

      {assignmentCount !== undefined && (
        <span className="text-sm text-[var(--c-text2)]">
          📋 {assignmentCount} Assignments
        </span>
      )}

      <ThemeToggle />

      <SignedOut>
        <div className="flex gap-2">
          <SignInButton mode="modal">
            <button className="px-3 py-1.5 text-sm rounded bg-[var(--c-primary)] text-white hover:bg-[var(--c-primary-hover)] transition">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-3 py-1.5 text-sm rounded border border-[var(--c-border)] hover:bg-[var(--c-card)] transition">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>

    </div>
  </div>
</header>
  );
}

export { Header };