import { useState, useEffect } from "react";
import { AssignmentCard } from "../components/AssignmentCard";
import type { Assignment } from "../data/assignments";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { StatsOverview } from "../components/StatsOverview";
import { Footer } from "../components/Footer";

const API_BASE = "http://localhost:3001/api";

function Index() {
  const { user } = useUser();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/assignments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch assignments");
        return res.json();
      })
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not connect to the server.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch(`${API_BASE}/tracker/status/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {};

        data.forEach((item: any) => {
          map[item.assignmentId] = item.status;
        });

        setStatusMap(map);
      })
      .catch(() => {});
  }, [user]);

  return (
    <div className="min-h-screen bg-[var(--c-bg)] text-[var(--c-text)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px]" />

      {/* HERO */}
      <section className="border-b border-[var(--c-border)] relative">
        <div className="max-w-[1200px] mx-auto px-5 py-10 md:px-8 md:py-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-[var(--c-primary)]"
          >
            ✨ Interactive SQL Practice
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            Master SQL with <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
              hands-on challenges
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-[var(--c-text2)] max-w-[560px] leading-relaxed"
          >
            Practice writing SQL queries against real schemas. Get hints,
            run queries, and level up your database skills.
          </motion.p>

          {!loading && !error && (
            <StatsOverview assignments={assignments} statusMap={statusMap} />
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1200px] mx-auto px-5 py-6 md:px-8 md:py-8">
        {loading && (
          <p className="text-center py-10 text-[var(--c-text2)]">
            Loading assignments...
          </p>
        )}

        {error && (
          <p className="text-center py-10 text-red-500 bg-red-50 border border-red-200 rounded">
            {error}
          </p>
        )}

        {!loading && !error && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          >
            {assignments.map((item) => (
              <motion.div
                key={item._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <AssignmentCard
                  assignment={item}
                  status={statusMap[item._id]}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
      <Footer/>
    </div>
  );
}

export default Index;