import { Link } from "react-router-dom";

/*
  404 page for unmatched routes.
*/

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-5 bg-[var(--c-bg)] text-[var(--c-text)]">

      <h1 className="text-6xl sm:text-7xl font-extrabold text-[var(--c-primary)] leading-none">
        404
      </h1>

      <p className="text-lg text-[var(--c-text2)]">
        Page not found
      </p>

      <Link
        to="/"
        className="text-sm text-[var(--c-primary)] hover:underline transition"
      >
        ← Go back home
      </Link>

    </div>
  );
}

export default NotFound;