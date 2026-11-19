"use client";

import { MoreVertical, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  DroppableColumnProps,
  KanbanBoardProps,
} from "../types/kanban-board.types";
import { COLUMN_CONFIG } from "../utils/column-list";
import CreateProductDialog from "./CreateProductDialog";
import SortableProductCard from "./SortableProductCards";

const DroppableColumn = ({
  column,
  config,
  boardId,
  sortedColumns,
}: DroppableColumnProps) => {
  const sortedProduct =
    column.products?.sort((a, b) => a.order - b.order) || [];
  return (
    <Card className="min-w-75 shrink-0 p-0">
      <CardHeader className={`${config.color} rounded-t-lg py-3 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-base font-semibold text-white">
              {column.name}
            </CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label={`Actions for ${column.name}`}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:cursor-pointer hover:bg-white/20"
                >
                  <MoreVertical
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Button>
              }
            />

            <DropdownMenuContent
              className="w-auto"
              align="end"
            >
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="min-h-100 space-y-2 rounded-b-lg pt-4">
        {sortedProduct.map((prod) => (
          <SortableProductCard
            key={prod._id}
            product={{ ...prod, columnId: prod._id || column._id }}
            columns={sortedColumns}
          />
        ))}
        <CreateProductDialog
          columnId={column._id}
          boardId={boardId}
        />
      </CardContent>
    </Card>
  );
};

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const columns = board.columns;
  const sortedProduct = columns?.sort((a, b) => a.order - b.order) || [];
  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-scroll pb-4">
        {columns.map((col, key) => {
          const config = COLUMN_CONFIG[key];
          return (
            <DroppableColumn
              key={key}
              column={col}
              config={config}
              boardId={board._id}
              sortedColumns={sortedProduct}
            />
          );
        })}
      </div>
    </div>
  );
}
