import { IBoard, IColumn } from "@/types/common.types";

export interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

export interface KanbanBoardProps {
  board: IBoard;
  userId: string | undefined;
}

export interface DroppableColumnProps {
  column: IColumn;
  config: ColConfig;
  boardId: string;
  sortedColumns: IColumn[];
}
