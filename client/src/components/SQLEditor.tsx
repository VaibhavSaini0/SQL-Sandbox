interface Props {
  value: string;
  onChange: (val: string) => void;
  onExecute: () => void;
  onSubmit: () => void;
  isRunningQuery?: boolean;
  isSubmittingQuery?: boolean;
}

function SQLEditor({
  value,
  onChange,
  onExecute,
  onSubmit,
  isRunningQuery = false,
  isSubmittingQuery = false,
}: Props) {
  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      onExecute();
    }
  }

  return (
    <div className="flex flex-col h-full bg-[var(--c-editor)] border border-[var(--c-border)] rounded-[var(--rad)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2 border-b border-[var(--c-border)] bg-[var(--c-card)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[var(--c-primary)]"></span>
          <span className="text-xs sm:text-sm font-medium text-[var(--c-text)]">
            SQL Editor
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExecute}
            disabled={!value.trim() || isRunningQuery || isSubmittingQuery}
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded bg-[var(--c-primary)] text-white hover:bg-[var(--c-primary-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {isRunningQuery ? "Running..." : "▶ Run"}
          </button>

          <button
            onClick={onSubmit}
            disabled={!value.trim() || isRunningQuery || isSubmittingQuery}
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded border border-[var(--c-border)] hover:bg-[var(--c-card)] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {isSubmittingQuery ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      <textarea
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={`Write your SQL query here...

Example:
SELECT * FROM employees;`}
        spellCheck={false}
        className="flex-1 w-full p-3 sm:p-4 text-xs sm:text-sm font-mono leading-relaxed text-[var(--c-text)] bg-[var(--c-editor)] outline-none resize-none"
      />

      <div className="px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs text-[var(--c-text2)] border-t border-[var(--c-border)] bg-[var(--c-card)]">
        Press <kbd className="px-1.5 py-[1px] bg-[var(--c-border)] rounded">Ctrl</kbd> +{" "}
        <kbd className="px-1.5 py-[1px] bg-[var(--c-border)] rounded">Enter</kbd> to run
      </div>
    </div>
  );
}

export { SQLEditor };