import { motion } from "framer-motion";
import {
  Database,
  PlayCircle,
  Trophy,
  Code2,
  ChevronRight,
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

export default function SqlSandboxLandingPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  function handleStart() {
    if (isSignedIn) {
      navigate("/Dashboard");
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--c-bg)", color: "var(--c-text)" }}
    >
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden border-b"
        style={{ borderColor: "var(--c-border)" }}
      >
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-orange-400/10 blur-[120px] rounded-full" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28 relative z-10 grid md:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: "rgba(242,140,40,0.08)",
                color: "var(--c-primary)",
              }}
            >
              <Database size={15} /> Interactive SQL Learning Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Practice SQL Like a <br />
              <span className="text-[var(--c-primary)]">
                Real Coding Interview
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-base md:text-lg max-w-[560px] leading-relaxed"
              style={{ color: "var(--c-text2)" }}
            >
              Solve structured SQL assignments on live schemas, run instant
              PostgreSQL queries, track every submission, restore unfinished
              drafts, and improve through guided database challenges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {isSignedIn ? (
                <button
                  onClick={handleStart}
                  className="px-6 py-3 rounded-xl text-white font-semibold bg-[var(--c-primary)] hover:opacity-90 transition flex items-center gap-2"
                >
                  Start Solving <ChevronRight size={17} />
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="px-6 py-3 rounded-xl text-white font-semibold bg-[var(--c-primary)] hover:opacity-90 transition flex items-center gap-2">
                    Start Solving <ChevronRight size={17} />
                  </button>
                </SignInButton>
              )}

              <button
                className="px-6 py-3 rounded-xl border font-semibold transition flex items-center gap-2"
                style={{
                  borderColor: "var(--c-border)",
                  color: "var(--c-text)",
                }}
              >
                <PlayCircle size={17} /> Watch Demo
              </button>
            </motion.div>

            <div
              className="mt-10 flex flex-wrap gap-6 text-sm"
              style={{ color: "var(--c-text2)" }}
            >
              <div>✔ Real PostgreSQL Execution</div>
              <div>✔ Submission History</div>
              <div>✔ Auto Draft Restore</div>
            </div>
          </div>

          {/* RIGHT MOCK DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border p-5 shadow-2xl"
            style={{
              background: "var(--c-card)",
              borderColor: "var(--c-border)",
            }}
          >
            <div
              className="rounded-2xl p-4 border"
              style={{
                borderColor: "var(--c-border)",
                background: "rgba(128,128,128,0.03)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">SQL Editor</span>
                <span className="text-xs text-[var(--c-primary)]">
                  Live Judge
                </span>
              </div>

              <pre
                className="text-sm font-mono leading-7 whitespace-pre-wrap"
                style={{ color: "var(--c-text2)" }}
              >
{`SELECT name, salary
FROM employees
WHERE department = 'Engineering';`}
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div
                className="rounded-2xl p-4"
                style={{ background: "rgba(34,197,94,0.08)" }}
              >
                <div className="text-green-500 font-bold text-2xl">32</div>
                <div className="text-sm" style={{ color: "var(--c-text2)" }}>
                  Problems Solved
                </div>
              </div>

              <div
                className="rounded-2xl p-4"
                style={{ background: "rgba(242,140,40,0.08)" }}
              >
                <div className="text-[var(--c-primary)] font-bold text-2xl">
                  94%
                </div>
                <div className="text-sm" style={{ color: "var(--c-text2)" }}>
                  Accuracy Rate
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">Why SQL Sandbox?</h2>
          <p className="mt-3" style={{ color: "var(--c-text2)" }}>
            Designed like a coding judge, built for database mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Code2 size={20} />,
              title: "Instant Query Execution",
              desc: "Run SQL against temporary PostgreSQL schemas and get immediate results.",
            },
            {
              icon: <Trophy size={20} />,
              title: "Official Submission Tracking",
              desc: "Every submitted query is stored with verdicts like accepted, wrong answer, or runtime error.",
            },
            {
              icon: <BrainCircuit size={20} />,
              title: "Smart Draft Restore",
              desc: "Leave anytime and continue exactly where you stopped with autosaved SQL drafts.",
            },
          ].map((item) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={item.title}
              className="rounded-3xl border p-6"
              style={{
                background: "var(--c-card)",
                borderColor: "var(--c-border)",
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-[var(--c-primary)] mb-4"
                style={{ background: "rgba(242,140,40,0.08)" }}
              >
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--c-text2)" }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-24">
        <div
          className="max-w-[1000px] mx-auto rounded-3xl border p-10 text-center"
          style={{
            background: "var(--c-card)",
            borderColor: "var(--c-border)",
          }}
        >
          <CheckCircle2
            className="mx-auto text-[var(--c-primary)] mb-4"
            size={34}
          />

          <h2 className="text-3xl font-bold">
            Ready to Become SQL Interview Ready?
          </h2>

          <p
            className="mt-4 max-w-[620px] mx-auto"
            style={{ color: "var(--c-text2)" }}
          >
            Start solving curated SQL challenges, analyze your mistakes, and
            build confidence with real execution-based learning.
          </p>

          {isSignedIn ? (
            <button
              onClick={handleStart}
              className="mt-8 px-7 py-3 rounded-xl bg-[var(--c-primary)] text-white font-semibold hover:opacity-90 transition"
            >
              Explore Challenges
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-8 px-7 py-3 rounded-xl bg-[var(--c-primary)] text-white font-semibold hover:opacity-90 transition">
                Explore Challenges
              </button>
            </SignInButton>
          )}
        </div>
      </section>
      <Footer/>
    </div>
  );
}