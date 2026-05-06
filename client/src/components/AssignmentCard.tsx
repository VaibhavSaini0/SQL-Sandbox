import { Link } from "react-router-dom";
import type { Assignment } from "../data/assignments";
import {
  Database,
  ArrowRight,
  Table2,
  CheckCircle2,
  Clock3,
  Circle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  assignment: Assignment;
  status?: string;
}

const difficultyModifier: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
  hard: "bg-red-500/10 text-red-500 border border-red-500/20",
};

function AssignmentCard({ assignment, status }: Props) {
  const renderStatus = () => {
    if (status === "solved") {
      return {
        icon: <CheckCircle2 size={14} />,
        text: "Solved",
        color: "text-green-500",
        bar: "bg-green-500",
      };
    }

    if (status === "attempted") {
      return {
        icon: <Clock3 size={14} />,
        text: "Attempted",
        color: "text-yellow-500",
        bar: "bg-yellow-500",
      };
    }

    return {
      icon: <Circle size={12} />,
      text: "Unsolved",
      color: "text-[var(--c-text2)]",
      bar: "bg-gray-400",
    };
  };

  const statusUI = renderStatus();

  return (
    <motion.div whileHover={{ y: -7 }} transition={{ duration: 0.22 }}>
      <Link
        to={`/assignment/${assignment._id}`}
        className="group relative block overflow-hidden rounded-3xl border p-6 shadow-lg transition-all duration-300"
        style={{
          background: "var(--c-card)",
          borderColor: "var(--c-border)",
        }}
      >
        {/* soft glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-orange-500/10 blur-3xl rounded-full" />
        </div>

        {/* top status line */}
        <div className={`absolute top-0 left-0 h-[3px] w-full ${statusUI.bar} opacity-70`} />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-[var(--c-primary)] font-semibold text-sm tracking-wide">
            <Sparkles size={14} />
            SQL Challenge
          </div>

          <span
            className={`px-3 py-1 text-[11px] rounded-full capitalize font-medium ${difficultyModifier[assignment.difficulty]}`}
          >
            {assignment.difficulty}
          </span>
        </div>

        {/* Status */}
        <div className={`relative z-10 mb-4 flex items-center gap-1 text-xs font-semibold ${statusUI.color}`}>
          {statusUI.icon}
          {statusUI.text}
        </div>

        {/* Title */}
        <h3
          className="relative z-10 text-xl font-bold mb-3 leading-snug transition"
          style={{ color: "var(--c-text)" }}
        >
          {assignment.title}
        </h3>

        {/* Description */}
        <p
          className="relative z-10 text-sm leading-relaxed min-h-[64px]"
          style={{ color: "var(--c-text2)" }}
        >
          {assignment.description}
        </p>

        {/* Metadata */}
        <div
          className="relative z-10 mt-4 flex items-center gap-4 text-[11px]"
          style={{ color: "var(--c-text2)" }}
        >
          <div className="flex items-center gap-1">
            <Database size={13} />
            PostgreSQL
          </div>

          <div className="flex items-center gap-1">
            <Table2 size={13} />
            {assignment.sampleTables.length} Tables
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-6 flex items-center justify-between">
          <div className="text-[11px]" style={{ color: "var(--c-text2)" }}>
            Challenge ID #{assignment._id.slice(-4)}
          </div>

          <div className="flex items-center gap-1 text-[var(--c-primary)] font-medium text-sm group-hover:translate-x-1 transition">
            Solve Now <ArrowRight size={15} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export { AssignmentCard };