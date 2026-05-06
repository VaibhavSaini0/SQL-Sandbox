import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SQLEditor } from "../components/SQLEditor";
import { ResultsPanel } from "../components/ResultsPanel";
import { SchemaViewer } from "../components/SchemaViewer";
import { HintPanel } from "../components/HintPanel";
import type { Assignment } from "../data/assignments";
import { useUser } from "@clerk/clerk-react";
import { SubmissionsPanel } from "../components/SubmissionsPanel";

const API_BASE = import.meta.env.VITE_API_BASE_URL;;

export type resultType = {
  value: any[];
  iscorrect: boolean;
};

export default function AssignmentAttempt() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("SELECT ");
  const [results, setResults] = useState<resultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isRunningQuery, setIsRunningQuery] = useState(false);
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<
    "results" | "submissions"
  >("results");
  const [draftLoaded, setDraftLoaded] = useState(false);

  // =========================
  // Load Previous Submissions
  // =========================
  useEffect(() => {
    if (!user || !id) return;

    fetch(`${API_BASE}/tracker/submission/${user.id}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data || []);
      })
      .catch(() => {});
  }, [user, id]);

  // =========================
  // Restore Previous Draft
  // =========================
  useEffect(() => {
    if (!user || !id) {
      setDraftLoaded(true);
      return;
    }

    fetch(`${API_BASE}/tracker/draft/${user.id}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.draftQuery) {
          setQuery(data.draftQuery);
        }
        setDraftLoaded(true);
      })
      .catch(() => {
        setDraftLoaded(true);
      });
  }, [user, id]);

  // =========================
  // Fetch Assignment
  // =========================
  useEffect(() => {
    setResults(null);
    setError(null);

    fetch(`${API_BASE}/assignments/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Assignment not found");
        return res.json();
      })
      .then((data) => {
        setAssignment(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  // =========================
  // Autosave Draft
  // =========================
  useEffect(() => {
    if (!draftLoaded || !user || !assignment) return;

    const timer = setTimeout(async () => {
      try {
        await fetch(`${API_BASE}/tracker/draft`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            assignmentId: assignment._id,
            draftQuery: query,
          }),
        });
      } catch (err) {}
    }, 1200);

    return () => clearTimeout(timer);
  }, [query, user, assignment, draftLoaded]);

  // =========================
  // RUN QUERY ONLY
  // =========================
  async function handleRunQuery() {
    setActiveBottomTab("results")
    if (!assignment || !query.trim()) return;

    setError(null);
    setIsRunningQuery(true);

    try {
      const res = await fetch(`${API_BASE}/execute-query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          assignmentId: assignment._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Query failed");
      }

      setResults({
        value: data.rows,
        iscorrect: data.iscorrect,
      });
    } catch (err: any) {
      setError(err.message);
      setResults(null);
    } finally {
      setIsRunningQuery(false);
    }
  }

  // =========================
  // SUBMIT QUERY + SAVE
  // =========================
  async function handleSubmit() {
    if (!assignment || !query.trim()) return;

    setError(null);
    setIsSubmittingQuery(true);

    try {
      setActiveBottomTab("results");
      const res = await fetch(`${API_BASE}/execute-query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          assignmentId: assignment._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (user) {
          await fetch(`${API_BASE}/tracker/submission`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkUserId: user.id,
              assignmentId: assignment._id,
              query,
              status: "runtime_error",
              errorMessage: data.error || "Query failed",
              output: [],
              mode: "submit",
            }),
          });

          const latest = await fetch(
            `${API_BASE}/tracker/submission/${user.id}/${assignment._id}`,
          );
          const latestData = await latest.json();
          setSubmissions(latestData || []);
          setActiveBottomTab("submissions");
        }

        throw new Error(data.error || "Query failed");
      }

      const submissionStatus = data.iscorrect ? "solved" : "wrong_answer";

      if (user) {
        await fetch(`${API_BASE}/tracker/submission`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            assignmentId: assignment._id,
            query,
            status: submissionStatus,
            errorMessage: "",
            output: data.rows,
            mode: "submit",
          }),
        });

        if (data.iscorrect) {
          await fetch(`${API_BASE}/tracker/draft`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkUserId: user.id,
              assignmentId: assignment._id,
              draftQuery: "",
            }),
          });
        }

        const latest = await fetch(
          `${API_BASE}/tracker/submission/${user.id}/${assignment._id}`,
        );
        const latestData = await latest.json();
        setSubmissions(latestData || []);
      }

      setResults({
        value: data.rows,
        iscorrect: data.iscorrect,
      });
    } catch (err: any) {
      setError(err.message);
      setResults(null);
    } finally {
      setIsSubmittingQuery(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--c-text2)]">
        Loading assignment...
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-semibold">Assignment not found</h2>
        <Link to="/" className="text-[var(--c-primary)] hover:underline">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--c-bg)] text-[var(--c-text)] overflow-hidden">
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        <aside className="flex flex-col border-b md:border-b-0 md:border-r border-[var(--c-border)] max-h-[40vh] md:max-h-none md:w-[340px] lg:w-[380px] overflow-y-auto">
          <div className="p-4 border-b border-[var(--c-border)] space-y-2">
            <h3 className="text-sm font-semibold">📝 Question</h3>
            <p className="text-sm text-[var(--c-text2)] leading-relaxed">
              {assignment.question}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <SchemaViewer tables={assignment.sampleTables} />
          </div>

          <div className="p-4 border-t border-[var(--c-border)]">
            <HintPanel />
          </div>
        </aside>

        <main className="flex flex-col flex-1 min-h-0">
          <div className="h-[200px] sm:h-[240px] md:h-[45%] min-h-[150px] border-b border-[var(--c-border)]">
            <SQLEditor
              value={query}
              onChange={setQuery}
              onExecute={handleRunQuery}
              onSubmit={handleSubmit}
              isRunningQuery={isRunningQuery}
              isSubmittingQuery={isSubmittingQuery}
            />
          </div>

          <div className="flex-1 overflow-auto p-2 flex flex-col">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-2 border-b border-[var(--c-border)]">
              <button
                onClick={() => setActiveBottomTab("results")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition
      ${
        activeBottomTab === "results"
          ? "border-[var(--c-primary)] text-[var(--c-primary)]"
          : "border-transparent text-[var(--c-text2)]"
      }`}
              >
                Query Result
              </button>

              <button
                onClick={() => setActiveBottomTab("submissions")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition
      ${
        activeBottomTab === "submissions"
          ? "border-[var(--c-primary)] text-[var(--c-primary)]"
          : "border-transparent text-[var(--c-text2)]"
      }`}
              >
                Submission History ({submissions.length})
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto">
              {activeBottomTab === "results" ? (
                <ResultsPanel
                  results={results}
                  expectedOutput={assignment.expectedOutput}
                  error={error}
                />
              ) : (
                <SubmissionsPanel submissions={submissions} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
