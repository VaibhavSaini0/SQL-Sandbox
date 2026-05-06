export interface TableColumn {
  columnName: string;
  dataType: string;
}

export interface TableSchema {
  tableName: string;
  columns: TableColumn[];
  rows: Record<string, any>[];
}

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  question: string;
  difficulty: "easy" | "medium" | "hard";

  sampleTables: TableSchema[];

  expectedOutput?: {
    type: string;
    value: any;
  };
}