import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Submission = {
  _id: string;
  query: string;
  status: "solved" | "wrong_answer" | "runtime_error";
  errorMessage: string;
  mode: "run" | "submit";
  createdAt: string;
};

interface Props {
  submissions: Submission[];
}

function SubmissionsPanel({ submissions }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!submissions.length) {
    return (
      <div className="border border-[var(--c-border)] rounded-xl p-5 text-sm text-[var(--c-text2)] bg-[var(--c-card)]">
        No previous submissions yet.
      </div>
    );
  }

  const getStatusUI = (status: Submission["status"]) => {
    if (status === "solved") {
      return {
        icon: <CheckCircle2 size={15} />,
        text: "Accepted",
        className: "text-green-400 bg-green-500/10",
      };
    }

    if (status === "wrong_answer") {
      return {
        icon: <AlertTriangle size={15} />,
        text: "Wrong Answer",
        className: "text-yellow-400 bg-yellow-500/10",
      };
    }

    return {
      icon: <XCircle size={15} />,
      text: "Runtime Error",
      className: "text-red-400 bg-red-500/10",
    };
  };

  return (
    <div className="border border-[var(--c-border)] rounded-xl overflow-hidden bg-[var(--c-card)]">
      <div className="px-4 py-3 border-b border-[var(--c-border)] font-semibold text-sm">
        Submission History
      </div>

      <div className="max-h-[420px] overflow-auto">
        {submissions.map((item) => {
          const statusUI = getStatusUI(item.status);
          const isOpen = openId === item._id;

          return (
            <div
              key={item._id}
              className="border-b border-[var(--c-border)] last:border-b-0"
            >
              {/* Row Header */}
              <button
                onClick={() => setOpenId(isOpen ? null : item._id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-[rgba(255,255,255,0.02)] transition text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${statusUI.className}`}>
                    {statusUI.icon}
                    {statusUI.text}
                  </span>

                  <span className="text-[10px] uppercase tracking-wide text-[var(--c-text2)]">
                    {item.mode}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[var(--c-text2)]">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>

                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
              </button>

              {/* Expandable Body */}
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 bg-[rgba(255,255,255,0.015)]">
                  <div>
                    <div className="text-[11px] uppercase mb-1 text-[var(--c-text2)]">
                      SQL Query
                    </div>

                    <pre className="text-xs font-mono bg-[var(--c-bg)] p-3 rounded overflow-x-auto text-[var(--c-text)] whitespace-pre-wrap border border-[var(--c-border)]">
                      {item.query}
                    </pre>
                  </div>

                  {item.errorMessage && (
                    <div>
                      <div className="text-[11px] uppercase mb-1 text-red-400">
                        Error Message
                      </div>

                      <div className="text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded p-3">
                        {item.errorMessage}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { SubmissionsPanel };