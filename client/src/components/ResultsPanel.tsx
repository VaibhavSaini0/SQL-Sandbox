import type { resultType } from "../pages/AssignmentAttempt";

interface Props {
  results: resultType | null;
  error: string | null;
  expectedOutput?: {
    type: string;
    value: any[];
  };
}

function ResultsPanel({ results, error, expectedOutput }: Props) {
  const isCorrect = () => {
    if (!results || !expectedOutput) return false;

    try {
      const expected = expectedOutput.value;
      const actual = results.value;

      if (expected.length !== actual.length) return false;

      for (let i = 0; i < expected.length; i++) {
        if (JSON.stringify(expected[i]) !== JSON.stringify(actual[i])) {
          return false;
        }
      }

      return true;
    } catch {
      return false;
    }
  };

  const correct = results?.iscorrect ?? isCorrect();

  // 🔴 ERROR STATE
  if (error) {
    return (
      <div className="p-4 rounded bg-[rgba(220,38,38,0.08)] text-red-600 font-mono text-sm">
        {error}
      </div>
    );
  }

  // ⚪ EMPTY STATE
  if (!results || results.value.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-10 text-sm text-[var(--c-text2)] bg-[var(--c-bg)] border border-[var(--c-border)] rounded">
        Run a query to see results
      </div>
    );
  }

  const columns = Object.keys(results.value[0]);

  return (
    <div
      className={`flex flex-col h-full rounded overflow-hidden border 
      ${correct ? "border-green-500" : "border-[var(--c-border)]"} 
      bg-[var(--c-bg)]`}
    >

      {/* 🔹 HEADER */}
      <div className="flex justify-between items-center px-4 py-2 bg-[var(--c-card)] border-b border-[var(--c-border)]">
        <span className="text-sm font-semibold text-[var(--c-text)]">
          Query Results {correct && "✅"}
        </span>

        <span className="text-xs text-[var(--c-text2)]">
          {results.value.length} rows
        </span>
      </div>

      {/* 🔹 STATUS */}
      {expectedOutput && (
        <div
          className={`mx-3 mt-3 px-3 py-2 rounded text-sm font-medium 
          ${
            correct
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {correct ? "Correct Output 🎉" : "Output does not match ❌"}
        </div>
      )}

      {/* 🔹 TABLE */}
      <div className="flex-1 overflow-auto mt-2">

        <table className="w-full min-w-[500px] text-sm border-collapse">

          {/* HEAD */}
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="sticky top-0 z-10 text-left px-4 py-2 
                    text-xs font-mono font-semibold 
                    text-[var(--c-text2)] 
                    bg-[var(--c-card)] 
                    border-b-2 border-[var(--c-border)]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {results.value.map((row, i) => (
              <tr
                key={i}
                className="even:bg-[rgba(0,0,0,0.02)] hover:bg-[rgba(242,140,40,0.06)] transition"
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-4 py-2 font-mono text-sm text-[var(--c-text)] border-b border-[var(--c-border)]"
                  >
                    {String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export { ResultsPanel };