import { motion } from "framer-motion";
interface Props {
  assignments: any[];
  statusMap: Record<string, string>;
}

function StatsOverview({ assignments, statusMap }: Props) {
  const solvedAssignments = assignments.filter(
    (item) => statusMap[item._id] === "solved"
  );

  const easyTotal = assignments.filter((a) => a.difficulty === "easy").length;
  const mediumTotal = assignments.filter((a) => a.difficulty === "medium").length;
  const hardTotal = assignments.filter((a) => a.difficulty === "hard").length;

  const easySolved = assignments.filter(
    (a) => a.difficulty === "easy" && statusMap[a._id] === "solved"
  ).length;

  const mediumSolved = assignments.filter(
    (a) => a.difficulty === "medium" && statusMap[a._id] === "solved"
  ).length;

  const hardSolved = assignments.filter(
    (a) => a.difficulty === "hard" && statusMap[a._id] === "solved"
  ).length;

  const totalSolved = solvedAssignments.length;

  const getPercent = (solved: number, total: number) =>
    total === 0 ? 0 : Math.round((solved / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-2xl"
    >
      <div className="text-sm font-medium text-[var(--c-text2)] mb-4">
        Solved Problems
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Circle */}
        <div className="w-28 h-28 rounded-full border-4 border-orange-400 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(255,140,0,0.15)]">
          <span className="text-3xl font-bold">{totalSolved}</span>
          <span className="text-xs text-[var(--c-text2)]">Solved</span>
        </div>

        {/* Difficulty Bars */}
        <div className="flex-1 w-full space-y-4">
          {[
            {
              label: "Easy",
              solved: easySolved,
              total: easyTotal,
              color: "bg-emerald-400",
            },
            {
              label: "Medium",
              solved: mediumSolved,
              total: mediumTotal,
              color: "bg-yellow-400",
            },
            {
              label: "Hard",
              solved: hardSolved,
              total: hardTotal,
              color: "bg-red-400",
            },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-xs mb-1">
                <span>{row.label}</span>
                <span>
                  {row.solved} / {row.total} &nbsp; Success {getPercent(row.solved, row.total)}%
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getPercent(row.solved, row.total)}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${row.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export { StatsOverview };