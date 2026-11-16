"use client";

import {
  CirclePause,
  List,
  ListCheck,
  MoreVertical,
  PhilippinePeso,
  Star,
  Trash2,
} from "lucide-react";
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
import CreateProductDialog from "./create-product-dialog";
import { Board, Column } from "@/lib/models/models.types";

interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

interface KanbanBoardProps {
  board: Board;
  userId: string | undefined;
}

interface DroppableColumnProps {
  column: Column;
  config: ColConfig;
  boardId: string;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-gradient-to-r from-red-500 to-red-400",
    icon: <Star className="h-4 w-4" />,
  },
  {
    color: "bg-gradient-to-r from-orange-500 to-yellow-300",
    icon: <List className="h-4 w-4" />,
  },
  {
    color: "bg-gradient-to-r from-cyan-500 to-cyan-300",
    icon: <ListCheck className="h-4 w-4" />,
  },
  {
    color: "bg-gradient-to-r from-gray-500 to-gray-300",
    icon: <CirclePause className="h-4 w-4" />,
  },
  {
    color: "bg-gradient-to-r from-emerald-600 to-green-300",
    icon: <PhilippinePeso className="h-4 w-4" />,
  },
];

const DroppableColumn = ({ column, config, boardId }: DroppableColumnProps) => {
  return (
    <Card className="min-w-75 shrink-0 p-0 shadow-md">
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
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:cursor-pointer hover:bg-white/20"
                >
                  <MoreVertical className="h-4 w-4" />
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
  return (
    <div className="py-4">
      <div>
        {columns.map((col, key) => {
          const config = COLUMN_CONFIG[key];
          return (
            <DroppableColumn
              key={key}
              column={col}
              config={config}
              boardId={board._id}
            />
          );
        })}
      </div>
    </div>
  );
}
