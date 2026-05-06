import { useState } from "react";

/*
  Reveals static hints one at a time when button is clicked.
*/

const defaultHints = [
  "Start with the SELECT keyword to pick which columns you need.",
  "Use WHERE to filter rows based on a condition.",
  "GROUP BY groups rows sharing a value so you can apply aggregate functions.",
  "JOIN connects two tables using a shared key column.",
  "Wrap a query inside parentheses to use it as a subquery.",
];

function HintPanel() {
  const [revealedCount, setRevealedCount] = useState(0);

  function showNextHint() {
    setRevealedCount((prev) => Math.min(prev + 1, defaultHints.length));
  }

  const allRevealed = revealedCount >= defaultHints.length;

  return (
    <div className="space-y-3">

      {/* 🔹 Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--c-text)]">
          💡 Hints
        </span>

        {!allRevealed && (
          <button
            onClick={showNextHint}
            className="px-3 py-1 text-xs font-medium 
              text-[var(--c-primary)] 
              border border-[var(--c-primary)] 
              rounded-[var(--rad)] 
              hover:bg-[rgba(242,140,40,0.1)] 
              transition"
          >
            Show Hint ({revealedCount}/{defaultHints.length})
          </button>
        )}
      </div>

      {/* 🔹 Empty State */}
      {revealedCount === 0 && (
        <p className="text-sm italic text-[var(--c-text2)]">
          Click the button above to reveal a hint.
        </p>
      )}

      {/* 🔹 Hints List */}
      <ul className="flex flex-col gap-2">
        {defaultHints.slice(0, revealedCount).map((hint, idx) => (
          <li
            key={idx}
            className="text-sm text-[var(--c-text)] leading-relaxed 
              px-3 py-2 
              bg-[rgba(242,140,40,0.05)] 
              border-l-[3px] border-[var(--c-primary)] 
              rounded-r-[var(--rad)]"
          >
            <span className="font-bold text-[var(--c-primary)] mr-1">
              {idx + 1}.
            </span>
            {hint}
          </li>
        ))}
      </ul>

    </div>
  );
}

export { HintPanel };