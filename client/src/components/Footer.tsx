import { Database, Code2, ExternalLink } from "lucide-react";

function Footer() {
  return (
    <footer
      className="mt-16 border-t backdrop-blur-xl"
      style={{
        borderColor: "var(--c-border)",
        background: "var(--c-card)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-[var(--c-primary)] font-bold text-lg">
              <Database size={20} />
              SQL Sandbox
            </div>

            <p
              className="mt-3 text-sm leading-relaxed max-w-[260px]"
              style={{ color: "var(--c-text2)" }}
            >
              Practice SQL through interactive real-world database challenges,
              instant judging, and intelligent submission tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--c-text)" }}
            >
              Quick Links
            </h4>

            <div
              className="flex flex-col gap-2 text-sm"
              style={{ color: "var(--c-text2)" }}
            >
              <a href="#" className="hover:text-[var(--c-primary)] transition">
                Browse Challenges
              </a>

              <a href="#" className="hover:text-[var(--c-primary)] transition">
                Your Progress
              </a>

              <a
                href="https://www.postgresql.org/docs/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--c-primary)] transition flex items-center gap-1"
              >
                PostgreSQL Docs <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Stack */}
          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--c-text)" }}
            >
              Built With
            </h4>

            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"].map(
                (item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs border"
                    style={{
                      color: "var(--c-text2)",
                      borderColor: "var(--c-border)",
                      background: "rgba(128,128,128,0.05)",
                    }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div
              className="mt-4 flex items-center gap-3"
              style={{ color: "var(--c-text2)" }}
            >
              <Code2
                size={17}
                className="hover:text-[var(--c-primary)] cursor-pointer transition"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-8 pt-5 border-t text-xs flex flex-col md:flex-row justify-between gap-2"
          style={{
            color: "var(--c-text2)",
            borderColor: "var(--c-border)",
          }}
        >
          <span>© 2026 SQL Sandbox. Built for mastering SQL.</span>
          <span>Interactive Judge • Smart Drafts • Submission Tracking</span>
        </div>
      </div>
    </footer>
  );
}

export { Footer };