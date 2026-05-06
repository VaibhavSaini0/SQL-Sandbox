import type { TableSchema } from "../data/assignments";

/*
  Shows table schemas with column names, types, and sample data.
*/

interface Props {
  tables: TableSchema[];
}

function SchemaViewer({ tables }: Props) {
  return (
    <div className="p-4">

      {/* 🔹 Heading */}
      <div className="text-sm font-semibold text-[var(--c-text)] mb-3">
        🗄️ Schema
      </div>

      {tables.map((table) => (
        <div
          key={table.tableName}
          className="mb-5 bg-[var(--c-card)] border border-[var(--c-border)] rounded-[var(--rad)] overflow-hidden"
        >

          {/* 🔹 Table Name */}
          <h4
            className="px-4 py-2 font-mono text-sm font-semibold 
            text-[var(--c-primary)] 
            bg-[rgba(242,140,40,0.06)] 
            border-b border-[var(--c-border)]"
          >
            {table.tableName}
          </h4>

          {/* 🔹 Columns */}
          <table className="w-full border-collapse">

            <thead>
              <tr>
                <th className="px-4 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--c-text2)] border-b border-[var(--c-border)]">
                  Column
                </th>
                <th className="px-4 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--c-text2)] border-b border-[var(--c-border)]">
                  Type
                </th>
              </tr>
            </thead>

            <tbody>
              {table.columns.map((col) => (
                <tr key={col.columnName}>
                  <td className="px-4 py-1.5 text-sm font-mono font-medium text-[var(--c-text)] border-b border-[var(--c-border)]">
                    {col.columnName}
                  </td>

                  <td className="px-4 py-1.5 text-xs font-mono text-[var(--c-text2)] border-b border-[var(--c-border)]">
                    {col.dataType}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {/* 🔹 SAMPLE DATA */}
          {table.rows && table.rows.length > 0 && (

            <details className="border-t border-[var(--c-border)]">

              <summary className="px-4 py-2 text-sm text-[var(--c-primary)] cursor-pointer hover:underline">
                Sample data ({table.rows.length} rows)
              </summary>

              <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>
                    <tr>
                      {table.columns.map((col) => (
                        <th
                          key={col.columnName}
                          className="px-4 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--c-text2)] border-b border-[var(--c-border)]"
                        >
                          {col.columnName}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {table.rows.slice(0, 3).map((row, i) => (
                      <tr key={i}>
                        {table.columns.map((col) => (
                          <td
                            key={col.columnName}
                            className="px-4 py-1.5 text-sm font-mono text-[var(--c-text)] border-b border-[var(--c-border)]"
                          >
                            {row[col.columnName] !== null
                              ? String(row[col.columnName])
                              : "NULL"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

            </details>

          )}

        </div>
      ))}

    </div>
  );
}

export { SchemaViewer };